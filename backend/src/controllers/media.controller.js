const mediaService = require('../services/media.service');

const getAllMedia = async (req, res, next) => {
  try {
    const result = await mediaService.getUserMedia(req.user.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getMediaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await mediaService.getMediaById(id, req.user.id);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMedia,
  getMediaById,
};
