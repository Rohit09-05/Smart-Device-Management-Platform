const Device = require('../models/Device');

exports.registerDevice = async (req, res, next) => {
  try {
    const { name, type, status } = req.body;
    const owner_id = req.user._id;

    const device = new Device({
      name,
      type,
      status,
      owner_id
    });

    await device.save();

    res.status(201).json({ success: true, device });
  } catch (error) {
    next(error);
  }
};

exports.listDevices = async (req, res, next) => {
  try {
    const { type, status } = req.query;
    const owner_id = req.user._id;

    const filter = { owner_id };
    if (type) filter.type = type;
    if (status) filter.status = status;

    const devices = await Device.find(filter);

    res.json({ success: true, devices });
  } catch (error) {
    next(error);
  }
};

exports.updateDevice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const owner_id = req.user._id;

    const device = await Device.findOne({ _id: id, owner_id });
    if (!device) return res.status(404).json({ success: false, message: 'Device not found' });

    Object.assign(device, req.body);
    await device.save();

    res.json({ success: true, device });
  } catch (error) {
    next(error);
  }
};

exports.deleteDevice = async (req, res, next) => {
  try {
    const { id } = req.params;
    const owner_id = req.user._id;

    const device = await Device.findOneAndDelete({ _id: id, owner_id });
    if (!device) return res.status(404).json({ success: false, message: 'Device not found' });

    res.json({ success: true, message: 'Device deleted' });
  } catch (error) {
    next(error);
  }
};

exports.heartbeat = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const owner_id = req.user._id;

    const device = await Device.findOne({ _id: id, owner_id });
    if (!device) return res.status(404).json({ success: false, message: 'Device not found' });

    device.status = status || device.status;
    device.last_active_at = new Date();

    await device.save();

    res.json({
      success: true,
      message: 'Device heartbeat recorded',
      last_active_at: device.last_active_at
    });
  } catch (error) {
    next(error);
  }
};
