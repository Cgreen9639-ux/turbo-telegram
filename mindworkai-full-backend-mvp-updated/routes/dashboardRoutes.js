const express = require('express');
const router = express.Router();
const authMiddleware = require('../auth/authMiddleware');
const { getOverview } = require('../controllers/dashboardController');

router.get('/overview', authMiddleware, getOverview);

module.exports = router;