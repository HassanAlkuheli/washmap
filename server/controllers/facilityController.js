/**
 * Facility Controller
 * Handles business logic for facility-related operations
 */

const { mockFacilities } = require('../data/mockData');
const { generateRandomFacilities } = require('../utils/facilityHelpers');

/**
 * Get all facilities or facilities around a location
 */
const getFacilities = (req, res) => {
  const { lat, lng } = req.query;
  
  let facilities;
  
  if (lat && lng) {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    
    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid latitude or longitude'
      });
    }
    
    console.log(`📍 Generating facilities around (${latitude}, ${longitude})`);
    facilities = generateRandomFacilities(latitude, longitude);
  } else {
    console.log('📍 Returning default facilities');
    facilities = mockFacilities;
  }
  
  res.json({
    success: true,
    data: facilities,
    count: facilities.length
  });
};

/**
 * Get a specific facility by ID
 */
const getFacilityById = (req, res) => {
  const { id } = req.params;
  console.log(`📍 Fetching facility: ${id}`);
  
  const facility = mockFacilities.find(f => f.id === id);
  
  if (!facility) {
    return res.status(404).json({
      success: false,
      message: 'Facility not found'
    });
  }
  
  res.json({
    success: true,
    data: facility
  });
};

module.exports = {
  getFacilities,
  getFacilityById
};
