// app/register.jsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';
import {
  Dumbbell,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
} from 'lucide-react-native';
import { auth } from './../services/firebase';
import { styles, COLORS } from '../styles/register.styles';

/**
 * Helper: Map Firebase Auth error codes to user-friendly messages
 */
const mapAuthError = (code) => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Try signing in instead.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password is too weak. Use at least 6 characters.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    default:
      return 'Failed to create account. Please try again.';
  }
};

/**
 * Sub-component: Alert Notification Banner
 */
const AlertBanner = ({ message }) => {
  if (!message) return null;
  return (
    <View style={styles.alertBanner}>
      <AlertCircle color={COLORS.roseText} size={16} />
      <Text style={styles.alertText}>{message}</Text>
    </View>
  );
};

/**
 * Sub-component: Form Input Field
 */
const CustomInput = ({
  label,
  icon: Icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType = 'default',
  focusedInput,
  fieldKey,
  setFocusedInput,
  rightElement,
  inputRef,
  onSubmitEditing,
  returnKeyType = 'next',
  editable = true,
  isLast = false,
}) => {
  const isFocused = focusedInput === fieldKey;
  return (
    <View style={isLast ? styles.inputGroupLast : styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={[styles.inputBox, isFocused && styles.inputBoxFocused]}>
        <Icon color={isFocused ? COLORS.primary : COLORS.textMuted} size={18} />
        <TextInput
          ref={inputRef}
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={() => setFocusedInput(fieldKey)}
          onBlur={() => setFocusedInput(null)}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          editable={editable}
        />
        {rightElement}
      </View>
    </View>
  );
};

export default function RegisterScreen() {
  const router = useRouter();
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  // Async / notification state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    setErrorMessage('');

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, trimmedEmail, password);
      // Firebase's onAuthStateChanged listener (wherever it's set up) will
      // detect the new session and handle navigation automatically.
    } catch (error) {
      setErrorMessage(mapAuthError(error.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formWrapper}>
          {/* Header */}
          <View style={styles.headerSection}>
            <View style={styles.iconBadge}>
              <Dumbbell color={COLORS.primary} size={26} />
            </View>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>Start your AI coaching journey</Text>
          </View>

          {/* Notification Banner */}
          <AlertBanner message={errorMessage} />

          {/* Form Card */}
          <View style={styles.formCard}>
            {/* Email */}
            <CustomInput
              label="Email address"
              icon={Mail}
              placeholder="alex@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              fieldKey="email"
              focusedInput={focusedInput}
              setFocusedInput={setFocusedInput}
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />

            {/* Password */}
            <CustomInput
              inputRef={passwordInputRef}
              label="Password (6+ characters)"
              icon={Lock}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              fieldKey="password"
              focusedInput={focusedInput}
              setFocusedInput={setFocusedInput}
              editable={!loading}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              rightElement={
                <TouchableOpacity
                  onPress={() => setShowPassword((prev) => !prev)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  {showPassword ? (
                    <EyeOff color={COLORS.textMuted} size={18} />
                  ) : (
                    <Eye color={COLORS.textMuted} size={18} />
                  )}
                </TouchableOpacity>
              }
            />

            {/* Confirm Password */}
            <CustomInput
              inputRef={confirmPasswordInputRef}
              label="Confirm password"
              icon={Lock}
              placeholder="••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              fieldKey="confirmPassword"
              focusedInput={focusedInput}
              setFocusedInput={setFocusedInput}
              editable={!loading}
              returnKeyType="done"
              onSubmitEditing={handleRegister}
              isLast
              rightElement={
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword((prev) => !prev)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  {showConfirmPassword ? (
                    <EyeOff color={COLORS.textMuted} size={18} />
                  ) : (
                    <Eye color={COLORS.textMuted} size={18} />
                  )}
                </TouchableOpacity>
              }
            />

            {/* Submit */}
            <TouchableOpacity
              style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}
              onPress={handleRegister}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="#030712" />
              ) : (
                <>
                  <Text style={styles.primaryButtonText}>Sign up</Text>
                  <ArrowRight color="#030712" size={16} />
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.switchRow}>
            <Text style={styles.switchText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.back()} disabled={loading}>
              <Text style={styles.switchLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}