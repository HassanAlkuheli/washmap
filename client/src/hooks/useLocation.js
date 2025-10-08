/**
 * Custom Hook: useLocation
 * Handles user location retrieval and management
 */

import { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import * as Location from 'expo-location';
import { MAP_CONFIG } from '../utils/constants';

/**
 * Hook to manage user location
 * @returns {Object} Location data and loading state
 */
export const useLocation = () => {
  const [location, setLocation] = useState(MAP_CONFIG.defaultLocation);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    try {
      setLoading(true);
      
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setError('Location permission denied');
        setLoading(false);
        return;
      }

      // Get current location
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      
      setLoading(false);
    } catch (err) {
      console.warn('Error getting location:', err);
      setError(err.message);
      setLoading(false);
      
      // Fallback to default location
      Alert.alert(
        'Location Error',
        'Could not get your location. Using default location.',
        [{ text: 'OK' }]
      );
    }
  };

  return {
    location,
    loading,
    error,
    refetch: getUserLocation,
  };
};
