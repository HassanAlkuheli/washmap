/**
 * Application Constants
 * Centralized configuration for the WashMap application
 */

// API Configuration
export const API_BASE_URL = 'http://localhost:3000/api';

// Color Palette
export const COLORS = {
  // Primary Colors
  primary: '#0EA5E9',
  primaryDark: '#0284C7',
  primaryLight: '#06B6D4',
  
  // Background Colors
  bgDark: '#0F172A',
  bgMedium: '#1E293B',
  bgLight: '#F8FAFC',
  
  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#0EA5E9',
  
  // Text Colors
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textLight: '#94A3B8',
  textWhite: '#FFFFFF',
  
  // Queue Status Colors
  queueAvailable: '#10B981',
  queueLow: '#0EA5E9',
  queueMedium: '#F59E0B',
  queueHigh: '#EF4444',
};

// Map Configuration
export const MAP_CONFIG = {
  defaultLocation: {
    latitude: 37.7749,
    longitude: -122.4194,
  },
  defaultZoom: 13,
  markerSize: 12,
};

// Queue Thresholds
export const QUEUE_THRESHOLDS = {
  low: 3,
  medium: 6,
};

// Animation Durations (ms)
export const ANIMATION = {
  fast: 300,
  normal: 500,
  slow: 800,
};

// Time Slots
export const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM',
  '03:00 PM', '04:00 PM', '05:00 PM',
];
