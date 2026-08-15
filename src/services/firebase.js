// services/firebase.js
import { Platform } from 'react-native';
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAI } from 'firebase/ai'; // Firebase AI Logic SDK — remove this import + the `ai` export below if you aren't using it

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Prevent re-initialization during Expo Fast Refresh / repeated imports
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

/**
 * Auth setup:
 * - Native (iOS/Android): use initializeAuth with AsyncStorage persistence so
 *   users stay signed in between app restarts.
 * - Web: getReactNativePersistence isn't relevant; use plain getAuth.
 * - initializeAuth() throws if it's called more than once on the same app
 *   instance (e.g. during Fast Refresh), so we fall back to getAuth() in
 *   that case instead of crashing.
 */
let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    auth = getAuth(app);
  }
}

export { auth };
export const db = getFirestore(app);
export const storage = getStorage(app);
export const ai = getAI(app); // optional — see note on the import above

// Dev sanity check without leaking the actual key value
if (__DEV__) {
  console.log(
    'Firebase config loaded:',
    firebaseConfig.apiKey ? 'API key present ✅' : 'API key MISSING ❌',
    '| projectId:',
    firebaseConfig.projectId
  );
}

export default app;