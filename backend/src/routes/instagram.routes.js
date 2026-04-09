const express = require('express');
const instagramController = require('../controllers/instagram.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// OAuth initiation and callback (Public because they are triggered by browser redirects)
router.get('/auth', instagramController.initiateAuth);
router.get('/callback', instagramController.handleCallback);

// Protected routes
router.get('/account', protect, instagramController.getAccount);
router.delete('/disconnect', protect, instagramController.disconnect);

module.exports = router;

