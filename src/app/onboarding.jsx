// app/onboarding.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import {
  Ruler,
  Target,
  Dumbbell,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react-native';
import { db } from './../services/firebase';
import { useAuth } from '../context/AuthContext';
import { useUserStore } from '../store/useUserStore';
import { styles, COLORS } from '../styles/onboarding.styles';

/**
 * Unit conversion helpers.
 * The UI is Imperial-only (feet/inches, pounds), but we still convert to
 * metric (cm / kg) before saving so any calorie/strength calculations that
 * expect metric inputs elsewhere in the app keep working unchanged.
 */
const CM_PER_INCH = 2.54;
const KG_PER_LB = 0.45359237;

const feetInchesToCm = (feet, inches) => {
  const ft = parseFloat(feet) || 0;
  const inch = parseFloat(inches) || 0;
  if (!ft && !inch) return '';
  return String(Math.round((ft * 12 + inch) * CM_PER_INCH));
};

const lbsToKg = (lbsValue) => {
  const lbs = parseFloat(lbsValue);
  if (!lbs || lbs <= 0) return '';
  return String(Math.round(lbs * KG_PER_LB));
};

// Parses a single free-text height field (e.g. 5'9", 5' 9, 5 9, 5ft9in)
// into separate feet/inches values.
const parseHeightInput = (text) => {
  const cleaned = (text || '').replace(/["”]/g, '').trim();
  const match = cleaned.match(/(\d+)\s*(?:'|ft)?\s*(\d+)?/i);
  if (!match) return { feet: '', inches: '' };
  return { feet: match[1] || '', inches: match[2] || '0' };
};

/**
 * Sub-component: Progress Bar Header
 */
const ProgressBar = ({ step, totalSteps }) => {
  const percentage = Math.round((step / totalSteps) * 100);
  return (
    <View style={styles.progressSection}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressText}>Step {step} of {totalSteps}</Text>
        <Text style={styles.progressPercent}>{percentage}%</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
};

/**
 * Sub-component: Form Input Field
 */
const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  focusedInput,
  fieldKey,
  setFocusedInput,
}) => {
  const isFocused = focusedInput === fieldKey;
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={[styles.inputBox, isFocused && styles.inputBoxFocused]}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocusedInput(fieldKey)}
          onBlur={() => setFocusedInput(null)}
          returnKeyType="done"
        />
      </View>
    </View>
  );
};

export default function OnboardingScreen() {
  const { user } = useAuth();
  const setUserProfile = useUserStore((state) => state.setUserProfile);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [heightText, setHeightText] = useState(''); // raw text for the single Height box

  // Form State (Imperial only: feet/inches for height, lbs for weight)
  const [formData, setFormData] = useState({
    // Step 1
    age: '',
    gender: 'male',
    heightFt: '',
    heightIn: '',
    weightLbs: '',
    targetWeightLbs: '',
    // Step 2
    goal: 'weight_loss',
    fitnessLevel: 'beginner',
    dietaryRestrictions: [],
    // Step 3
    availableEquipment: ['bodyweight'],
    workoutDaysPerWeek: 3,
    preferredDurationMins: 45,
  });

  // Height is entered as one free-text box (e.g. 5'9") and parsed into
  // heightFt / heightIn under the hood for validation + storage.
  const handleHeightChange = (text) => {
    setHeightText(text);
    const { feet, inches } = parseHeightInput(text);
    setFormData((prev) => ({ ...prev, heightFt: feet, heightIn: inches }));
  };

  // Helper for Multi-select Array Toggles
  const toggleArrayItem = (key, value) => {
    setFormData((prev) => {
      const current = prev[key];
      const exists = current.includes(value);
      const updated = exists ? current.filter((item) => item !== value) : [...current, value];
      return { ...prev, [key]: updated };
    });
  };

  // Step Validation
  const validateStep = () => {
    if (step === 1) {
      const { age, heightFt, weightLbs, targetWeightLbs } = formData;
      if (!age || !heightFt || !weightLbs || !targetWeightLbs) {
        Alert.alert('Incomplete Fields', 'Please fill in all your physical metrics to continue.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 3) setStep(step + 1);
      else handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Final Submit to Firestore & Zustand
  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);

    // Convert Imperial inputs to metric for storage/calculations,
    // but keep the original Imperial values too so the profile screen
    // can display them back without any re-conversion rounding drift.
    const heightCm = feetInchesToCm(formData.heightFt, formData.heightIn);
    const weightKg = lbsToKg(formData.weightLbs);
    const targetWeightKg = lbsToKg(formData.targetWeightLbs);

    const profileData = {
      uid: user.uid,
      email: user.email,
      age: Number(formData.age),
      gender: formData.gender,
      unitSystem: 'imperial',
      heightFt: Number(formData.heightFt),
      heightIn: Number(formData.heightIn) || 0,
      weightLbs: Number(formData.weightLbs),
      targetWeightLbs: Number(formData.targetWeightLbs),
      heightCm: Number(heightCm),
      weightKg: Number(weightKg),
      targetWeightKg: Number(targetWeightKg),
      goal: formData.goal,
      fitnessLevel: formData.fitnessLevel,
      dietaryRestrictions: formData.dietaryRestrictions,
      availableEquipment: formData.availableEquipment,
      workoutDaysPerWeek: Number(formData.workoutDaysPerWeek),
      preferredDurationMins: Number(formData.preferredDurationMins),
      onboardingCompleted: true,
      updatedAt: new Date().toISOString(),
    };

    try {
      // 1. Save in Firestore document: users/${user.uid}
      await setDoc(doc(db, 'users', user.uid), profileData);
      // 2. Save in local Zustand state
      setUserProfile(profileData);
      // 3. Navigate to Main Tabs
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        >
          {/* Progress Tracker */}
          <ProgressBar step={step} totalSteps={3} />

          {/* STEP 1: PHYSICAL METRICS */}
          {step === 1 && (
            <View>
              <Text style={styles.stepHeading}>Physical Metrics 📏</Text>
              <Text style={styles.stepSubheading}>
                These numbers help the AI calculate your daily caloric targets and baseline
                strength. Feet and pounds are units in the Imperial and US Customary systems.
              </Text>

              {/* Age */}
              <CustomInput
                label="Age"
                placeholder="e.g. 25"
                keyboardType="number-pad"
                value={formData.age}
                onChangeText={(v) => setFormData({ ...formData, age: v })}
                fieldKey="age"
                focusedInput={focusedInput}
                setFocusedInput={setFocusedInput}
              />

              {/* Gender Selector */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Gender</Text>
                <View style={styles.optionRow}>
                  {['male', 'female', 'other'].map((item) => {
                    const isActive = formData.gender === item;
                    return (
                      <TouchableOpacity
                        key={item}
                        style={[styles.optionCard, isActive && styles.optionCardActive]}
                        onPress={() => setFormData({ ...formData, gender: item })}
                        activeOpacity={0.8}
                      >
                        <Text
                          style={[styles.optionCardText, isActive && styles.optionCardTextActive]}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Height (single box, e.g. 5'9") */}
              <CustomInput
                label="Height"
                placeholder={`e.g. 5'9"`}
                keyboardType="default"
                value={heightText}
                onChangeText={handleHeightChange}
                fieldKey="height"
                focusedInput={focusedInput}
                setFocusedInput={setFocusedInput}
              />

              {/* Current & Target Weight (lbs) */}
              <View style={styles.rowGroup}>
                <View style={styles.halfInput}>
                  <CustomInput
                    label="Current Weight (lbs)"
                    placeholder="e.g. 165"
                    keyboardType="numeric"
                    value={formData.weightLbs}
                    onChangeText={(v) => setFormData({ ...formData, weightLbs: v })}
                    fieldKey="weightLbs"
                    focusedInput={focusedInput}
                    setFocusedInput={setFocusedInput}
                  />
                </View>
                <View style={styles.halfInput}>
                  <CustomInput
                    label="Target Weight (lbs)"
                    placeholder="e.g. 155"
                    keyboardType="numeric"
                    value={formData.targetWeightLbs}
                    onChangeText={(v) => setFormData({ ...formData, targetWeightLbs: v })}
                    fieldKey="targetWeightLbs"
                    focusedInput={focusedInput}
                    setFocusedInput={setFocusedInput}
                  />
                </View>
              </View>
            </View>
          )}

          {/* STEP 2: GOALS & DIET */}
          {step === 2 && (
            <View>
              <Text style={styles.stepHeading}>Goals & Diet 🥗</Text>
              <Text style={styles.stepSubheading}>
                Select your primary goal so the AI can build your progressive split and macros.
              </Text>

              {/* Primary Fitness Goal */}
              <Text style={styles.inputLabel}>Primary Goal</Text>
              {[
                { id: 'weight_loss', label: '🔥 Weight Loss' },
                { id: 'muscle_gain', label: '💪 Muscle Gain' },
                { id: 'strength', label: '🏋️ Build Strength' },
                { id: 'endurance', label: '🏃 Better Endurance' },
              ].map((item) => {
                const isActive = formData.goal === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.goalCard, isActive && styles.goalCardActive]}
                    onPress={() => setFormData({ ...formData, goal: item.id })}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.goalCardText, isActive && styles.goalCardTextActive]}>
                      {item.label}
                    </Text>
                    {isActive && <CheckCircle2 color={COLORS.primary} size={18} />}
                  </TouchableOpacity>
                );
              })}

              {/* Fitness Level */}
              <Text style={[styles.inputLabel, { marginTop: 12 }]}>Fitness Level</Text>
              <View style={styles.optionRow}>
                {['beginner', 'intermediate', 'advanced'].map((item) => {
                  const isActive = formData.fitnessLevel === item;
                  return (
                    <TouchableOpacity
                      key={item}
                      style={[styles.optionCard, isActive && styles.optionCardActive]}
                      onPress={() => setFormData({ ...formData, fitnessLevel: item })}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[styles.optionCardText, isActive && styles.optionCardTextActive]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Dietary Restrictions (Multi-select) */}
              <Text style={[styles.inputLabel, { marginTop: 12 }]}>
                Dietary Restrictions (Optional)
              </Text>
              <View style={styles.chipGrid}>
                {['vegan', 'vegetarian', 'keto', 'gluten-free', 'dairy-free', 'nut-free'].map(
                  (item) => {
                    const isActive = formData.dietaryRestrictions.includes(item);
                    return (
                      <TouchableOpacity
                        key={item}
                        style={[styles.chip, isActive && styles.chipActive]}
                        onPress={() => toggleArrayItem('dietaryRestrictions', item)}
                        activeOpacity={0.8}
                      >
                        <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                )}
              </View>
            </View>
          )}

          {/* STEP 3: SCHEDULE & GEAR */}
          {step === 3 && (
            <View>
              <Text style={styles.stepHeading}>Schedule & Gear 🏋️‍♂️</Text>
              <Text style={styles.stepSubheading}>
                Specify your gear so the AI avoids recommending exercises you can't perform.
              </Text>

              {/* Equipment Multi-select */}
              <Text style={styles.inputLabel}>Available Equipment</Text>
              <View style={styles.chipGrid}>
                {[
                  { id: 'bodyweight', label: 'Bodyweight' },
                  { id: 'dumbbells', label: 'Dumbbells' },
                  { id: 'barbell', label: 'Barbell' },
                  { id: 'bands', label: 'Resistance Bands' },
                  { id: 'pullup_bar', label: 'Pull-up Bar' },
                  { id: 'gym', label: 'Full Gym' },
                ].map((item) => {
                  const isActive = formData.availableEquipment.includes(item.id);
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={[styles.chip, isActive && styles.chipActive]}
                      onPress={() => toggleArrayItem('availableEquipment', item.id)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Workout Days */}
              <Text style={styles.inputLabel}>Days Per Week</Text>
              <View style={styles.dayGrid}>
                {[2, 3, 4, 5, 6].map((days) => {
                  const isActive = formData.workoutDaysPerWeek === days;
                  return (
                    <TouchableOpacity
                      key={days}
                      style={[styles.dayPill, isActive && styles.dayPillActive]}
                      onPress={() => setFormData({ ...formData, workoutDaysPerWeek: days })}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.dayPillText, isActive && styles.dayPillTextActive]}>
                        {days}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Preferred Duration */}
              <Text style={styles.inputLabel}>Preferred Session Duration</Text>
              <View style={styles.optionRow}>
                {[30, 45, 60].map((mins) => {
                  const isActive = formData.preferredDurationMins === mins;
                  return (
                    <TouchableOpacity
                      key={mins}
                      style={[styles.optionCard, isActive && styles.optionCardActive]}
                      onPress={() => setFormData({ ...formData, preferredDurationMins: mins })}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[styles.optionCardText, isActive && styles.optionCardTextActive]}
                      >
                        {mins} Mins
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Navigation Controls */}
          <View style={styles.navRow}>
            {step > 1 && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={handleBack}
                disabled={loading}
                activeOpacity={0.8}
              >
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.nextButton, loading && { opacity: 0.6 }]}
              onPress={handleNext}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.bgDark} />
              ) : (
                <>
                  <Text style={styles.nextButtonText}>
                    {step === 3 ? 'Complete Setup 🎉' : 'Next'}
                  </Text>
                  {step < 3 && <ArrowRight color={COLORS.bgDark} size={16} />}
                </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}