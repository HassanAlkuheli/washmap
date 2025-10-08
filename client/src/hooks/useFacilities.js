/**
 * Custom Hook: useFacilities
 * Handles all facility-related state and API calls
 */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFacilities,
  selectAllFacilities,
  selectLoading,
  selectError,
} from '../redux/facilitiesSlice';

/**
 * Hook to manage facilities data fetching and state
 * @param {Object} location - Optional location object { latitude, longitude }
 * @returns {Object} Facilities data and loading states
 */
export const useFacilities = (location = null) => {
  const dispatch = useDispatch();
  const facilities = useSelector(selectAllFacilities);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchFacilities(location));
  }, [dispatch, location]);

  const refetch = () => {
    dispatch(fetchFacilities(location));
  };

  return {
    facilities,
    loading,
    error,
    refetch,
  };
};
