const instagramService = require('../services/instagram.service');
const jwt = require('jsonwebtoken');

/**
 * Initiates Instagram OAuth flow
 * Expected: GET /api/instagram/auth?token=USER_JWT
 */
const initiateAuth = async (req, res, next) => {
  try {
    // We get the token from query because browser redirect won't have Authorization header
    const token = req.query.token;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication token required' });
    }

    // Verify token to get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Get the IG Auth URL
    const authUrl = instagramService.getAuthUrl();
    
    // Add state to the URL to carry the userId back to the callback
    // In a real app, this should be a secure state token
    const finalUrl = `${authUrl}&state=${userId}`;

    res.redirect(finalUrl);
  } catch (error) {
    console.error('Initiate Auth Error:', error);
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

/**
 * Handles Instagram OAuth callback
 * Instagram redirects here: GET /api/instagram/callback?code=...&state=userId
 */
const handleCallback = async (req, res, next) => {
  try {
    const { code, state: userId, error } = req.query;

    if (error) {
      return res.redirect(`${process.env.FRONTEND_URL}/dashboard/settings?error=${error}`);
    }

    if (!code || !userId) {
      return res.redirect(`${process.env.FRONTEND_URL}/dashboard/settings?error=invalid_callback`);
    }

    // Exchange code and save account
    await instagramService.handleCallback(code, userId);

    // Redirect user back to frontend settings page with success
    res.redirect(`${process.env.FRONTEND_URL}/dashboard/settings?connected=true`);
  } catch (error) {
    console.error('Callback Handling Error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/dashboard/settings?error=connection_failed`);
  }
};

const getAccount = async (req, res, next) => {
  try {
    const result = await instagramService.getConnectedAccount(req.user.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const disconnect = async (req, res, next) => {
  try {
    await instagramService.disconnectAccount(req.user.id);
    res.status(200).json({ success: true, message: 'Account disconnected' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  initiateAuth,
  handleCallback,
  getAccount,
  disconnect,
};

