/**
 * QueueBadge Component
 * Reusable badge displaying queue status
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { getQueueStatus } from '../../utils/helpers';

const QueueBadge = ({ queueCount, size = 'medium' }) => {
  const status = getQueueStatus(queueCount);
  
  const sizeStyles = {
    small: { fontSize: 10, iconSize: 10, padding: 8 },
    medium: { fontSize: 12, iconSize: 12, padding: 10 },
    large: { fontSize: 14, iconSize: 14, padding: 12 },
  };
  
  const currentSize = sizeStyles[size];

  return (
    <View style={[styles.badge, { backgroundColor: status.bgColor, padding: currentSize.padding }]}>
      <FontAwesome5 
        name={status.icon} 
        size={currentSize.iconSize} 
        color={status.color} 
      />
      <Text style={[styles.badgeText, { color: status.color, fontSize: currentSize.fontSize }]}>
        {status.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  badgeText: {
    fontWeight: '700',
    marginLeft: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default QueueBadge;
