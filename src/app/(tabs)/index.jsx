// src/app/(tabs)/index.jsx (or app/(tabs)/index.jsx)
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { Flame, Utensils, Bot, ChevronRight, Zap,  Droplets, Sparkles, LogOut,} from 'lucide-react-native';

import { useUserStore } from '../../store/useUserStore';
import { auth } from '../../services/firebase';
import { styles, COLORS } from '../../styles/home.styles';

/**
 * Sub-component: User Header & Streak Badge
 */
const UserGreetingHeader = ({ userName }) => (
  <View style={styles.headerRow}>
    <View>
      <Text style={styles.greetingSub}>Welcome back</Text>
      <Text style={styles.greetingName}>{userName}</Text>
    </View>

    <View style={styles.streakBadge}>
      <Flame color={COLORS.amberText} size={16} />
      <Text style={styles.streakText}>5 day streak</Text>
    </View>
  </View>
);

/**
 * Sub-component: AI Daily Tip Card
 */
const AICoachTip = ({ goal }) => {
  const formattedGoal = goal ? goal.replace('_', ' ') : 'fitness';
  return (
    <View style={styles.tipCard}>
      <View style={styles.tipHeader}>
        <Sparkles color={COLORS.primary} size={16} />
        <Text style={styles.tipTitle}>AI coach tip</Text>
      </View>
      <Text style={styles.tipBody}>
        Based on your target goal of {formattedGoal}, focus on high protein intake today and keep rest periods under 60 seconds.
      </Text>
    </View>
  );
};

/**
 * Sub-component: Today's Action Plan Card
 */
const TodayActionPlan = ({ onStartWorkout }) => (
  <View style={styles.planCard}>
    <View style={styles.planHeader}>
      <View style={styles.planInfo}>
        <View style={styles.planBadge}>
          <Text style={styles.planBadgeText}>Scheduled session</Text>
        </View>
        <Text style={styles.planTitle}>Upper body hypertrophy</Text>
        <Text style={styles.planSubtitle}>4 exercises · 45 minutes · Dumbbells</Text>
      </View>

      <View style={styles.planIconBox}>
        <Zap color={COLORS.primary} size={22} />
      </View>
    </View>

    <TouchableOpacity
      style={styles.planButton}
      onPress={onStartWorkout}
      activeOpacity={0.8}
    >
      <Text style={styles.planButtonText}>Start today&apos;s workout</Text>
      <ChevronRight color={COLORS.primaryDark} size={18} />
    </TouchableOpacity>
  </View>
);

/**
 * Sub-component: Daily Progress Metric Card
 */
const DailyMetricCard = ({ icon: Icon, iconColor, iconBg, iconBorder, label, value, unit }) => (
  <View style={styles.metricCard}>
    <View style={[styles.metricIconBox, { backgroundColor: iconBg, borderColor: iconBorder }]}>
      <Icon color={iconColor} size={18} />
    </View>
    <Text style={styles.metricLabel}>{label}</Text>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricUnit}>{unit}</Text>
  </View>
);

/**
 * Sub-component: Quick Action Shortcut Row
 */
const QuickShortcut = ({ icon: Icon, iconColor, iconBg, iconBorder, title, subtitle, onPress }) => (
  <TouchableOpacity
    style={styles.shortcutCard}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.shortcutLeft}>
      <View style={[styles.shortcutIconBox, { backgroundColor: iconBg, borderColor: iconBorder }]}>
        <Icon color={iconColor} size={18} />
      </View>
      <View style={styles.shortcutTextWrapper}>
        <Text style={styles.shortcutTitle}>{title}</Text>
        <Text style={styles.shortcutSubtitle}>{subtitle}</Text>
      </View>
    </View>
    <ChevronRight color={COLORS.textMuted} size={18} />
  </TouchableOpacity>
);

export default function HomeScreen() {
  const userProfile = useUserStore((state) => state.userProfile);
  const router = useRouter();

  // Extract user display name or fallback
  const userName = userProfile?.email ? userProfile.email.split('@')[0] : 'Athlete';

  // Sign out with proper error handling — a failed sign-out was previously
  // silent, leaving the user stuck without knowing why.
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // No explicit redirect here — the root layout's auth listener is
      // expected to detect the signed-out state and redirect to the auth
      // flow. If that listener doesn't exist yet, add
      // `router.replace('/login')` (adjust to your actual route) right
      // after signOut() succeeds.
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Header */}
        <UserGreetingHeader userName={userName} />

        {/* AI Daily Coach Tip */}
        <AICoachTip goal={userProfile?.goal} />

        {/* Today's Action Plan */}
        <Text style={styles.sectionHeading}>Today&apos;s action plan</Text>
        <TodayActionPlan onStartWorkout={() => router.navigate('/workout')} />

        {/* Daily Progress Grid */}
        <Text style={styles.sectionHeading}>Daily progress</Text>
        <View style={styles.metricsGrid}>
          <DailyMetricCard
            icon={Flame}
            iconColor={COLORS.orangeText}
            iconBg={COLORS.orangeBg}
            iconBorder={COLORS.orangeBorder}
            label="Calories"
            value="450 / 2,100"
            unit="kcal burned"
          />
          <DailyMetricCard
            icon={Droplets}
            iconColor={COLORS.skyText}
            iconBg={COLORS.skyBg}
            iconBorder={COLORS.skyBorder}
            label="Water intake"
            value="1.8 / 3.0"
            unit="liters"
          />
        </View>

        {/* Quick Shortcuts */}
        <Text style={styles.sectionHeading}>Quick actions</Text>
        <View style={styles.shortcutsList}>
          <QuickShortcut
            icon={Utensils}
            iconColor={COLORS.emeraldText}
            iconBg={COLORS.emeraldBg}
            iconBorder={COLORS.emeraldBorder}
            title="Log today's meals"
            subtitle="Recipes and grocery list"
            onPress={() => router.navigate('/nutrition')}
          />
          <QuickShortcut
            icon={Bot}
            iconColor={COLORS.skyText}
            iconBg={COLORS.skyBg}
            iconBorder={COLORS.skyBorder}
            title="Ask AI Coach Max"
            subtitle="Instant answers on form or nutrition"
            onPress={() => router.navigate('/coach')}
          />
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
          activeOpacity={0.8}
        >
          <LogOut color={COLORS.roseText} size={15} />
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}