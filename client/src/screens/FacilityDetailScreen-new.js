/**
 * FacilityDetailScreen - Modern AI-Inspired Design
 * 
 * Features:
 * - Gradient hero section
 * - Interactive service cards
 * - Smooth animations
 * - Modern booking interface
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  selectSelectedFacility,
  createBooking,
  selectBookingStatus,
  resetBookingStatus 
} from '../redux/facilitiesSlice';

const { width } = Dimensions.get('window');

const FacilityDetailScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const facility = useSelector(selectSelectedFacility);
  const bookingStatus = useSelector(selectBookingStatus);
  
  const [selectedService, setSelectedService] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Mock time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '01:00 PM', '02:00 PM', 
    '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  if (!facility) {
    return (
      <View style={styles.emptyContainer}>
        <LinearGradient
          colors={['#0F172A', '#1E293B']}
          style={StyleSheet.absoluteFill}
        />
        <FontAwesome5 name="exclamation-circle" size={64} color="#64748B" />
        <Text style={styles.emptyText}>No facility selected</Text>
      </View>
    );
  }

  /**
   * Get queue status styling
   */
  const getQueueStatus = () => {
    const count = facility.queueCount;
    if (count === 0) {
      return { 
        text: 'Available Now', 
        icon: 'check-circle', 
        color: '#10B981', 
        bgColor: '#10B98120' 
      };
    } else if (count <= 3) {
      return { 
        text: `${count} in Queue - Low Wait`, 
        icon: 'clock', 
        color: '#0EA5E9', 
        bgColor: '#0EA5E920' 
      };
    } else if (count <= 6) {
      return { 
        text: `${count} in Queue - Moderate`, 
        icon: 'hourglass-half', 
        color: '#F59E0B', 
        bgColor: '#F59E0B20' 
      };
    } else {
      return { 
        text: `${count} in Queue - Long Wait`, 
        icon: 'exclamation-triangle', 
        color: '#EF4444', 
        bgColor: '#EF444420' 
      };
    }
  };

  const queueStatus = getQueueStatus();

  /**
   * Handle service selection
   */
  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  /**
   * Handle time slot selection
   */
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  /**
   * Handle booking submission
   */
  const handleBooking = async () => {
    if (!selectedService) {
      Alert.alert('Select Service', 'Please select a service to continue');
      return;
    }
    if (!selectedTime) {
      Alert.alert('Select Time', 'Please select a time slot to continue');
      return;
    }

    const bookingData = {
      userId: 'user_123',
      facilityId: facility.id,
      serviceName: selectedService.name,
      serviceId: selectedService.id,
      time: selectedTime,
    };

    try {
      await dispatch(createBooking(bookingData)).unwrap();
      Alert.alert(
        'Booking Confirmed!',
        `Your ${selectedService.name} service is booked for ${selectedTime}`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Booking Failed', error.message || 'Please try again');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F172A', '#1E293B', '#334155']}
        style={styles.backgroundGradient}
      />

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <Animated.View 
          style={[
            styles.heroSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={['#0EA5E9', '#0284C7', '#0369A1']}
            style={styles.heroGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.heroContent}>
              <View style={styles.heroHeader}>
                <View style={styles.iconBadge}>
                  <FontAwesome5 name="car-wash" size={24} color="#FFFFFF" />
                </View>
                <View style={[styles.statusBadge, { backgroundColor: queueStatus.bgColor }]}>
                  <FontAwesome5 name={queueStatus.icon} size={12} color={queueStatus.color} />
                  <Text style={[styles.statusText, { color: queueStatus.color }]}>
                    {queueStatus.text}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.facilityName}>{facility.name}</Text>
              
              <View style={styles.ratingRow}>
                <View style={styles.ratingContainer}>
                  <FontAwesome5 name="star" size={16} color="#FBBF24" solid />
                  <Text style={styles.ratingText}>{facility.rating}</Text>
                  <Text style={styles.reviewText}>({facility.totalReviews} reviews)</Text>
                </View>
                
                <View style={styles.distanceContainer}>
                  <FontAwesome5 name="map-marker-alt" size={14} color="#FFFFFF" />
                  <Text style={styles.distanceText}>
                    {(Math.random() * 5 + 0.5).toFixed(1)} km away
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Quick Stats */}
        <Animated.View 
          style={[
            styles.statsSection,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.statCard}>
            <FontAwesome5 name="clock" size={20} color="#0EA5E9" />
            <Text style={styles.statValue}>~30 min</Text>
            <Text style={styles.statLabel}>Avg Time</Text>
          </View>
          
          <View style={styles.statCard}>
            <FontAwesome5 name="users" size={20} color="#10B981" />
            <Text style={styles.statValue}>{facility.queueCount}</Text>
            <Text style={styles.statLabel}>In Queue</Text>
          </View>
          
          <View style={styles.statCard}>
            <FontAwesome5 name="tools" size={20} color="#F59E0B" />
            <Text style={styles.statValue}>{facility.services.length}</Text>
            <Text style={styles.statLabel}>Services</Text>
          </View>
        </Animated.View>

        {/* Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <FontAwesome5 name="list" size={16} color="#0EA5E9" /> Available Services
          </Text>
          
          {facility.services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceCard,
                selectedService?.id === service.id && styles.serviceCardSelected,
              ]}
              onPress={() => handleServiceSelect(service)}
              activeOpacity={0.7}
            >
              {selectedService?.id === service.id && (
                <LinearGradient
                  colors={['#0EA5E9', '#0284C7']}
                  style={styles.selectedGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              )}
              
              <View style={styles.serviceIcon}>
                <FontAwesome5 
                  name="spray-can" 
                  size={20} 
                  color={selectedService?.id === service.id ? '#FFFFFF' : '#0EA5E9'} 
                />
              </View>
              
              <View style={styles.serviceInfo}>
                <Text style={[
                  styles.serviceName,
                  selectedService?.id === service.id && styles.serviceNameSelected
                ]}>
                  {service.name}
                </Text>
                <Text style={[
                  styles.serviceDescription,
                  selectedService?.id === service.id && styles.serviceDescriptionSelected
                ]}>
                  {service.duration} min • Professional service
                </Text>
              </View>
              
              <View style={styles.servicePriceContainer}>
                <Text style={[
                  styles.servicePrice,
                  selectedService?.id === service.id && styles.servicePriceSelected
                ]}>
                  ${service.price}
                </Text>
              </View>
              
              {selectedService?.id === service.id && (
                <View style={styles.checkmark}>
                  <FontAwesome5 name="check-circle" size={24} color="#10B981" solid />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Time Slots Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <FontAwesome5 name="calendar-alt" size={16} color="#0EA5E9" /> Select Time Slot
          </Text>
          
          <View style={styles.timeSlotsGrid}>
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.timeSlotSelected,
                ]}
                onPress={() => handleTimeSelect(time)}
                activeOpacity={0.7}
              >
                {selectedTime === time && (
                  <LinearGradient
                    colors={['#0EA5E9', '#0284C7']}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                )}
                <Text style={[
                  styles.timeSlotText,
                  selectedTime === time && styles.timeSlotTextSelected
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <FontAwesome5 name="info-circle" size={16} color="#0EA5E9" /> About This Facility
          </Text>
          
          <View style={styles.aboutCard}>
            <Text style={styles.aboutText}>
              Professional car wash facility with modern equipment and experienced staff. 
              We use eco-friendly products and ensure the highest quality service for your vehicle.
            </Text>
            
            <View style={styles.featuresGrid}>
              <View style={styles.featureItem}>
                <FontAwesome5 name="leaf" size={14} color="#10B981" />
                <Text style={styles.featureText}>Eco-Friendly</Text>
              </View>
              <View style={styles.featureItem}>
                <FontAwesome5 name="shield-alt" size={14} color="#0EA5E9" />
                <Text style={styles.featureText}>Insured</Text>
              </View>
              <View style={styles.featureItem}>
                <FontAwesome5 name="award" size={14} color="#F59E0B" />
                <Text style={styles.featureText}>Certified</Text>
              </View>
              <View style={styles.featureItem}>
                <FontAwesome5 name="wifi" size={14} color="#8B5CF6" />
                <Text style={styles.featureText}>Free WiFi</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Booking Footer */}
      <View style={styles.bookingFooter}>
        <LinearGradient
          colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.98)']}
          style={styles.footerGradient}
        >
          <View style={styles.footerContent}>
            <View style={styles.priceSection}>
              <Text style={styles.priceLabel}>Total Price</Text>
              <Text style={styles.priceValue}>
                ${selectedService ? selectedService.price : '0'}
              </Text>
            </View>
            
            <TouchableOpacity
              style={styles.bookButton}
              onPress={handleBooking}
              disabled={bookingStatus === 'loading'}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#0EA5E9', '#0284C7']}
                style={styles.bookButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {bookingStatus === 'loading' ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <>
                    <Text style={styles.bookButtonText}>Book Now</Text>
                    <FontAwesome5 name="arrow-right" size={16} color="#FFFFFF" />
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    marginTop: Platform.OS === 'web' ? 0 : 0,
  },
  heroGradient: {
    padding: 24,
    paddingTop: Platform.OS === 'web' ? 32 : 40,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  heroContent: {
    gap: 12,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconBadge: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  facilityName: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  reviewText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  distanceText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginTop: -30,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  serviceCardSelected: {
    borderColor: '#0EA5E9',
  },
  selectedGradient: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(14, 165, 233, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  serviceNameSelected: {
    color: '#FFFFFF',
  },
  serviceDescription: {
    fontSize: 13,
    color: '#94A3B8',
  },
  serviceDescriptionSelected: {
    color: 'rgba(255,255,255,0.8)',
  },
  servicePriceContainer: {
    marginLeft: 12,
  },
  servicePrice: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0EA5E9',
  },
  servicePriceSelected: {
    color: '#FFFFFF',
  },
  checkmark: {
    marginLeft: 12,
  },
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeSlot: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#1E293B',
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  timeSlotSelected: {
    borderColor: '#0EA5E9',
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
  },
  timeSlotTextSelected: {
    color: '#FFFFFF',
  },
  aboutCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  aboutText: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 22,
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    gap: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#E2E8F0',
    fontWeight: '600',
  },
  bookingFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 16,
  },
  footerGradient: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: Platform.OS === 'web' ? 20 : 32,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  priceSection: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  bookButton: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  bookButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    gap: 8,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default FacilityDetailScreen;
