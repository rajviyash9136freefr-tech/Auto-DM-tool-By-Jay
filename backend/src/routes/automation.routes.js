const express = require('express');
const automationController = require('../controllers/automation.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect); // All automation routes are protected

router.get('/', automationController.getMyAutomations);
router.post('/', automationController.create);
router.patch('/:id/toggle', automationController.toggle);
router.delete('/:id', automationController.remove);

module.exports = router;
