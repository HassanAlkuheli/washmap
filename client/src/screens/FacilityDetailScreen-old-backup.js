/**
 * FacilityDetailScreen - Detailed View of Car Wash Facility
 * 
 * Shows facility information, services, reviews, and booking options
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { 
  selectSelectedFacility,
  createBooking,
  selectBookingStatus,
  resetBookingStatus 
} from '../redux/facilitiesSlice';

const FacilityDetailScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const facility = useSelector(selectSelectedFacility);
  const bookingStatus = useSelector(selectBookingStatus);
  
  const [selectedService, setSelectedService] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Mock time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '01:00 PM', '02:00 PM', 
    '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  if (!facility) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-600">No facility selected</Text>
      </View>
    );
  }

  /**
   * Get queue status styling
   */
  const getQueueStatus = () => {
    const count = facility.queueCount;
    if (count === 0) {
      return { text: 'Available Now', color: 'bg-success', textColor: 'text-success' };
    } else if (count <= 3) {
      return { text: `${count} in Queue - Low Wait`, color: 'bg-primary', textColor: 'text-primary' };
    } else if (count <= 6) {
      return { text: `${count} in Queue - Moderate Wait`, color: 'bg-warning', textColor: 'text-warning' };
    } else {
      return { text: `${count} in Queue - Long Wait`, color: 'bg-danger', textColor: 'text-danger' };
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
      userId: 'user_123', // Mock user ID
      facilityId: facility.id,
      serviceName: selectedService.name,
      serviceId: selectedService.id,
      time: selectedTime,
    };

    try {
      await dispatch(createBooking(bookingData)).unwrap();
      
      Alert.alert(
        'Booking Confirmed! 🎉',
        `Your ${selectedService.name} at ${facility.name} is scheduled for ${selectedTime}.\n\nBooking details have been sent to your email.`,
        [
          {
            text: 'OK',
            onPress: () => {
              dispatch(resetBookingStatus());
              navigation.goBack();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Booking Failed', error || 'Please try again later');
      dispatch(resetBookingStatus());
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="bg-primary px-6 pt-6 pb-8">
          <Text className="text-3xl font-bold text-white">{facility.name}</Text>
          <View className="flex-row items-center mt-2">
            <Ionicons name="location" size={16} color="white" />
            <Text className="text-white text-sm ml-1">{facility.address}</Text>
          </View>
          <View className="flex-row items-center mt-2">
            <Ionicons name="star" size={16} color="#FCD34D" />
            <Text className="text-white text-sm ml-1 font-semibold">
              {facility.rating} ({facility.totalReviews} reviews)
            </Text>
          </View>
        </View>

        {/* Queue Status Card */}
        <View className="mx-6 -mt-6 mb-6">
          <View className={`${queueStatus.color} rounded-2xl p-5 shadow-lg`}>
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white text-xs font-semibold uppercase tracking-wide">Current Status</Text>
                <Text className="text-white text-2xl font-bold mt-1">{queueStatus.text}</Text>
              </View>
              <View className="w-16 h-16 bg-white bg-opacity-30 rounded-full items-center justify-center">
                <Ionicons name="time" size={32} color="white" />
              </View>
            </View>
          </View>
        </View>

        {/* Services Section */}
        <View className="px-6 mb-6">
          <Text className="text-2xl font-bold text-gray-800 mb-4">Available Services</Text>
          <View className="space-y-3">
            {facility.services.map((service) => (
              <TouchableOpacity
                key={service.id}
                onPress={() => handleServiceSelect(service)}
                className={`rounded-2xl p-5 border-2 ${
                  selectedService?.id === service.id 
                    ? 'bg-primary-light bg-opacity-10 border-primary' 
                    : 'bg-white border-gray-200'
                }`}
                activeOpacity={0.7}
              >
                <View className="flex-row justify-between items-center">
                  <View className="flex-1">
                    <Text className={`text-lg font-bold ${
                      selectedService?.id === service.id ? 'text-primary' : 'text-gray-800'
                    }`}>
                      {service.name}
                    </Text>
                    <View className="flex-row items-center mt-2">
                      <Ionicons name="time-outline" size={14} color="#6B7280" />
                      <Text className="text-sm text-gray-600 ml-1">{service.duration} min</Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className={`text-2xl font-bold ${
                      selectedService?.id === service.id ? 'text-primary' : 'text-gray-800'
                    }`}>
                      ${service.price}
                    </Text>
                    {selectedService?.id === service.id && (
                      <View className="mt-1">
                        <Ionicons name="checkmark-circle" size={24} color="#0891B2" />
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Time Slot Section */}
        {selectedService && (
          <View className="px-6 mb-6">
            <Text className="text-2xl font-bold text-gray-800 mb-4">Select Time Slot</Text>
            <View className="flex-row flex-wrap gap-3">
              {timeSlots.map((time) => (
                <TouchableOpacity
                  key={time}
                  onPress={() => handleTimeSelect(time)}
                  className={`rounded-xl px-5 py-3 border-2 ${
                    selectedTime === time 
                      ? 'bg-primary border-primary' 
                      : 'bg-white border-gray-200'
                  }`}
                  activeOpacity={0.7}
                >
                  <Text className={`font-semibold ${
                    selectedTime === time ? 'text-white' : 'text-gray-700'
                  }`}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Reviews Section */}
        <View className="px-6 mb-6">
          <Text className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</Text>
          <View className="space-y-3">
            {facility.reviews.map((review, index) => (
              <View key={index} className="bg-white rounded-2xl p-5 border border-gray-200">
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="font-bold text-gray-800">{review.user}</Text>
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={14} color="#FCD34D" />
                    <Text className="text-sm font-semibold text-gray-700 ml-1">{review.rating}</Text>
                  </View>
                </View>
                <Text className="text-gray-600 text-sm leading-5">{review.comment}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View className="h-24" />
      </ScrollView>

      {/* Fixed Bottom Booking Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
        <TouchableOpacity
          onPress={handleBooking}
          disabled={bookingStatus === 'loading' || !selectedService || !selectedTime}
          className={`rounded-2xl py-4 items-center ${
            bookingStatus === 'loading' || !selectedService || !selectedTime
              ? 'bg-gray-300'
              : 'bg-primary'
          }`}
          activeOpacity={0.8}
        >
          {bookingStatus === 'loading' ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Text className="text-white text-lg font-bold">
                {selectedService && selectedTime 
                  ? `Book ${selectedService.name} - $${selectedService.price}` 
                  : 'Select Service & Time'}
              </Text>
              {selectedTime && (
                <Text className="text-white text-sm mt-1">Scheduled for {selectedTime}</Text>
              )}
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FacilityDetailScreen;
