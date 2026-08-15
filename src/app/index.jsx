// src/app/index.jsx
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  // Your root _layout.jsx handles auto-redirecting to /login, /onboarding, or /(tabs)
  return (
    <View className="flex-1 justify-center items-center bg-slate-900">
      <ActivityIndicator size="large" color="#38bdf8" />
    </View>
  );
}