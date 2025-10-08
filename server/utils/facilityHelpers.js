/**
 * Facility Helper Functions
 * Utility functions for generating and manipulating facility data
 */

/**
 * Generate random facilities around a given location
 * @param {number} latitude - Center latitude
 * @param {number} longitude - Center longitude
 * @param {number} count - Number of facilities to generate
 * @returns {Array} Array of generated facility objects
 */
const generateRandomFacilities = (latitude, longitude, count = 7) => {
  const facilities = [];
  const facilityNames = [
    'Premium Wash & Shine',
    'SpeedyClean Express',
    'Eco-Friendly Auto Spa',
    'Luxury Detail Center',
    'Quick Shine Station',
    'Crystal Clear Car Wash',
    'Auto Sparkle Pro',
    'Diamond Wash Services',
    'Pristine Auto Care',
    'Elite Detail Studio'
  ];

  const services = [
    { id: 's1', name: 'Basic Exterior Wash', price: 20, duration: 20 },
    { id: 's2', name: 'Premium Full Service', price: 50, duration: 45 },
    { id: 's3', name: 'Interior Deep Clean', price: 35, duration: 35 },
    { id: 's4', name: 'Wax & Polish', price: 60, duration: 60 }
  ];

  for (let i = 0; i < count; i++) {
    const radiusInDegrees = 0.045; // ~5km
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * radiusInDegrees;
    
    const lat = latitude + (distance * Math.cos(angle));
    const lng = longitude + (distance * Math.sin(angle));
    
    facilities.push({
      id: `gen-${i + 1}`,
      name: facilityNames[i % facilityNames.length],
      latitude: lat,
      longitude: lng,
      address: `${Math.floor(Math.random() * 9000) + 1000} Street Name, City`,
      queueCount: Math.floor(Math.random() * 11),
      rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
      totalReviews: Math.floor(Math.random() * 200) + 50,
      reviews: [
        { user: 'Customer A', rating: 5, comment: 'Great service!' },
        { user: 'Customer B', rating: 4, comment: 'Good experience overall.' }
      ],
      services: services
    });
  }

  return facilities;
};

module.exports = {
  generateRandomFacilities
};
