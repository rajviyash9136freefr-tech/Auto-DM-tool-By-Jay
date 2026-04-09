const instagramService = require('../services/instagram.service');

const connect = async (req, res, next) => {
  try {
    const result = await instagramService.connectMockAccount(req.user.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
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
  connect,
  getAccount,
  disconnect,
};
