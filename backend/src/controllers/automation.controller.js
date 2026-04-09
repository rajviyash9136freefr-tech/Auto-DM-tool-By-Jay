const automationService = require('../services/automation.service');

const create = async (req, res, next) => {
  try {
    const { mediaId, keywords } = req.body;
    if (!mediaId || !keywords) {
      return res.status(400).json({ success: false, message: 'Media ID and keywords are required' });
    }
    const result = await automationService.createAutomation(req.user.id, mediaId, keywords);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getMyAutomations = async (req, res, next) => {
  try {
    const result = await automationService.getAutomations(req.user.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const toggle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    const result = await automationService.toggleAutomation(id, req.user.id, isActive);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await automationService.deleteAutomation(id, req.user.id);
    res.status(200).json({ success: true, message: 'Automation deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getMyAutomations,
  toggle,
  remove,
};
