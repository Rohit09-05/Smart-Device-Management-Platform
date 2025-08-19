require('./src/jobs/deviceCleanupJob');

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

const authRoutes = require('./src/routes/auth');
const deviceRoutes = require('./src/routes/devices');
const logRoutes = require('./src/routes/logs');
const apiLimiter = require('./src/middlewares/rateLimiter');

app.use(apiLimiter);
app.use('/auth', authRoutes);
app.use('/devices', deviceRoutes);
app.use('/devices', logRoutes);

app.get('/', (req, res) => {
  res.send('Smart Device Management API');
});


app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ success: false, message: err.message });
});

module.exports = app; 