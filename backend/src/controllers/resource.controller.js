const prisma = require('../utils/prisma');

const getResources = async (req, res, next) => {
  try {
    const { automationId } = req.query;
    const resources = await prisma.resource.findMany({
      where: {
        automation: {
          userId: req.user.id,
          ...(automationId ? { id: automationId } : {}),
        },
      },
      orderBy: { order: 'asc' },
    });
    res.status(200).json({ success: true, data: resources });
  } catch (error) {
    next(error);
  }
};

const addResource = async (req, res, next) => {
  try {
    const { automationId, title, url, type } = req.body;
    const resource = await prisma.resource.create({
      data: {
        automationId,
        title,
        url,
        type,
      },
    });
    res.status(201).json({ success: true, data: resource });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getResources,
  addResource,
};
