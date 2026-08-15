import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInAnonymously,
} from 'firebase/auth';
import { useRouter } from 'expo-router';
import {
  Dumbbell,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  UserCheck,
  Flame,
  TrendingUp,
} from 'lucide-react-native';
import { auth } from './../services/firebase';
import { styles, COLORS } from '../styles/login.styles';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

/**
 * Helper: Map Firebase Auth error codes to user-friendly messages
 */
const mapAuthError = (code) => {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'Invalid email or password. Please try again.';
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/too-many-requests':
      return 'Access temporarily blocked due to unusual activity. Try again later.';
    case 'auth/popup-closed-by-user':
      return ''; // User intentionally closed popup; do not error
    default:
      return 'An unexpected authentication error occurred.';
  }
};

/**
 * Sub-component: Alert Notification Banner
 */
const AlertBanner = ({ type, message }) => {
  if (!message) return null;
  const isError = type === 'error';
  const Icon = isError ? AlertCircle : CheckCircle2;
  return (
    <View
      style={[
        styles.alertBanner,
        {
          backgroundColor: isError ? COLORS.roseBg : COLORS.emeraldBg,
          borderColor: isError ? COLORS.roseBorder : COLORS.emeraldBorder,
        },
      ]}
    >
      <Icon color={isError ? COLORS.roseText : COLORS.emeraldText} size={16} style={{ marginTop: 1 }} />
      <Text style={[styles.alertText, { color: isError ? COLORS.roseText : COLORS.emeraldText }]}>
        {message}
      </Text>
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
}) => {
  const isFocused = focusedInput === fieldKey;
  return (
    <View style={styles.inputGroup}>
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
        />
        {rightElement}
      </View>
    </View>
  );
};

export default function LoginScreen() {
  const router = useRouter();
  const passwordInputRef = useRef(null);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  // Async Loading States
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Notification States
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const anyLoading = loading || guestLoading || resetLoading || googleLoading;

  const clearNotifications = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Google Sign-In (native-compatible, via expo-auth-session)
  const promptGoogleLogin = useGoogleAuth(
    (code) => setErrorMessage(mapAuthError(code) || 'Google Sign-In failed.'),
    setGoogleLoading
  );

  // 1. Email / Password Sign In
  const handleLogin = async () => {
    clearNotifications();
    if (!email.trim() || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      const msg = mapAuthError(error.code);
      if (msg) setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  // 2. Anonymous Guest Sign In
  const handleGuestLogin = async () => {
    clearNotifications();
    setGuestLoading(true);
    try {
      await signInAnonymously(auth);
    } catch (error) {
      setErrorMessage('Failed to sign in as guest. Please try again.');
    } finally {
      setGuestLoading(false);
    }
  };

  // 3. Google Sign In
  const handleGoogleLogin = () => {
    clearNotifications();
    promptGoogleLogin();
  };

  // 4. Password Reset
  const handleForgotPassword = async () => {
    clearNotifications();
    if (!email.trim()) {
      setErrorMessage('Please enter your email address to reset your password.');
      return;
    }
    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setSuccessMessage('Password reset link sent! Check your inbox.');
    } catch (error) {
      setErrorMessage(mapAuthError(error.code) || 'Failed to send password reset email.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* LEFT BRAND PANEL (Desktop/Tablet Layout) */}
      <View style={styles.brandPanel}>
        <View style={styles.brandLogoRow}>
          <View style={styles.brandIconWrapper}>
            <Dumbbell color={COLORS.primary} size={22} />
          </View>
          {/* <Text style={styles.brandTitle}>Pulse AI</Text> */}
        </View>
        <View style={{ maxWidth: 440 }}>
          <View style={styles.badgeTag}>
            <Sparkles color={COLORS.primary} size={12} />
            <Text style={styles.badgeText}>AI Fitness Coach</Text>
          </View>
          <Text style={styles.heroHeading}>Train smarter,{'\n'}not harder.</Text>
          <Text style={styles.heroSubtext}>
            Pulse builds your workouts and nutrition around your goals, dynamically adjusting every week based on how you actually perform.
          </Text>
          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <View style={[styles.metricIconBox, { backgroundColor: 'rgba(120, 53, 15, 0.6)' }]}>
                <Flame color="#fbbf24" size={16} />
              </View>
              <View>
                <Text style={styles.metricTitle}>Daily streaks</Text>
                <Text style={styles.metricSubtitle}>Stay accountable</Text>
              </View>
            </View>
            <View style={styles.metricCard}>
              <View style={[styles.metricIconBox, { backgroundColor: 'rgba(6, 78, 59, 0.6)' }]}>
                <TrendingUp color="#34d399" size={16} />
              </View>
              <View>
                <Text style={styles.metricTitle}>Real progress</Text>
                <Text style={styles.metricSubtitle}>Tracked automatically</Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.footerText}>© {new Date().getFullYear()} Pulse AI Inc.</Text>
      </View>

      {/* RIGHT FORM PANEL */}
      <ScrollView
        contentContainerStyle={styles.formScrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formPanelContent}>
          <View style={styles.formWrapper}>
            {/* Mobile Header (Hidden on Desktop) */}
            {Platform.OS !== 'web' && (
              <View style={styles.headerSection}>
                <Image
                  source={require('../assets/images/weightlifting.png')}
                  style={styles.gymImage}
                  resizeMode="contain"
                />
                <Text style={styles.mainHeading}>Welcome back</Text>
                <Text style={styles.mainHeading}>Fitness Coach + AI</Text>
                <Text style={styles.subHeading}>
                  Sign in to access your personalized AI workouts & nutrition.
                </Text>
              </View>
            )}

            {/* Notification Banners */}
            <AlertBanner type="error" message={errorMessage} />
            <AlertBanner type="success" message={successMessage} />

            {/* Form Card */}
            <View style={styles.formCard}>
              {/* Email Input */}
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
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              {/* Password Input */}
              <CustomInput
                inputRef={passwordInputRef}
                label="Password"
                icon={Lock}
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                fieldKey="password"
                focusedInput={focusedInput}
                setFocusedInput={setFocusedInput}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                rightElement={
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
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

              {/* Options Row */}
              <View style={styles.optionsRow}>
                <TouchableOpacity
                  style={styles.rememberBox}
                  onPress={() => setRememberMe(!rememberMe)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.checkbox, rememberMe ? styles.checkboxActive : styles.checkboxInactive]}>
                    {rememberMe && <Text style={styles.checkboxCheck}>✓</Text>}
                  </View>
                  <Text style={styles.rememberText}>Remember me</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleForgotPassword} disabled={anyLoading}>
                  {resetLoading ? (
                    <ActivityIndicator color={COLORS.primary} size="small" />
                  ) : (
                    <Text style={styles.forgotText}>Forgot password?</Text>
                  )}
                </TouchableOpacity>
              </View>

              {/* Primary Action Button */}
              <TouchableOpacity
                style={[styles.primaryButton, anyLoading && { opacity: 0.6 }]}
                onPress={handleLogin}
                disabled={anyLoading}
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.bgDark} />
                ) : (
                  <>
                    <Text style={styles.primaryButtonText}>Sign in</Text>
                    <ArrowRight color={COLORS.bgDark} size={16} />
                  </>
                )}
              </TouchableOpacity>

              {/* Guest Login Button */}
              <TouchableOpacity
                style={[styles.guestButton, anyLoading && { opacity: 0.6 }]}
                onPress={handleGuestLogin}
                disabled={anyLoading}
                activeOpacity={0.8}
              >
                {guestLoading ? (
                  <ActivityIndicator color={COLORS.primary} size="small" />
                ) : (
                  <>
                    <UserCheck color={COLORS.primary} size={15} />
                    <Text style={styles.guestButtonText}>Try app as guest</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Logins */}
            <View style={styles.socialGrid}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleGoogleLogin}
                disabled={anyLoading}
                activeOpacity={0.8}
              >
                {googleLoading ? (
                  <ActivityIndicator color={COLORS.primary} size="small" />
                ) : (
                  <Text style={styles.socialButtonText}>Google</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => setErrorMessage('Apple Sign-In requires native iOS credentials.')}
                disabled={anyLoading}
                activeOpacity={0.8}
              >
                <Text style={styles.socialButtonText}>Apple</Text>
              </TouchableOpacity>
            </View>

            {/* Footer Registration Link */}
            <View style={styles.switchRow}>
              <Text style={styles.switchText}>Don&apos;t have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.switchLink}>Create account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}