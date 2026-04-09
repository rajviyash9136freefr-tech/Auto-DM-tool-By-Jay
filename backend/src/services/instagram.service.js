const prisma = require('../utils/prisma');
const axios = require('axios');

/**
 * Generates the Instagram OAuth Authorization URL
 * Forces login prompt via auth_type=reauthenticate
 */
const getAuthUrl = () => {
  const baseUrl = 'https://api.instagram.com/oauth/authorize';
  const params = new URLSearchParams({
    client_id: process.env.INSTAGRAM_CLIENT_ID,
    redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
    scope: 'user_profile,user_media',
    response_type: 'code',
    auth_type: 'reauthenticate', // Force login screen
  });

  return `${baseUrl}?${params.toString()}`;
};

/**
 * Handles the OAuth callback:
 * 1. Exchanges code for short-lived token
 * 2. Exchanges short-lived for long-lived token (60 days)
 * 3. Fetches user profile
 * 4. Saves to database
 */
const handleCallback = async (code, userId) => {
  try {
    // 1. Exchange code for short-lived access token
    const tokenResponse = await axios.post(
      'https://api.instagram.com/oauth/access_token',
      new URLSearchParams({
        client_id: process.env.INSTAGRAM_CLIENT_ID,
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
        code,
      }).toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token: shortLivedToken, user_id: igUserId } = tokenResponse.data;

    // 2. Exchange for long-lived access token (60 days)
    const longLivedResponse = await axios.get(
      'https://graph.instagram.com/access_token',
      {
        params: {
          grant_type: 'ig_exchange_token',
          client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
          access_token: shortLivedToken,
        },
      }
    );

    const longLivedToken = longLivedResponse.data.access_token;

    // 3. Fetch user profile (username)
    const profileResponse = await axios.get(
      'https://graph.instagram.com/me',
      {
        params: {
          fields: 'id,username',
          access_token: longLivedToken,
        },
      }
    );

    const { username } = profileResponse.data;

    // 4. Save/Update in database
    const account = await prisma.instagramAccount.upsert({
      where: { userId },
      update: {
        username,
        accessToken: longLivedToken,
        // Using a generic avatar if profile pic is not available via Basic Display API easily
        profilePic: `https://api.dicebear.com/7.x/notionists/svg?seed=${username}&backgroundColor=transparent`,
      },
      create: {
        userId,
        username,
        accessToken: longLivedToken,
        profilePic: `https://api.dicebear.com/7.x/notionists/svg?seed=${username}&backgroundColor=transparent`,
      },
    });

    return account;
  } catch (error) {
    console.error('Instagram OAuth Error:', error.response?.data || error.message);
    throw new Error('Failed to connect Instagram account');
  }
};

const getConnectedAccount = async (userId) => {
  return await prisma.instagramAccount.findUnique({
    where: { userId },
  });
};

const disconnectAccount = async (userId) => {
  try {
    return await prisma.instagramAccount.delete({
      where: { userId },
    });
  } catch (error) {
    // If record doesn't exist, just return
    return null;
  }
};

module.exports = {
  getAuthUrl,
  handleCallback,
  getConnectedAccount,
  disconnectAccount,
};

