const express = require('express');
const mediaController = require('../controllers/media.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect); // All media routes are protected

router.get('/', mediaController.getAllMedia);
router.get('/:id', mediaController.getMediaById);

module.exports = router;
