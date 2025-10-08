/**
 * FacilityCard Component - Modern AI-Inspired Design
 * 
 * Features:
 * - Gradient accents
 * - FontAwesome icons
 * - Smooth animations
 * - Modern glassmorphism effects
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const FacilityCard = ({ facility, onPress }) => {
  /**
   * Get queue status indicator
   */
  const getQueueIndicator = () => {
    const count = facility.queueCount;
    if (count === 0) {
      return { icon: 'check-circle', color: '#10B981', text: 'Available Now', bgColor: '#10B98120' };
    } else if (count <= 3) {
      return { icon: 'clock', color: '#0EA5E9', text: `${count} in queue`, bgColor: '#0EA5E920' };
    } else if (count <= 6) {
      return { icon: 'hourglass-half', color: '#F59E0B', text: `${count} waiting`, bgColor: '#F59E0B20' };
    } else {
      return { icon: 'exclamation-triangle', color: '#EF4444', text: `${count} waiting`, bgColor: '#EF444420' };
    }
  };

  const queueIndicator = getQueueIndicator();

  /**
   * Get price range from services
   */
  const getPriceRange = () => {
    const prices = facility.services.map(s => s.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    return `$${minPrice} - $${maxPrice}`;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.card}
      activeOpacity={0.7}
    >
      {/* Gradient Background Accent */}
      <View style={styles.gradientAccent}>
        <LinearGradient
          colors={['#0EA5E9', '#06B6D4']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {facility.name}
          </Text>
          <View style={styles.ratingContainer}>
            <FontAwesome5 name="star" size={12} color="#FBBF24" solid />
            <Text style={styles.ratingText}>
              {facility.rating}
            </Text>
            <Text style={styles.reviewCount}>
              ({facility.totalReviews})
            </Text>
          </View>
        </View>
        
        {/* Queue Status Badge */}
        <View style={[styles.badge, { backgroundColor: queueIndicator.bgColor }]}>
          <FontAwesome5 name={queueIndicator.icon} size={12} color={queueIndicator.color} />
          <Text style={[styles.badgeText, { color: queueIndicator.color }]}>
            {queueIndicator.text}
          </Text>
        </View>
      </View>

      {/* Details Grid */}
      <View style={styles.detailsGrid}>
        <View style={styles.detailCard}>
          <View style={styles.detailIconWrapper}>
            <FontAwesome5 name="dollar-sign" size={14} color="#0EA5E9" />
          </View>
          <View>
            <Text style={styles.detailLabel}>Price Range</Text>
            <Text style={styles.detailValue}>{getPriceRange()}</Text>
          </View>
        </View>
        
        <View style={styles.detailCard}>
          <View style={styles.detailIconWrapper}>
            <FontAwesome5 name="map-marker-alt" size={14} color="#0EA5E9" />
          </View>
          <View>
            <Text style={styles.detailLabel}>Distance</Text>
            <Text style={styles.detailValue}>
              {(Math.random() * 5 + 0.5).toFixed(1)} km
            </Text>
          </View>
        </View>
      </View>

      {/* Services Preview */}
      <View style={styles.servicesContainer}>
        <Text style={styles.servicesLabel}>
          <FontAwesome5 name="tools" size={10} color="#64748B" /> Services Available
        </Text>
        <View style={styles.servicesTags}>
          {facility.services.slice(0, 3).map((service, index) => (
            <View key={index} style={styles.serviceTag}>
              <Text style={styles.serviceTagText}>{service.name}</Text>
            </View>
          ))}
          {facility.services.length > 3 && (
            <View style={styles.serviceTag}>
              <Text style={styles.serviceTagText}>+{facility.services.length - 3}</Text>
            </View>
          )}
        </View>
      </View>

      {/* View Details Button */}
      <TouchableOpacity 
        style={styles.footer}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#0EA5E9', '#0284C7']}
          style={styles.footerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.footerText}>View Details & Book</Text>
          <FontAwesome5 name="arrow-right" size={14} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  gradientAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    paddingBottom: 16,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
    lineHeight: 24,
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '700',
  },
  reviewCount: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 16,
  },
  detailCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
    gap: 10,
  },
  detailIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '700',
  },
  servicesContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  servicesLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  servicesTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  serviceTag: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  serviceTagText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
  },
  footer: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  footerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 8,
  },
  footerText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.3,
  },
});

export default FacilityCard;
