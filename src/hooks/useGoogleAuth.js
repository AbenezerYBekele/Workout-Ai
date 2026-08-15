// src/hooks/useGoogleAuth.js
import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../services/firebase';

WebBrowser.maybeCompleteAuthSession();

/**
 * useGoogleAuth
 * Wraps expo-auth-session's Google ID-token flow and exchanges the
 * resulting id_token for a Firebase credential.
 *
 * @param {(msg: string) => void} onError - called with a user-friendly message on failure
 * @param {(loading: boolean) => void} setLoading - toggles a loading spinner in the caller
 * @returns {() => void} promptGoogleLogin - call this from a button's onPress
 */
export function useGoogleAuth(onError, setLoading) {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      setLoading?.(true);
      signInWithCredential(auth, credential)
        .catch((error) => onError?.(error.code || 'Google Sign-In failed.'))
        .finally(() => setLoading?.(false));
    } else if (response?.type === 'error') {
      onError?.('Google Sign-In was cancelled or failed.');
    }
  }, [response]);

  const promptGoogleLogin = () => {
    if (request) promptAsync();
  };

  return promptGoogleLogin;
}