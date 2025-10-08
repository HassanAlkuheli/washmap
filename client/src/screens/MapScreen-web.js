/**
 * MapScreen - Home Screen with Interactive Map (Web Compatible)
 * 
 * Displays car wash facilities on a map with markers
 * Shows queue count and allows navigation to facility details
 */

import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { 
  fetchFacilities, 
  setSelectedFacility,
  selectAllFacilities,
  selectLoading,
  selectError 
} from '../redux/facilitiesSlice';
import FacilityCard from '../components/FacilityCard';

const MapScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const facilities = useSelector(selectAllFacilities);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // Fetch facilities on mount
  useEffect(() => {
    dispatch(fetchFacilities());
  }, [dispatch]);

  // Show error alert
  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  /**
   * Handle card press - navigate to facility detail
   */
  const handleCardPress = (facility) => {
    dispatch(setSelectedFacility(facility));
    navigation.navigate('FacilityDetail', { facilityId: facility.id });
  };

  /**
   * Get marker color based on queue count
   */
  const getMarkerColor = (queueCount) => {
    if (queueCount === 0) return '#10B981'; // Green - Available
    if (queueCount <= 3) return '#0891B2';  // Cyan - Low Queue
    if (queueCount <= 6) return '#F59E0B';  // Amber - Medium Queue
    return '#EF4444'; // Red - High Queue
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0891B2" />
        <Text style={styles.loadingText}>Loading facilities...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Map Placeholder for Web */}
      <View style={styles.mapPlaceholder}>
        <Ionicons name="map" size={64} color="#0891B2" />
        <Text style={styles.mapPlaceholderText}>Map View</Text>
        <Text style={styles.mapPlaceholderSubtext}>
          {Platform.OS === 'web' 
            ? 'Interactive map available on mobile devices' 
            : 'Loading map...'}
        </Text>
      </View>

      {/* Facility List Panel */}
      <View style={styles.listPanel}>
        {/* Handle Bar */}
        <View style={styles.handleBarContainer}>
          <View style={styles.handleBar} />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Nearby Facilities</Text>
          <Text style={styles.headerSubtitle}>{facilities.length} car wash locations</Text>
        </View>

        {/* Scrollable Facility List */}
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {facilities.map((facility) => (
            <FacilityCard
              key={facility.id}
              facility={facility}
              onPress={() => handleCardPress(facility)}
            />
          ))}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Queue Status</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.legendText}>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#0891B2' }]} />
          <Text style={styles.legendText}>Low Queue</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
          <Text style={styles.legendText}>Busy</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
          <Text style={styles.legendText}>Very Busy</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#6B7280',
    fontSize: 16,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0891B2',
    marginTop: 16,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  listPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
    maxHeight: '40%',
  },
  handleBarContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handleBar: {
    width: 48,
    height: 6,
    backgroundColor: '#D1D5DB',
    borderRadius: 3,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  scrollView: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  bottomSpacer: {
    height: 24,
  },
  legend: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  legendTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default MapScreen;
