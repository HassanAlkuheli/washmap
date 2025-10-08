/**
 * Facilities Slice - Redux Toolkit
 * Manages facility and booking state with async thunks
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API Base URL - Update this to your server IP for physical devices
const API_BASE_URL = 'http://localhost:3000/api';

// ============================================
// ASYNC THUNKS
// ============================================

/**
 * Fetch car wash facilities from the API
 * @param {Object} location - Optional location object with { latitude, longitude }
 */
export const fetchFacilities = createAsyncThunk(
  'facilities/fetchFacilities',
  async (location, { rejectWithValue }) => {
    try {
      let url = `${API_BASE_URL}/facilities`;
      
      // Add location query params if provided
      if (location && location.latitude && location.longitude) {
        url += `?lat=${location.latitude}&lng=${location.longitude}`;
      }
      
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch facilities');
    }
  }
);

/**
 * Create a new booking
 */
export const createBooking = createAsyncThunk(
  'facilities/createBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create booking');
    }
  }
);

// ============================================
// SLICE DEFINITION
// ============================================

const facilitiesSlice = createSlice({
  name: 'facilities',
  initialState: {
    facilities: [],
    selectedFacility: null,
    bookings: [],
    loading: false,
    error: null,
    bookingStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {
    /**
     * Set the currently selected facility
     */
    setSelectedFacility: (state, action) => {
      state.selectedFacility = action.payload;
    },
    
    /**
     * Clear selected facility
     */
    clearSelectedFacility: (state) => {
      state.selectedFacility = null;
    },
    
    /**
     * Reset booking status
     */
    resetBookingStatus: (state) => {
      state.bookingStatus = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Facilities
    builder
      .addCase(fetchFacilities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFacilities.fulfilled, (state, action) => {
        state.loading = false;
        state.facilities = action.payload;
      })
      .addCase(fetchFacilities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    
    // Create Booking
    builder
      .addCase(createBooking.pending, (state) => {
        state.bookingStatus = 'loading';
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookingStatus = 'succeeded';
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.bookingStatus = 'failed';
        state.error = action.payload;
      });
  },
});

// Export actions
export const { 
  setSelectedFacility, 
  clearSelectedFacility, 
  resetBookingStatus 
} = facilitiesSlice.actions;

// Export selectors
export const selectAllFacilities = (state) => state.facilities.facilities;
export const selectSelectedFacility = (state) => state.facilities.selectedFacility;
export const selectLoading = (state) => state.facilities.loading;
export const selectError = (state) => state.facilities.error;
export const selectBookingStatus = (state) => state.facilities.bookingStatus;

// Export reducer
export default facilitiesSlice.reducer;
