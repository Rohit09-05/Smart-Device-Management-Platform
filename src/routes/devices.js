const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const deviceController = require('../controllers/deviceController');

router.use(authenticateToken);

router.post('/', deviceController.registerDevice);
router.get('/', deviceController.listDevices);
router.patch('/:id', deviceController.updateDevice);
router.delete('/:id', deviceController.deleteDevice);
router.post('/:id/heartbeat', deviceController.heartbeat);

module.exports = router;
