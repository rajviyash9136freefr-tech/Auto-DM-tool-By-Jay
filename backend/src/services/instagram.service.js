const prisma = require('../utils/prisma');

const connectMockAccount = async (userId) => {
  // Check if account already exists
  const existing = await prisma.instagramAccount.findUnique({
    where: { userId },
  });

  if (existing) {
    return existing;
  }

  // Mock data for Instagram account
  const mockAccount = await prisma.instagramAccount.create({
    data: {
      userId,
      username: 'mock_instagram_user',
      accessToken: 'mock_access_token_' + Date.now(),
      profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80',
    },
  });

  return mockAccount;
};

const getConnectedAccount = async (userId) => {
  return await prisma.instagramAccount.findUnique({
    where: { userId },
  });
};

const disconnectAccount = async (userId) => {
  return await prisma.instagramAccount.delete({
    where: { userId },
  });
};

module.exports = {
  connectMockAccount,
  getConnectedAccount,
  disconnectAccount,
};
