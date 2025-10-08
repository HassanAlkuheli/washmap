/**
 * MapScreen with Modern UI and Custom Google Maps Theme
 */

import React, { useEffect, useRef, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  ActivityIndicator, 
  StyleSheet, 
  Platform, 
  TouchableOpacity, 
  Dimensions, 
  TextInput 
} from 'react-native';
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

const { width, height } = Dimensions.get('window');

// Custom Dark Map Style (Inspired by modern AI apps)
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },
  { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "#4b6878" }] },
  { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#64779e" }] },
  { featureType: "administrative.province", elementType: "geometry.stroke", stylers: [{ color: "#4b6878" }] },
  { featureType: "landscape.man_made", elementType: "geometry.stroke", stylers: [{ color: "#334e87" }] },
  { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#023e58" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#283d6a" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#6f9ba5" }] },
  { featureType: "poi", elementType: "labels.text.stroke", stylers: [{ color: "#1d2c4d" }] },
  { featureType: "poi.park", elementType: "geometry.fill", stylers: [{ color: "#023e58" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#3C7680" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#304a7d" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#98a5be" }] },
  { featureType: "road", elementType: "labels.text.stroke", stylers: [{ color: "#1d2c4d" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#2c6675" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#255763" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#b0d5ce" }] },
  { featureType: "road.highway", elementType: "labels.text.stroke", stylers: [{ color: "#023e58" }] },
  { featureType: "transit", elementType: "labels.text.fill", stylers: [{ color: "#98a5be" }] },
  { featureType: "transit", elementType: "labels.text.stroke", stylers: [{ color: "#1d2c4d" }] },
  { featureType: "transit.line", elementType: "geometry.fill", stylers: [{ color: "#283d6a" }] },
  { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#3a4762" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e1626" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#4e6d70" }] }
];

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
          styles: darkMapStyle,
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
          gestureHandling: 'greedy',
        });

        mapInstanceRef.current = map;

        // Add user location marker with custom icon
        new google.maps.Marker({
          position: { lat: userLocation.latitude, lng: userLocation.longitude },
          map: map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: '#0EA5E9',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 4,
          },
          title: 'Your Location',
          zIndex: 1000,
        });

        // Add pulsing circle around user location
        new google.maps.Circle({
          strokeColor: '#0EA5E9',
          strokeOpacity: 0.4,
          strokeWeight: 2,
          fillColor: '#0EA5E9',
          fillOpacity: 0.1,
          map: map,
          center: { lat: userLocation.latitude, lng: userLocation.longitude },
          radius: 500,
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
        const getColor = (q) => q === 0 ? '#10B981' : q <= 3 ? '#0EA5E9' : q <= 6 ? '#F59E0B' : '#EF4444';
        
        // Create custom SVG marker
        const color = getColor(facility.queueCount);
        const svgMarker = {
          path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
          fillColor: color,
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
          scale: 2,
          anchor: new google.maps.Point(12, 22),
        };
        
        const marker = new google.maps.Marker({
          position: { lat: facility.latitude, lng: facility.longitude },
          map: mapInstanceRef.current,
          icon: svgMarker,
          title: facility.name,
          animation: google.maps.Animation.DROP,
        });

        // Add info window on hover
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; color: #0F172A; font-size: 16px; font-weight: 700;">${facility.name}</h3>
              <p style="margin: 4px 0; color: #64748B; font-size: 13px;">
                <strong>Queue:</strong> ${facility.queueCount} waiting
              </p>
              <p style="margin: 4px 0; color: #64748B; font-size: 13px;">
                <strong>Rating:</strong> ⭐ ${facility.rating}
              </p>
            </div>
          `
        });

        marker.addListener('mouseover', () => {
          infoWindow.open(mapInstanceRef.current, marker);
        });

        marker.addListener('mouseout', () => {
          infoWindow.close();
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>🗺️</div>
        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#FFFFFF', marginBottom: '16px' }}>
          Google Maps Setup Required
        </div>
        <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', maxWidth: '500px', lineHeight: '1.8' }}>
          Add your Google Maps API key to unlock the interactive map experience.<br/><br/>
          <a href="https://console.cloud.google.com/google/maps-apis/" target="_blank" 
             style={{ color: '#FFF', fontWeight: 'bold', textDecoration: 'underline' }}>
            Get API Key →
          </a>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: '0' }} />;
};

const MapScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const facilities = useSelector(selectAllFacilities);
  const loading = useSelector(selectLoading);
  const [userLocation, setUserLocation] = useState({ latitude: 37.7749, longitude: -122.4194 });
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    if (Platform.OS === 'web') {
      if (window.google) {
        setGoogleMapsLoaded(true);
      } else {
        const script = document.createElement('script');
        const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.async = true;
        script.onload = () => setGoogleMapsLoaded(true);
        script.onerror = () => {
          console.error('Failed to load Google Maps. Please add a valid API key.');
          setGoogleMapsLoaded(true);
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

  useEffect(() => {
    if (!loadingLocation && userLocation) {
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

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || 
      (filterType === 'available' && facility.queueCount === 0) ||
      (filterType === 'busy' && facility.queueCount > 0);
    return matchesSearch && matchesFilter;
  });

  if (loading || loadingLocation || (Platform.OS === 'web' && !googleMapsLoaded)) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          colors={['#0F172A', '#1E293B']}
          style={StyleSheet.absoluteFill}
        />
        <ActivityIndicator size="large" color="#0EA5E9" />
        <Text style={styles.loadingText}>Loading your map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Map Container */}
      <View style={styles.mapContainer}>
        {Platform.OS === 'web' ? (
          <GoogleMapWeb facilities={filteredFacilities} onMarkerPress={handlePress} userLocation={userLocation} />
        ) : (
          <View style={styles.mapPlaceholder}>
            <FontAwesome5 name="map-marked-alt" size={64} color="#0EA5E9" />
            <Text style={styles.placeholderText}>Map view available on web</Text>
          </View>
        )}
      </View>

      {/* Modern Search Bar */}
      <View style={styles.searchContainer}>
        <LinearGradient
          colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.9)']}
          style={styles.searchBar}
        >
          <FontAwesome5 name="search" size={16} color="#64748B" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search car wash facilities..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <FontAwesome5 name="times-circle" size={16} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </LinearGradient>

        {/* Filter Chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContainer}
        >
          <TouchableOpacity
            style={[styles.filterChip, filterType === 'all' && styles.filterChipActive]}
            onPress={() => setFilterType('all')}
          >
            <FontAwesome5 name="th-large" size={12} color={filterType === 'all' ? '#FFFFFF' : '#64748B'} />
            <Text style={[styles.filterText, filterType === 'all' && styles.filterTextActive]}>All</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.filterChip, filterType === 'available' && styles.filterChipActive]}
            onPress={() => setFilterType('available')}
          >
            <FontAwesome5 name="check-circle" size={12} color={filterType === 'available' ? '#FFFFFF' : '#10B981'} />
            <Text style={[styles.filterText, filterType === 'available' && styles.filterTextActive]}>Available</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.filterChip, filterType === 'busy' && styles.filterChipActive]}
            onPress={() => setFilterType('busy')}
          >
            <FontAwesome5 name="clock" size={12} color={filterType === 'busy' ? '#FFFFFF' : '#F59E0B'} />
            <Text style={[styles.filterText, filterType === 'busy' && styles.filterTextActive]}>With Queue</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Modern List Panel */}
      <View style={styles.listPanel}>
        <View style={styles.handleBarContainer}>
          <View style={styles.handleBar} />
        </View>
        
        <View style={styles.panelHeader}>
          <View>
            <Text style={styles.headerTitle}>Nearby Facilities</Text>
            <Text style={styles.headerSubtitle}>
              <FontAwesome5 name="map-marker-alt" size={12} color="#0EA5E9" />
              {' '}{filteredFacilities.length} locations found
            </Text>
          </View>
          
          <TouchableOpacity style={styles.sortButton}>
            <FontAwesome5 name="sliders-h" size={16} color="#64748B" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {filteredFacilities.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} onPress={() => handlePress(facility)} />
          ))}
          {filteredFacilities.length === 0 && (
            <View style={styles.emptyState}>
              <FontAwesome5 name="search" size={48} color="#CBD5E1" />
              <Text style={styles.emptyText}>No facilities found</Text>
              <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
            </View>
          )}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>

      {/* Modern Legend */}
      <View style={styles.legend}>
        <LinearGradient
          colors={['rgba(15,23,42,0.95)', 'rgba(30,41,59,0.95)']}
          style={styles.legendGradient}
        >
          <Text style={styles.legendTitle}>
            <FontAwesome5 name="info-circle" size={12} color="#0EA5E9" /> Queue Status
          </Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
              <Text style={styles.legendText}>Available</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#0EA5E9' }]} />
              <Text style={styles.legendText}>Low Wait</Text>
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
        </LinearGradient>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <LinearGradient
          colors={['#0EA5E9', '#0284C7']}
          style={styles.fabGradient}
        >
          <FontAwesome5 name="location-arrow" size={20} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0F172A',
  },
  loadingContainer: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  loadingText: { 
    marginTop: 16, 
    color: '#94A3B8', 
    fontSize: 16,
    fontWeight: '600',
  },
  mapContainer: { 
    flex: 1,
  },
  mapPlaceholder: { 
    flex: 1, 
    backgroundColor: '#1E293B', 
    alignItems: 'center', 
    justifyContent: 'center',
    gap: 16,
  },
  placeholderText: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '600',
  },
  searchContainer: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 20 : 60,
    left: 20,
    right: 20,
    zIndex: 100,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '500',
  },
  filterScroll: {
    maxHeight: 44,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 20,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterChipActive: {
    backgroundColor: '#0EA5E9',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listPanel: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28, 
    borderTopRightRadius: 28, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: -8 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 24, 
    elevation: 24,
    maxHeight: Platform.OS === 'web' ? '45%' : '50%',
  },
  handleBarContainer: { 
    alignItems: 'center', 
    paddingVertical: 12,
  },
  handleBar: { 
    width: 40, 
    height: 5, 
    backgroundColor: '#E2E8F0', 
    borderRadius: 3,
  },
  panelHeader: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24, 
    paddingBottom: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: { 
    fontSize: 22, 
    fontWeight: '800', 
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  headerSubtitle: { 
    fontSize: 13, 
    color: '#64748B', 
    marginTop: 4,
    fontWeight: '500',
  },
  sortButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: { 
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24, 
    paddingTop: 16,
  },
  bottomSpacer: { 
    height: 24,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#475569',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 8,
  },
  legend: { 
    position: 'absolute', 
    top: Platform.OS === 'web' ? 20 : 180,
    right: 20, 
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 12, 
    elevation: 8,
  },
  legendGradient: {
    padding: 16,
  },
  legendTitle: { 
    fontSize: 12, 
    fontWeight: '700', 
    color: '#FFFFFF', 
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  legendItems: {
    gap: 8,
  },
  legendItem: { 
    flexDirection: 'row', 
    alignItems: 'center',
  },
  legendDot: { 
    width: 10, 
    height: 10, 
    borderRadius: 5, 
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  legendText: { 
    fontSize: 12, 
    color: '#E2E8F0',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: Platform.OS === 'web' ? '47%' : '52%',
    right: 20,
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
    borderRadius: 16,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;
