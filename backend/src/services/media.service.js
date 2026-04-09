const prisma = require('../utils/prisma');

const getUserMedia = async (userId) => {
  // Check if we have media in DB, if not create some mock media
  let media = await prisma.media.findMany({
    where: { userId },
  });

  if (media.length === 0) {
    const mockReels = Array.from({ length: 8 }).map((_, i) => ({
      userId,
      instagramMediaId: `inst_media_${i + 1}`,
      caption: `Awesome Reel #${i + 1} #automation #saas`,
      thumbnailUrl: `https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=500&h=800&fit=crop&q=80`,
      mediaType: 'REEL',
      views: Math.floor(Math.random() * 50000) + 1000,
      likes: Math.floor(Math.random() * 5000) + 100,
      comments: Math.floor(Math.random() * 500) + 10,
    }));

    await prisma.media.createMany({
      data: mockReels,
    });

    media = await prisma.media.findMany({
      where: { userId },
    });
  }

  return media;
};

const getMediaById = async (mediaId, userId) => {
  return await prisma.media.findFirst({
    where: { id: mediaId, userId },
  });
};

module.exports = {
  getUserMedia,
  getMediaById,
};
