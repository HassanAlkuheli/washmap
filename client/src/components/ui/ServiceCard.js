/**
 * ServiceCard Component
 * Reusable card for displaying service information
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../utils/constants';

const ServiceCard = ({ service, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.serviceCard,
        isSelected && styles.serviceCardSelected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {isSelected && (
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      )}
      
      <View style={styles.serviceHeader}>
        <FontAwesome5
          name="spray-can"
          size={20}
          color={isSelected ? COLORS.textWhite : COLORS.primary}
        />
        <View style={styles.checkmarkContainer}>
          {isSelected && (
            <FontAwesome5 name="check-circle" size={20} color={COLORS.textWhite} />
          )}
        </View>
      </View>

      <Text style={[styles.serviceName, isSelected && styles.serviceNameSelected]}>
        {service.name}
      </Text>

      <View style={styles.serviceDetails}>
        <View style={styles.serviceDetail}>
          <FontAwesome5
            name="clock"
            size={12}
            color={isSelected ? COLORS.textWhite : COLORS.textSecondary}
          />
          <Text style={[styles.serviceDetailText, isSelected && styles.serviceDetailTextSelected]}>
            {service.duration} min
          </Text>
        </View>
        <Text style={[styles.servicePrice, isSelected && styles.servicePriceSelected]}>
          ${service.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  serviceCard: {
    backgroundColor: COLORS.bgLight,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  serviceCardSelected: {
    borderColor: COLORS.primary,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkmarkContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  serviceNameSelected: {
    color: COLORS.textWhite,
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceDetailText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 6,
    fontWeight: '600',
  },
  serviceDetailTextSelected: {
    color: COLORS.textWhite,
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
  },
  servicePriceSelected: {
    color: COLORS.textWhite,
  },
});

export default ServiceCard;
