/**
 * Booking Controller
 * Handles business logic for booking-related operations
 */

const { mockFacilities, mockBookings } = require('../data/mockData');

/**
 * Create a new booking
 */
const createBooking = (req, res) => {
  console.log('📅 Creating new booking');
  const { userId, facilityId, serviceName, serviceId, time } = req.body;
  
  // Validation
  if (!userId || !facilityId || !serviceName || !time) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: userId, facilityId, serviceName, time'
    });
  }
  
  // Check if facility exists
  const facility = mockFacilities.find(f => f.id === facilityId);
  if (!facility) {
    return res.status(404).json({
      success: false,
      message: 'Facility not found'
    });
  }
  
  // Create booking
  const booking = {
    id: `booking_${Date.now()}`,
    userId,
    facilityId,
    facilityName: facility.name,
    serviceName,
    serviceId,
    time,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };
  
  mockBookings.push(booking);
  
  // Simulate queue count increase
  facility.queueCount += 1;
  
  console.log('✅ Booking created:', booking);
  
  res.status(201).json({
    success: true,
    message: 'Booking created successfully',
    data: booking
  });
};

/**
 * Get all bookings for a specific user
 */
const getUserBookings = (req, res) => {
  const { userId } = req.params;
  console.log(`📋 Fetching bookings for user: ${userId}`);
  
  const userBookings = mockBookings.filter(b => b.userId === userId);
  
  res.json({
    success: true,
    data: userBookings,
    count: userBookings.length
  });
};

module.exports = {
  createBooking,
  getUserBookings
};
