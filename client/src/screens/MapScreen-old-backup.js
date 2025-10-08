/**
 * MapScreen with Google Maps for Web - Modern UI
 */

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Platform, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  fetchFacilities, 
  setSelectedFacility,
  selectAllFacilities,
  selectLoading,
  selectError 
} from '../redux/facilitiesSlice';
import FacilityCard from '../components/FacilityCard';

const { width } = Dimensions.get('window');

const GoogleMapWeb = ({ facilities, onMarkerPress, userLocation }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web' && mapRef.current && !mapInstanceRef.current) {
      const google = window.google;
      if (!google || !google.maps) {
        setMapError(true);
        return;
      }

      try {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: userLocation.latitude, lng: userLocation.longitude },
          zoom: 13,
        });

        mapInstanceRef.current = map;

        // Add user location marker
        new google.maps.Marker({
          position: { lat: userLocation.latitude, lng: userLocation.longitude },
          map: map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#4285F4',
            fillOpacity: 1,
            strokeColor: 'white',
            strokeWeight: 3,
          },
          title: 'Your Location'
        });
      } catch (error) {
        console.error('Google Maps error:', error);
        setMapError(true);
        return;
      }
    }
  }, [userLocation]);

  useEffect(() => {
    if (mapInstanceRef.current && facilities.length > 0) {
      const google = window.google;
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      facilities.forEach((facility) => {
        const getColor = (q) => q === 0 ? '#10B981' : q <= 3 ? '#0891B2' : q <= 6 ? '#F59E0B' : '#EF4444';
        
        const marker = new google.maps.Marker({
          position: { lat: facility.latitude, lng: facility.longitude },
          map: mapInstanceRef.current,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 14,
            fillColor: getColor(facility.queueCount),
            fillOpacity: 1,
            strokeColor: 'white',
            strokeWeight: 3,
          },
          title: facility.name,
        });

        marker.addListener('click', () => onMarkerPress(facility));
        markersRef.current.push(marker);
      });
    }
  }, [facilities]);

  if (mapError) {
    return (
      <div style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#E5E7EB',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗺️</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#EF4444', marginBottom: '12px' }}>
          Google Maps API Key Required
        </div>
        <div style={{ fontSize: '16px', color: '#6B7280', maxWidth: '500px', lineHeight: '1.6' }}>
          To display the map, you need a Google Maps API key.<br/><br/>
          <strong>Get one free at:</strong><br/>
          <a href="https://console.cloud.google.com/google/maps-apis/" target="_blank" style={{ color: '#0891B2' }}>
            Google Cloud Console
          </a><br/><br/>
          Then replace <code style={{ backgroundColor: '#F3F4F6', padding: '2px 8px', borderRadius: '4px' }}>YOUR_GOOGLE_MAPS_API_KEY</code> in MapScreen.js
        </div>
      </div>
    );
  }

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};

const MapScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const facilities = useSelector(selectAllFacilities);
  const loading = useSelector(selectLoading);
  const [userLocation, setUserLocation] = useState({ latitude: 37.7749, longitude: -122.4194 });
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      if (window.google) {
        setGoogleMapsLoaded(true);
      } else {
        const script = document.createElement('script');
        // IMPORTANT: Set REACT_APP_GOOGLE_MAPS_API_KEY in your .env file
        // Get one free at: https://console.cloud.google.com/google/maps-apis/
        const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.async = true;
        script.onload = () => setGoogleMapsLoaded(true);
        script.onerror = () => {
          console.error('Failed to load Google Maps. Please add a valid API key.');
          setGoogleMapsLoaded(true); // Show fallback UI
        };
        document.head.appendChild(script);
      }
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === 'web' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
          setLoadingLocation(false);
        },
        () => setLoadingLocation(false)
      );
    } else {
      setLoadingLocation(false);
    }
  }, []);

  // Fetch facilities around user location
  useEffect(() => {
    if (!loadingLocation && userLocation) {
      // Fetch facilities from server with user's location
      // Server will generate random facilities around this location
      dispatch(fetchFacilities({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude
      }));
    }
  }, [dispatch, loadingLocation, userLocation]);

  const handlePress = (facility) => {
    dispatch(setSelectedFacility(facility));
    navigation.navigate('FacilityDetail', { facilityId: facility.id });
  };

  if (loading || loadingLocation || (Platform.OS === 'web' && !googleMapsLoaded)) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0891B2" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {Platform.OS === 'web' ? (
          <GoogleMapWeb facilities={facilities} onMarkerPress={handlePress} userLocation={userLocation} />
        ) : (
          <View style={styles.mapPlaceholder}>
            <Ionicons name="map" size={64} color="#0891B2" />
          </View>
        )}
      </View>

      <View style={styles.listPanel}>
        <View style={styles.handleBarContainer}>
          <View style={styles.handleBar} />
        </View>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Nearby Facilities</Text>
          <Text style={styles.headerSubtitle}>{facilities.length} locations</Text>
        </View>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {facilities.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} onPress={() => handlePress(facility)} />
          ))}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Queue Status</Text>
        <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: '#10B981' }]} /><Text style={styles.legendText}>Available</Text></View>
        <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: '#0891B2' }]} /><Text style={styles.legendText}>Low</Text></View>
        <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} /><Text style={styles.legendText}>Busy</Text></View>
        <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} /><Text style={styles.legendText}>Very Busy</Text></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  loadingContainer: { flex: 1, backgroundColor: '#F9FAFB', alignItems: 'center', justifyContent: 'center' },
  loadingText: { marginTop: 16, color: '#6B7280', fontSize: 16 },
  mapContainer: { flex: 1 },
  mapPlaceholder: { flex: 1, backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' },
  listPanel: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 20, maxHeight: '40%' },
  handleBarContainer: { alignItems: 'center', paddingVertical: 12 },
  handleBar: { width: 48, height: 6, backgroundColor: '#D1D5DB', borderRadius: 3 },
  header: { paddingHorizontal: 24, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1F2937' },
  headerSubtitle: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  scrollView: { paddingHorizontal: 24, paddingTop: 16 },
  bottomSpacer: { height: 24 },
  legend: { position: 'absolute', top: 16, right: 16, backgroundColor: 'white', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  legendTitle: { fontSize: 12, fontWeight: 'bold', color: '#374151', marginBottom: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  legendDot: { width: 12, height: 12, borderRadius: 6, marginRight: 8 },
  legendText: { fontSize: 12, color: '#6B7280' },
});

export default MapScreen;
