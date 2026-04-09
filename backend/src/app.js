const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ── Middleware ──
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health Check ──
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'InAutoDM API is running',
    version: '1.0.0',
  });
});

// ── Routes ──
const authRoutes = require('./routes/auth.routes');
const instagramRoutes = require('./routes/instagram.routes');
const mediaRoutes = require('./routes/media.routes');
const automationRoutes = require('./routes/automation.routes');
const resourceRoutes = require('./routes/resource.routes');
const leadRoutes = require('./routes/lead.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const webhookRoutes = require('./routes/webhook.routes');

app.use('/api/auth', authRoutes);
app.use('/api/instagram', instagramRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/automations', automationRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/webhook', webhookRoutes);

// ── Global Error Handler ──
app.use((err, req, res, next) => {
  console.error('❌ Unhandled Error:', err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ── 404 Handler ──
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

module.exports = app;
