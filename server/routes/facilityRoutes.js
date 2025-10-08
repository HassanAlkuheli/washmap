/**
 * Facility Routes
 * API endpoints for facility-related operations
 */

const express = require('express');
const router = express.Router();
const { getFacilities, getFacilityById } = require('../controllers/facilityController');

// Get all facilities or facilities around a location
router.get('/', getFacilities);

// Get a specific facility by ID
router.get('/:id', getFacilityById);

module.exports = router;
