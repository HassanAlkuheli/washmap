/**
 * WashMap Application - Root Component (Web Compatible)
 * 
 * Modern, beautiful car wash booking app with map integration
 * Stack: React Native (Expo), Redux Toolkit
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { Platform } from 'react-native';
import store from './src/redux/store';

// Screens
import LandingScreen from './src/screens/LandingScreen';
import MapScreen from './src/screens/MapScreen';
import FacilityDetailScreen from './src/screens/FacilityDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
        >
          <Stack.Screen 
            name="Landing" 
            component={LandingScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="Map" 
            component={MapScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="FacilityDetail" 
            component={FacilityDetailScreen}
            options={{
              title: 'Facility Details',
              headerShown: true,
              headerStyle: {
                backgroundColor: '#0F172A',
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: '700',
              },
              presentation: Platform.OS === 'web' ? 'card' : 'modal',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
