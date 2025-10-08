/**
 * FacilityCard Component (Web Compatible)
 * 
 * Reusable card component for displaying facility information
 * Used in the map list view
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FacilityCard = ({ facility, onPress }) => {
  /**
   * Get queue status indicator
   */
  const getQueueIndicator = () => {
    const count = facility.queueCount;
    if (count === 0) {
      return { icon: 'checkmark-circle', color: '#10B981', text: 'Available' };
    } else if (count <= 3) {
      return { icon: 'time', color: '#0891B2', text: `${count} waiting` };
    } else if (count <= 6) {
      return { icon: 'alert-circle', color: '#F59E0B', text: `${count} waiting` };
    } else {
      return { icon: 'warning', color: '#EF4444', text: `${count} waiting` };
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
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {facility.name}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FCD34D" />
            <Text style={styles.ratingText}>
              {facility.rating} ({facility.totalReviews})
            </Text>
          </View>
        </View>
        
        {/* Queue Status Badge */}
        <View style={[styles.badge, { backgroundColor: `${queueIndicator.color}20` }]}>
          <Ionicons name={queueIndicator.icon} size={14} color={queueIndicator.color} />
          <Text style={[styles.badgeText, { color: queueIndicator.color }]}>
            {queueIndicator.text}
          </Text>
        </View>
      </View>

      {/* Details */}
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Ionicons name="pricetag-outline" size={14} color="#6B7280" />
          <Text style={styles.detailText}>{getPriceRange()}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={14} color="#6B7280" />
          <Text style={styles.detailText}>
            {(Math.random() * 5 + 0.5).toFixed(1)} km
          </Text>
        </View>
      </View>

      {/* View Details Button */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.footerText}>View Details & Book</Text>
          <Ionicons name="chevron-forward" size={16} color="#0891B2" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  footer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: '#0891B2',
    fontWeight: '600',
    fontSize: 14,
    marginRight: 4,
  },
});

export default FacilityCard;
