// src/app/(tabs)/workout.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  Dumbbell,
  CheckCircle2,
  Circle,
  Clock,
  RefreshCw,
  Flame,
  Sparkles,
} from 'lucide-react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { db } from '../../services/firebase'; // Adjust if config/firebase
import { useAuth } from '../../context/AuthContext';
import { useUserStore } from '../../store/useUserStore';
import { fetchAIWorkout } from '../../services/aiService';
import { styles, COLORS } from '../../styles/workout.styles';

/**
 * Sub-component: Floating Rest Timer Banner
 */
const RestTimerBanner = ({ seconds, onSkip }) => {
  if (seconds <= 0) return null;
  return (
    <View style={styles?.timerBanner}>
      <View style={styles?.timerLeft}>
        <Clock color="#ffffff" size={20} />
        <Text style={styles?.timerText}>Rest Timer: {seconds}s</Text>
      </View>
      <TouchableOpacity onPress={onSkip} activeOpacity={0.8}>
        <Text style={styles?.timerSkip}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

/**
 * Sub-component: Screen Header
 */
const WorkoutHeader = ({ summary, generating, onGenerate }) => (
  <View style={styles?.headerRow}>
    <View>
      <Text style={styles?.headerTitle}>AI Workout Coach 🏋️‍♂️</Text>
      <Text style={styles?.headerSubtitle} numberOfLines={1}>
        {summary || 'Tailored to your personal fitness goal'}
      </Text>
    </View>

    <TouchableOpacity
      style={styles?.generateBtn}
      onPress={onGenerate}
      disabled={generating}
      activeOpacity={0.8}
    >
      {generating ? (
        <ActivityIndicator color={COLORS?.primary || '#38bdf8'} size="small" />
      ) : (
        <>
          <Sparkles color={COLORS?.primary || '#38bdf8'} size={16} />
          <Text style={styles?.generateBtnText}>Regenerate</Text>
        </>
      )}
    </TouchableOpacity>
  </View>
);

/**
 * Sub-component: Empty State View
 */
const EmptyWorkoutPlan = ({ generating, onGenerate }) => (
  <View style={styles?.emptyBox}>
    <Dumbbell color={COLORS?.textMuted || '#64748b'} size={48} />
    <Text style={styles?.emptyTitle}>No Workout Plan Found</Text>
    <Text style={styles?.emptySubtitle}>
      Generate your personalized AI routine based on your onboarding preferences.
    </Text>
    <TouchableOpacity
      style={styles?.primaryGenerateBtn}
      onPress={onGenerate}
      disabled={generating}
      activeOpacity={0.8}
    >
      <Sparkles color={COLORS?.textPrimary || '#f8fafc'} size={20} />
      <Text style={styles?.primaryGenerateBtnText}>
        {generating ? 'Building Plan...' : 'Generate AI Workout'}
      </Text>
    </TouchableOpacity>
  </View>
);

/**
 * Sub-component: Day Selector Horizontal Tabs
 */
const DaySelectorTabs = ({ days, selectedIndex, onSelectDay }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles?.dayScroll}
  >
    {days.map((day, idx) => {
      const isActive = selectedIndex === idx;
      return (
        <TouchableOpacity
          key={idx}
          style={[styles?.dayTab, isActive && styles?.dayTabActive]}
          onPress={() => onSelectDay(idx)}
          activeOpacity={0.8}
        >
          <Text style={[styles?.dayTabText, isActive && styles?.dayTabTextActive]}>
            {day.day}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

/**
 * Sub-component: Target Focus Banner
 */
const TargetFocusBanner = ({ title, durationMinutes }) => (
  <View style={styles?.focusBanner}>
    <View>
      <Text style={styles?.focusLabel}>Target Focus</Text>
      <Text style={styles?.focusTitle}>{title || 'Full Body'}</Text>
    </View>
    <View style={styles?.focusDurationBox}>
      <Flame color={COLORS?.orangeText || '#f97316'} size={16} />
      <Text style={styles?.focusDurationText}>
        {durationMinutes || 45} mins
      </Text>
    </View>
  </View>
);

/**
 * Sub-component: Exercise List Card
 */
const ExerciseCard = ({
  exercise,
  isSwapped,
  onToggleCompletion,
  onToggleAlternative,
  onStartRest,
}) => {
  const displayName = isSwapped
    ? exercise.alternativeExercise || exercise.name
    : exercise.name;

  return (
    <View style={[styles?.exerciseCard, exercise.completed && styles?.exerciseCardCompleted]}>
      <View style={styles?.exerciseHeaderRow}>
        <TouchableOpacity
          style={styles?.exerciseCheckRow}
          onPress={onToggleCompletion}
          activeOpacity={0.8}
        >
          {exercise.completed ? (
            <CheckCircle2 color={COLORS?.emeraldText || '#10b981'} size={22} />
          ) : (
            <Circle color={COLORS?.textMuted || '#64748b'} size={22} />
          )}
          <Text
            style={[
              styles?.exerciseName,
              exercise.completed && styles?.exerciseNameCompleted,
            ]}
          >
            {displayName}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles?.swapBtn}
          onPress={onToggleAlternative}
          activeOpacity={0.8}
        >
          <RefreshCw color={COLORS?.primary || '#38bdf8'} size={12} />
          <Text style={styles?.swapBtnText}>
            {isSwapped ? 'Original' : 'Swap'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles?.metricsRow}>
        <View style={[styles?.metricBox, styles?.metricBoxBorder]}>
          <Text style={styles?.metricLabel}>Sets</Text>
          <Text style={styles?.metricValue}>{exercise.sets}</Text>
        </View>

        <View style={[styles?.metricBox, styles?.metricBoxBorder]}>
          <Text style={styles?.metricLabel}>Reps</Text>
          <Text style={styles?.metricValue}>{exercise.reps}</Text>
        </View>

        <TouchableOpacity
          style={styles?.timerMetricBox}
          onPress={() => onStartRest(exercise.restPeriodSecs || 60)}
          activeOpacity={0.8}
        >
          <Clock color={COLORS?.primary || '#38bdf8'} size={14} />
          <Text style={styles?.timerMetricText}>
            {exercise.restPeriodSecs || 60}s
          </Text>
        </TouchableOpacity>
      </View>

      {exercise.instructions && (
        <Text style={styles?.instructionsText}>
          💡 {exercise.instructions}
        </Text>
      )}
    </View>
  );
};

export default function WorkoutScreen() {
  const { user } = useAuth();
  const userProfile = useUserStore((state) => state.userProfile);

  const [workoutData, setWorkoutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showAlternative, setShowAlternative] = useState({});

  useEffect(() => {
    loadWorkoutPlan();
  }, [user]);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const loadWorkoutPlan = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const docRef = doc(db, 'users', user.uid, 'workouts', 'current_plan');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setWorkoutData(docSnap.data());
      }
    } catch (error) {
      console.error('Error loading workout plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateWorkout = async () => {
    if (!userProfile) {
      Alert.alert('Error', 'User profile not found.');
      return;
    }

    setGenerating(true);
    try {
      const response = await fetchAIWorkout(userProfile);
      setWorkoutData(response.plan);
      Alert.alert('Success 🎉', 'New personalized workout plan generated!');
    } catch (error) {
      console.error('Error generating workout:', error);
      Alert.alert('Generation Failed', 'Could not generate plan. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const toggleExerciseCompletion = async (exerciseIndex) => {
    if (!workoutData) return;

    const updatedPlan = { ...workoutData };
    const currentExercises = updatedPlan.workoutPlan[selectedDayIndex].exercises;
    currentExercises[exerciseIndex].completed = !currentExercises[exerciseIndex].completed;

    setWorkoutData(updatedPlan);

    try {
      const docRef = doc(db, 'users', user.uid, 'workouts', 'current_plan');
      await updateDoc(docRef, { workoutPlan: updatedPlan.workoutPlan });
    } catch (error) {
      console.error('Error saving completion state:', error);
    }
  };

  const startRestTimer = (seconds) => {
    setTimerSeconds(seconds);
    setIsTimerRunning(true);
  };

  if (loading) {
    return (
      <View style={styles?.centerContainer || { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#020617' }}>
        <ActivityIndicator size="large" color={COLORS?.primary || '#38bdf8'} />
        <Text style={{ color: COLORS?.textSecondary || '#94a3b8', marginTop: 12 }}>Loading workout plan...</Text>
      </View>
    );
  }

  const currentDay = workoutData?.workoutPlan?.[selectedDayIndex];

  return (
    <View style={styles?.container || { flex: 1, backgroundColor: '#020617' }}>
      <ScrollView
        contentContainerStyle={styles?.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <RestTimerBanner
          seconds={timerSeconds}
          onSkip={() => {
            setIsTimerRunning(false);
            setTimerSeconds(0);
          }}
        />

        <WorkoutHeader
          summary={workoutData?.summary}
          generating={generating}
          onGenerate={handleGenerateWorkout}
        />

        {!workoutData ? (
          <EmptyWorkoutPlan
            generating={generating}
            onGenerate={handleGenerateWorkout}
          />
        ) : (
          <>
            <DaySelectorTabs
              days={workoutData.workoutPlan}
              selectedIndex={selectedDayIndex}
              onSelectDay={(idx) => setSelectedDayIndex(idx)}
            />

            <TargetFocusBanner
              title={currentDay?.title}
              durationMinutes={currentDay?.durationMinutes}
            />

            <View style={{ paddingBottom: 24 }}>
              {currentDay?.exercises.map((exercise, idx) => (
                <ExerciseCard
                  key={idx}
                  exercise={exercise}
                  isSwapped={showAlternative[idx]}
                  onToggleCompletion={() => toggleExerciseCompletion(idx)}
                  onToggleAlternative={() =>
                    setShowAlternative((prev) => ({
                      ...prev,
                      [idx]: !prev[idx],
                    }))
                  }
                  onStartRest={(secs) => startRestTimer(secs)}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}