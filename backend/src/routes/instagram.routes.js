const express = require('express');
const instagramController = require('../controllers/instagram.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect); // All instagram routes are protected

router.post('/connect', instagramController.connect);
router.get('/account', instagramController.getAccount);
router.delete('/disconnect', instagramController.disconnect);

module.exports = router;
