/**
 * Helper Utility Functions
 */

import { QUEUE_THRESHOLDS, COLORS } from './constants';

/**
 * Get queue status information based on queue count
 * @param {number} queueCount - Number of cars in queue
 * @returns {Object} Status information with icon, color, text, and bgColor
 */
export const getQueueStatus = (queueCount) => {
  if (queueCount === 0) {
    return {
      icon: 'check-circle',
      color: COLORS.queueAvailable,
      text: 'Available Now',
      bgColor: `${COLORS.queueAvailable}20`,
    };
  } else if (queueCount <= QUEUE_THRESHOLDS.low) {
    return {
      icon: 'clock',
      color: COLORS.queueLow,
      text: `${queueCount} in Queue`,
      bgColor: `${COLORS.queueLow}20`,
    };
  } else if (queueCount <= QUEUE_THRESHOLDS.medium) {
    return {
      icon: 'hourglass-half',
      color: COLORS.queueMedium,
      text: `${queueCount} Waiting`,
      bgColor: `${COLORS.queueMedium}20`,
    };
  } else {
    return {
      icon: 'exclamation-triangle',
      color: COLORS.queueHigh,
      text: `${queueCount} Waiting`,
      bgColor: `${COLORS.queueHigh}20`,
    };
  }
};

/**
 * Get price range from services array
 * @param {Array} services - Array of service objects with price property
 * @returns {string} Formatted price range string
 */
export const getPriceRange = (services) => {
  if (!services || services.length === 0) return 'N/A';
  
  const prices = services.map(s => s.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  
  return minPrice === maxPrice 
    ? `$${minPrice}` 
    : `$${minPrice} - $${maxPrice}`;
};

/**
 * Format distance in kilometers
 * @param {number} distance - Distance value
 * @returns {string} Formatted distance string
 */
export const formatDistance = (distance) => {
  return `${distance.toFixed(1)} km`;
};

/**
 * Calculate mock distance (for demonstration)
 * @returns {number} Random distance between 0.5 and 5.5 km
 */
export const getMockDistance = () => {
  return Math.random() * 5 + 0.5;
};
