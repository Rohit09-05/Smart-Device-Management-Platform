const Log = require('../models/Log');
const Device = require('../models/Device');

exports.createLog = async (req, res, next) => {
  try {
    const { id: deviceId } = req.params;
    const { event, value } = req.body;
    const owner_id = req.user._id;

    const device = await Device.findOne({ _id: deviceId, owner_id });
    if (!device) return res.status(404).json({ success: false, message: 'Device not found' });

    const log = new Log({
      device_id: deviceId,
      event,
      value,
      timestamp: new Date()
    });

    await log.save();

    res.status(201).json({ success: true, log });
  } catch (error) {
    next(error);
  }
};

exports.getLogs = async (req, res, next) => {
  try {
    const { id: deviceId } = req.params;
    const { limit = 10 } = req.query;
    const owner_id = req.user._id;

    const device = await Device.findOne({ _id: deviceId, owner_id });
    if (!device) return res.status(404).json({ success: false, message: 'Device not found' });

    const logs = await Log.find({ device_id: deviceId })
      .sort({ timestamp: -1 })
      .limit(Number(limit));

    res.json({ success: true, logs });
  } catch (error) {
    next(error);
  }
};

exports.getUsage = async (req, res, next) => {
  try {
    const { id: deviceId } = req.params;
    const { range = '24h' } = req.query;
    const owner_id = req.user._id;

    const device = await Device.findOne({ _id: deviceId, owner_id });
    if (!device) return res.status(404).json({ success: false, message: 'Device not found' });

    let startTime = new Date();

    if (range.endsWith('h')) {
      const hours = parseInt(range);
      startTime.setHours(startTime.getHours() - hours);
    } else {
      // Default to 24h if unrecognized
      startTime.setHours(startTime.getHours() - 24);
    }

    const results = await Log.aggregate([
      {
        $match: {
          device_id: device._id,
          timestamp: { $gte: startTime }
        }
      },
      {
        $group: {
          _id: '$event',
          totalValue: { $sum: '$value' }
        }
      }
    ]);

    let totalUnits = 0;
    results.forEach(r => {
      if (r._id === 'units_consumed') {
        totalUnits = r.totalValue;
      }
    });

    res.json({
      success: true,
      device_id: deviceId,
      total_units_last_24h: totalUnits
    });
  } catch (error) {
    next(error);
  }
};
