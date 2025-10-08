/**
 * TimeSlotPicker Component
 * Reusable time slot selection component
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS, TIME_SLOTS } from '../../utils/constants';

const TimeSlotPicker = ({ selectedTime, onSelectTime }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Select Time Slot</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.timeSlotsContainer}
      >
        {TIME_SLOTS.map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeSlot,
              selectedTime === time && styles.timeSlotSelected,
            ]}
            onPress={() => onSelectTime(time)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.timeSlotText,
                selectedTime === time && styles.timeSlotTextSelected,
              ]}
            >
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  timeSlotsContainer: {
    paddingVertical: 8,
  },
  timeSlot: {
    backgroundColor: COLORS.bgLight,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  timeSlotSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryDark,
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  timeSlotTextSelected: {
    color: COLORS.textWhite,
    fontWeight: '700',
  },
});

export default TimeSlotPicker;
