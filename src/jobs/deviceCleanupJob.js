const cron = require('node-cron');
const Device = require('../models/Device'); 

cron.schedule('0 * * * *', async () => {
  try {

    const cutoffDate = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const result = await Device.updateMany(
      { last_active_at: { $lt: cutoffDate }, status: 'active' },
      { status: 'inactive' }
    );

    console.log(`Auto-deactivated ${result.modifiedCount} devices.`);
  } catch (error) {
    console.error('Error during device cleanup job:', error);
  }
});
