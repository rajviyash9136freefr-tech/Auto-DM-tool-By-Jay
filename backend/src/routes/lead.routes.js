const express = require('express');
const leadController = require('../controllers/lead.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);

router.get('/', leadController.getLeads);

module.exports = router;
