// ============================================================================
// 1. FIREBASE & WEB API POLYFILLS (MUST BE AT THE VERY TOP BEFORE ANY IMPORTS)
// ============================================================================

// Polyfill DOMException
if (typeof globalThis.DOMException === 'undefined') {
  globalThis.DOMException = class DOMException extends Error {
    constructor(message, name) {
      super(message);
      this.name = name || 'Error';
    }
  };
}

// Polyfill AbortSignal.any (Required for Firebase AI / Gemini)
if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.any !== 'function') {
  AbortSignal.any = function (signals) {
    const controller = new AbortController();

    for (const signal of signals) {
      if (!signal) continue;

      if (signal.aborted) {
        controller.abort(signal.reason);
        return controller.signal;
      }

      signal.addEventListener(
        'abort',
        () => controller.abort(signal.reason),
        { once: true }
      );
    }

    return controller.signal;
  };
}

// ============================================================================
// 2. IMPORTS & APP LOGIC
// ============================================================================
import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { AuthProvider, useAuth } from './../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './../services/firebase';
import { useUserStore } from './../store/useUserStore';

function RootLayoutNav() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments(); // Tracks current route segments (e.g., ['login'], ['onboarding'], ['(tabs)'])

  const setUserProfile = useUserStore((state) => state.setUserProfile);

  useEffect(() => {
    if (loading) return;

    let isMounted = true; // Prevent state updates on unmounted components

    const checkUserStatusAndNavigate = async () => {
      // 1. Unauthenticated User
      if (!user) {
        if (segments[0] !== 'login' && segments[0] !== 'register') {
          router.replace('/login');
        }
        return;
      }

      try {
        // 2. Authenticated User: Read profile from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userDocRef);

        if (!isMounted) return; // Cancel if component unmounted mid-request

        if (userSnap.exists()) {
          const profile = userSnap.data();
          setUserProfile(profile);

          if (profile.onboardingCompleted) {
            // User completed onboarding -> Redirect to main app
            if (segments[0] !== '(tabs)') {
              router.replace('/(tabs)');
            }
          } else {
            // Profile exists, but onboarding is incomplete
            if (segments[0] !== 'onboarding') {
              router.replace('/onboarding');
            }
          }
        } else {
          // No Firestore document exists yet
          if (segments[0] !== 'onboarding') {
            router.replace('/onboarding');
          }
        }
      } catch (error) {
        console.error('Error fetching user profile in layout:', error);
        if (isMounted && segments[0] !== 'login') {
          router.replace('/login');
        }
      }
    };

    checkUserStatusAndNavigate();

    return () => {
      isMounted = false; // Cleanup flag
    };
  }, [user, loading, segments]);

  // Loading Screen while evaluating Auth and Firestore state
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-900">
        <ActivityIndicator size="large" color="#38bdf8" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}