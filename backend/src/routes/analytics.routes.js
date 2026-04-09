const express = require('express');
const { protect } = require('../middlewares/auth.middleware');
const prisma = require('../utils/prisma');

const router = express.Router();

router.use(protect);

router.get('/stats', async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // Mock analytics using real DB counts
    const totalLeads = await prisma.lead.count({ where: { userId } });
    const totalAutomations = await prisma.automation.count({ where: { userId } });
    const activeAutomations = await prisma.automation.count({ where: { userId, isActive: true } });
    
    // Mocking some growth percentages and reply rates
    res.status(200).json({
      success: true,
      data: {
        totalLeads,
        totalAutomations,
        activeAutomations,
        totalMessages: totalLeads * 1.5, // 1.5 messages per lead average
        replyRate: '94.2%',
        growth: '+12.5%',
        leadsChart: [
          { date: 'Mon', count: Math.floor(Math.random() * 10) },
          { date: 'Tue', count: Math.floor(Math.random() * 10) },
          { date: 'Wed', count: Math.floor(Math.random() * 10) + 5 },
          { date: 'Thu', count: Math.floor(Math.random() * 10) + 2 },
          { date: 'Fri', count: Math.floor(Math.random() * 10) + 8 },
          { date: 'Sat', count: Math.floor(Math.random() * 10) + 12 },
          { date: 'Sun', count: Math.floor(Math.random() * 10) + 6 },
        ]
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
