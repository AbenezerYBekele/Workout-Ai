import React from 'react';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Dumbbell, Utensils, TrendingUp, Bot } from 'lucide-react-native';

export default function TabsLayout() {
  // Bottom inset accounts for the phone's own home indicator / gesture
  // navigation bar so our tab bar doesn't get covered by (or overlap) it.
  const insets = useSafeAreaInsets();

  const BASE_TAB_BAR_HEIGHT = 54; // height of the bar's own content (icons + labels)
  const BASE_PADDING_TOP = 8;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#38bdf8', // Sky Blue active icon
        tabBarInactiveTintColor: '#8fcbff', // Slate gray inactive icon
        tabBarStyle: {
          backgroundColor: '#0f7dd1',
          borderTopColor: '#1e293b',
          paddingTop: BASE_PADDING_TOP,
          // Use the larger of the device's safe-area inset or a sensible
          // minimum, so there's always breathing room even on devices
          // that report 0 (older Android, etc).
          paddingBottom: Math.max(insets.bottom, 8),
          height: BASE_TAB_BAR_HEIGHT + BASE_PADDING_TOP + Math.max(insets.bottom, 8),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          title: 'Workout',
          tabBarIcon: ({ color, size }) => <Dumbbell color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: 'Nutrition',
          tabBarIcon: ({ color, size }) => <Utensils color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => <TrendingUp color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="coach"
        options={{
          title: 'AI Coach',
          tabBarIcon: ({ color, size }) => <Bot color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}