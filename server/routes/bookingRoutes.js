/**
 * Booking Routes
 * API endpoints for booking-related operations
 */

const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings } = require('../controllers/bookingController');

// Create a new booking
router.post('/', createBooking);

// Get all bookings for a specific user
router.get('/:userId', getUserBookings);

module.exports = router;
