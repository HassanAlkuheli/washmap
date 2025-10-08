/**
 * Custom Hook: useBooking
 * Handles booking creation and state management
 */

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import {
  createBooking,
  selectBookingStatus,
  resetBookingStatus,
} from '../redux/facilitiesSlice';

/**
 * Hook to manage booking functionality
 * @returns {Object} Booking functions and state
 */
export const useBooking = () => {
  const dispatch = useDispatch();
  const bookingStatus = useSelector(selectBookingStatus);

  const handleBooking = useCallback(
    async (bookingData, onSuccess) => {
      try {
        const result = await dispatch(createBooking(bookingData)).unwrap();
        
        Alert.alert(
          '✅ Booking Confirmed!',
          `Your booking at ${result.facilityName} has been confirmed.`,
          [{ text: 'OK', onPress: onSuccess }]
        );
      } catch (error) {
        Alert.alert(
          '❌ Booking Failed',
          error || 'Unable to create booking. Please try again.',
          [{ text: 'OK' }]
        );
      }
    },
    [dispatch]
  );

  const resetStatus = useCallback(() => {
    dispatch(resetBookingStatus());
  }, [dispatch]);

  return {
    handleBooking,
    bookingStatus,
    resetStatus,
  };
};
