const prisma = require('../utils/prisma');

const getLeads = async (req, res, next) => {
  try {
    const leads = await prisma.lead.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLeads,
};
