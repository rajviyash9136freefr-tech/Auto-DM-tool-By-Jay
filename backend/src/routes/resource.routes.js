const express = require('express');
const resourceController = require('../controllers/resource.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);

router.get('/', resourceController.getResources);
router.post('/', resourceController.addResource);

module.exports = router;
