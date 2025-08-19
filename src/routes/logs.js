const express = require('express');
const router = express.Router({ mergeParams: true });
const authenticateToken = require('../middlewares/authMiddleware');
const logController = require('../controllers/logController');

router.use(authenticateToken);

router.post('/:id/logs', logController.createLog);
router.get('/:id/logs', logController.getLogs);
router.get('/:id/usage', logController.getUsage);

module.exports = router;
