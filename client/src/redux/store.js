/**
 * Redux Store Configuration
 * Uses Redux Toolkit for simplified state management
 */

import { configureStore } from '@reduxjs/toolkit';
import facilitiesReducer from './facilitiesSlice';

const store = configureStore({
  reducer: {
    facilities: facilitiesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable for better performance with large data
    }),
});

export default store;
