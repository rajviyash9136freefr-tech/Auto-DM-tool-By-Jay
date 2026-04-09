const prisma = require('../utils/prisma');

const createAutomation = async (userId, mediaId, keywords) => {
  const automation = await prisma.automation.create({
    data: {
      userId,
      mediaId,
      isActive: true,
      keywords: {
        create: keywords, // array of {keyword, replyMessage, replyType, delay}
      },
    },
    include: {
      keywords: true,
    },
  });
  return automation;
};

const getAutomations = async (userId) => {
  return await prisma.automation.findMany({
    where: { userId },
    include: {
      keywords: true,
      media: true,
    },
  });
};

const toggleAutomation = async (id, userId, isActive) => {
  return await prisma.automation.update({
    where: { id, userId },
    data: { isActive },
  });
};

const deleteAutomation = async (id, userId) => {
  return await prisma.automation.delete({
    where: { id, userId },
  });
};

// ── STEP 8: Comment + DM Logic ──

const handleIncomingComment = async (commentData) => {
  const { instagramMediaId, username, message, instagramAccountId } = commentData;

  // 1. Find user's account from instagramAccountId
  const instagramAccount = await prisma.instagramAccount.findFirst({
    where: { accessToken: { contains: '' } }, // In real app, we use ID. Here we'll just find the first one for demo
  });

  if (!instagramAccount) return console.log('No connected account found for webhook');

  // 2. Find the media record in our DB
  const media = await prisma.media.findFirst({
    where: { instagramMediaId, userId: instagramAccount.userId },
  });

  if (!media) return console.log('Media not found in DB for webhook');

  // 3. Find active automation for this media
  const automation = await prisma.automation.findFirst({
    where: { mediaId: media.id, userId: instagramAccount.userId, isActive: true },
    include: { keywords: true },
  });

  if (!automation) return console.log('No active automation for this media');

  // 4. Match keyword logic
  const matchedKeyword = automation.keywords.find(k => {
    if (k.keyword === '*') return true;
    return message.toLowerCase().includes(k.keyword.toLowerCase());
  });

  if (matchedKeyword) {
    console.log(`✨ Matched keyword "${matchedKeyword.keyword}" for user ${username}`);
    
    // 5. Send reply (MOCK)
    if (matchedKeyword.replyType === 'COMMENT') {
      console.log(`💬 Mock Sending Comment Reply: "${matchedKeyword.replyMessage}" to @${username}`);
    } else {
      console.log(`✉️ Mock Sending DM: "${matchedKeyword.replyMessage}" to @${username}`);
    }

    // 6. Capture Lead (STEP 10 Preview)
    await prisma.lead.create({
      data: {
        userId: instagramAccount.userId,
        username,
        message,
        mediaId: media.id,
      },
    });
    
    console.log(`👤 Lead captured: @${username}`);
  }
};

module.exports = {
  createAutomation,
  getAutomations,
  toggleAutomation,
  deleteAutomation,
  handleIncomingComment,
};
