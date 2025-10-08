/**
 * WashMap Backend Server - Refactored
 * Clean Express.js API with proper layer separation
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const facilityRoutes = require('./routes/facilityRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/facilities', facilityRoutes);
app.use('/api/bookings', bookingRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'WashMap API is running' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Server Startup
app.listen(PORT, () => {
  console.log('WashMap Server Started');
  console.log('Server running on http://localhost:');
  console.log('Ready to accept requests!');
});

module.exports = app;
