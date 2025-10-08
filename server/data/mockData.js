/**
 * Mock Facilities Data
 * Centralized data storage for car wash facilities
 */

const mockFacilities = [
  {
    id: '1',
    name: 'Premium Wash & Shine',
    latitude: 37.7749,
    longitude: -122.4194,
    address: '123 Market Street, San Francisco, CA 94102',
    queueCount: 3,
    rating: 4.8,
    totalReviews: 245,
    reviews: [
      { user: 'John D.', rating: 5, comment: 'Excellent service! Very thorough cleaning.' },
      { user: 'Sarah M.', rating: 5, comment: 'Best car wash in the city. Highly recommend!' },
      { user: 'Mike R.', rating: 4, comment: 'Good service, slightly pricey but worth it.' }
    ],
    services: [
      { id: 's1', name: 'Basic Exterior Wash', price: 25, duration: 20 },
      { id: 's2', name: 'Premium Full Service', price: 55, duration: 45 },
      { id: 's3', name: 'Interior Deep Clean', price: 40, duration: 35 },
      { id: 's4', name: 'Wax & Polish', price: 65, duration: 60 }
    ]
  },
  {
    id: '2',
    name: 'SpeedyClean Express',
    latitude: 37.7849,
    longitude: -122.4094,
    address: '456 Valencia Street, San Francisco, CA 94110',
    queueCount: 7,
    rating: 4.3,
    totalReviews: 189,
    reviews: [
      { user: 'Emily T.', rating: 4, comment: 'Fast and efficient. Gets the job done.' },
      { user: 'David L.', rating: 5, comment: 'Great value for money!' },
      { user: 'Rachel B.', rating: 4, comment: 'Quick service but can get busy during weekends.' }
    ],
    services: [
      { id: 's1', name: 'Express Wash', price: 15, duration: 15 },
      { id: 's2', name: 'Standard Wash & Vacuum', price: 30, duration: 25 },
      { id: 's3', name: 'Deluxe Package', price: 45, duration: 40 }
    ]
  },
  {
    id: '3',
    name: 'Eco-Friendly Auto Spa',
    latitude: 37.7649,
    longitude: -122.4294,
    address: '789 Mission Street, San Francisco, CA 94103',
    queueCount: 1,
    rating: 4.9,
    totalReviews: 312,
    reviews: [
      { user: 'Tom H.', rating: 5, comment: 'Love that they use eco-friendly products!' },
      { user: 'Lisa K.', rating: 5, comment: 'Immaculate service and great for the environment.' },
      { user: 'James P.', rating: 5, comment: 'The best! My car looks brand new.' }
    ],
    services: [
      { id: 's1', name: 'Green Exterior Wash', price: 28, duration: 25 },
      { id: 's2', name: 'Eco Full Service', price: 50, duration: 45 },
      { id: 's3', name: 'Organic Interior Detail', price: 48, duration: 40 },
      { id: 's4', name: 'Complete Eco Package', price: 75, duration: 70 }
    ]
  },
  {
    id: '4',
    name: 'Luxury Detail Center',
    latitude: 37.7549,
    longitude: -122.4394,
    address: '321 Folsom Street, San Francisco, CA 94107',
    queueCount: 5,
    rating: 4.7,
    totalReviews: 198,
    reviews: [
      { user: 'Amanda S.', rating: 5, comment: 'Premium service at its finest!' },
      { user: 'Chris W.', rating: 4, comment: 'Very detailed work. A bit expensive but worth it.' },
      { user: 'Nicole F.', rating: 5, comment: 'They treat your car like royalty!' }
    ],
    services: [
      { id: 's1', name: 'Signature Wash', price: 35, duration: 30 },
      { id: 's2', name: 'Luxury Full Detail', price: 85, duration: 90 },
      { id: 's3', name: 'Paint Correction', price: 120, duration: 120 },
      { id: 's4', name: 'Ultimate Care Package', price: 150, duration: 150 }
    ]
  },
  {
    id: '5',
    name: 'QuickWash Station',
    latitude: 37.7949,
    longitude: -122.3994,
    address: '654 Howard Street, San Francisco, CA 94105',
    queueCount: 0,
    rating: 4.1,
    totalReviews: 156,
    reviews: [
      { user: 'Kevin M.', rating: 4, comment: 'Simple and fast. Perfect for a quick clean.' },
      { user: 'Sophia G.', rating: 4, comment: 'Convenient location and good prices.' },
      { user: 'Brian Y.', rating: 4, comment: 'Does what it says. No frills, no fuss.' }
    ],
    services: [
      { id: 's1', name: 'Quick Rinse', price: 12, duration: 10 },
      { id: 's2', name: 'Basic Clean', price: 22, duration: 20 },
      { id: 's3', name: 'Standard Package', price: 35, duration: 30 }
    ]
  }
];

// In-memory bookings storage
let mockBookings = [];

module.exports = {
  mockFacilities,
  mockBookings
};
