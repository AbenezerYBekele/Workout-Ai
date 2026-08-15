// app/(tabs)/nutrition.jsx
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
  Utensils,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  Flame,
  Droplets,
  Sparkles,
  Check,
} from 'lucide-react-native';
import { doc, getDoc } from 'firebase/firestore';

import { db } from '../../services/firebase'; // Adjust to '../../../services/firebase' if src/app/(tabs)
import { useAuth } from '../../context/AuthContext';
import { useUserStore } from '../../store/useUserStore';
import { fetchAIMealPlan } from '../../services/aiService';
import { styles, COLORS } from '../../styles/nutrition.styles.js';

/**
 * Sub-component: Screen Header
 */
const NutritionHeader = ({ targetWeight, generating, onGenerate }) => (
  <View style={styles.headerRow}>
    <View>
      <Text style={styles.headerTitle}>AI Nutritionist </Text>
      <Text style={styles.headerSubtitle}>
        Customized for target weight ({targetWeight || 'N/A'} kg)
      </Text>
    </View>

    <TouchableOpacity
      style={styles.generateBtn}
      onPress={onGenerate}
      disabled={generating}
      activeOpacity={0.8}
    >
      {generating ? (
        <ActivityIndicator color={COLORS.primary} size="small" />
      ) : (
        <>
          <Sparkles color={COLORS.primary} size={16} />
          <Text style={styles.generateBtnText}>Generate Plan</Text>
        </>
      )}
    </TouchableOpacity>
  </View>
);

/**
 * Sub-component: Empty State View
 */
const EmptyMealPlan = ({ generating, onGenerate }) => (
  <View style={styles.emptyBox}>
    <Utensils color={COLORS.textMuted} size={48} />
    <Text style={styles.emptyTitle}>No Meal Plan Found</Text>
    <Text style={styles.emptySubtitle}>
      Generate your daily calorie targets, macros, recipes, and grocery list.
    </Text>
    <TouchableOpacity
      style={styles.primaryGenerateBtn}
      onPress={onGenerate}
      disabled={generating}
      activeOpacity={0.8}
    >
      <Sparkles color={COLORS.textPrimary} size={20} />
      <Text style={styles.primaryGenerateBtnText}>
        {generating ? 'Calculating Macros...' : 'Generate AI Meal Plan'}
      </Text>
    </TouchableOpacity>
  </View>
);

/**
 * Sub-component: Daily Macros Banner
 */
const MacroSummaryBanner = ({ dailyCalories, waterIntake, macros }) => (
  <View style={styles.macroBanner}>
    <View style={styles.macroHeaderRow}>
      <View style={styles.macroStatBox}>
        <Flame color={COLORS.orangeText} size={20} />
        <Text style={styles.macroStatText}>{dailyCalories || 2000} kcal / day</Text>
      </View>
      <View style={styles.macroStatBox}>
        <Droplets color={COLORS.skyText} size={16} />
        <Text style={styles.waterStatText}>{waterIntake || 3}L Water</Text>
      </View>
    </View>

    {/* Macro Breakdown Chips */}
    <View style={styles.macroGrid}>
      <View style={styles.macroChip}>
        <Text style={styles.macroChipLabel}>Protein</Text>
        <Text style={[styles.macroChipValue, { color: COLORS.skyText }]}>
          {macros?.proteinGrams || 0}g
        </Text>
      </View>
      <View style={[styles.macroChip, styles.macroChipBorder]}>
        <Text style={styles.macroChipLabel}>Carbs</Text>
        <Text style={[styles.macroChipValue, { color: COLORS.amberText }]}>
          {macros?.carbsGrams || 0}g
        </Text>
      </View>
      <View style={styles.macroChip}>
        <Text style={styles.macroChipLabel}>Fats</Text>
        <Text style={[styles.macroChipValue, { color: COLORS.emeraldText }]}>
          {macros?.fatsGrams || 0}g
        </Text>
      </View>
    </View>
  </View>
);

/**
 * Sub-component: Segmented Control Switcher
 */
const SegmentedTabControl = ({ activeTab, setActiveTab }) => (
  <View style={styles.tabBar}>
    <TouchableOpacity
      style={[styles.tabBtn, activeTab === 'meals' && styles.tabBtnActive]}
      onPress={() => setActiveTab('meals')}
      activeOpacity={0.8}
    >
      <Utensils color={activeTab === 'meals' ? COLORS.textPrimary : COLORS.textSecondary} size={16} />
      <Text style={[styles.tabBtnText, activeTab === 'meals' && styles.tabBtnTextActive]}>
        Daily Meals
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.tabBtn, activeTab === 'grocery' && styles.tabBtnActive]}
      onPress={() => setActiveTab('grocery')}
      activeOpacity={0.8}
    >
      <ShoppingCart color={activeTab === 'grocery' ? COLORS.textPrimary : COLORS.textSecondary} size={16} />
      <Text style={[styles.tabBtnText, activeTab === 'grocery' && styles.tabBtnTextActive]}>
        Grocery List
      </Text>
    </TouchableOpacity>
  </View>
);

/**
 * Sub-component: Meal Accordion Card
 */
const MealAccordionCard = ({ meal, isExpanded, onToggle }) => (
  <View style={styles.mealCard}>
    <TouchableOpacity
      style={styles.mealHeader}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      <View style={styles.mealInfo}>
        <Text style={styles.mealType}>{meal.mealType}</Text>
        <Text style={styles.mealTitle}>{meal.name}</Text>
        <Text style={styles.mealCalories}>🔥 {meal.calories} kcal</Text>
      </View>

      {isExpanded ? (
        <ChevronUp color={COLORS.textSecondary} size={20} />
      ) : (
        <ChevronDown color={COLORS.textSecondary} size={20} />
      )}
    </TouchableOpacity>

    {/* Expandable Recipe Details */}
    {isExpanded && (
      <View style={styles.mealExpandBody}>
        <Text style={styles.sectionTitle}>Ingredients:</Text>
        {meal.ingredients?.map((ing, i) => (
          <Text key={i} style={styles.bulletItem}>
            • {ing}
          </Text>
        ))}

        {meal.recipeInstructions && (
          <>
            <Text style={[styles.sectionTitle, { marginTop: 12 }]}>
              Recipe Instructions:
            </Text>
            <Text style={styles.recipeText}>{meal.recipeInstructions}</Text>
          </>
        )}
      </View>
    )}
  </View>
);

/**
 * Sub-component: Grocery Checklist Item
 */
const GroceryChecklistItem = ({ item, isChecked, onToggle }) => (
  <TouchableOpacity
    style={styles.groceryItem}
    onPress={onToggle}
    activeOpacity={0.8}
  >
    <View style={[styles.groceryCheckbox, isChecked && styles.groceryCheckboxChecked]}>
      {isChecked && <Check color={COLORS.textPrimary} size={14} />}
    </View>
    <Text style={[styles.groceryItemText, isChecked && styles.groceryItemTextChecked]}>
      {item}
    </Text>
  </TouchableOpacity>
);

export default function NutritionScreen() {
  const { user } = useAuth();
  const userProfile = useUserStore((state) => state.userProfile);

  const [mealData, setMealData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  // Active Tab: 'meals' | 'grocery'
  const [activeTab, setActiveTab] = useState('meals');

  // Expanded Recipe index tracker
  const [expandedMeal, setExpandedMeal] = useState(null);

  // Checked Grocery Items tracker: { [itemName]: true/false }
  const [checkedGroceryItems, setCheckedGroceryItems] = useState({});

  useEffect(() => {
    loadMealPlan();
  }, [user]);

  const loadMealPlan = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const docRef = doc(db, 'users', user.uid, 'meals', 'current_plan');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setMealData(docSnap.data());
      }
    } catch (error) {
      console.error('Error loading meal plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMealPlan = async () => {
    if (!userProfile) {
      Alert.alert('Error', 'User profile not found.');
      return;
    }

    setGenerating(true);
    try {
      const response = await fetchAIMealPlan(userProfile);
      setMealData(response.plan);
      Alert.alert('Success 🎉', 'New personalized meal plan generated!');
    } catch (error) {
      console.error('Error generating meal plan:', error);
      Alert.alert('Generation Failed', 'Could not generate meal plan. Try again.');
    } finally {
      setGenerating(false);
    }
  };

  const toggleGroceryItem = (item) => {
    setCheckedGroceryItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ color: COLORS.textSecondary, marginTop: 12 }}>Loading nutrition plan...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Screen Header */}
        <NutritionHeader
          targetWeight={userProfile?.targetWeightKg}
          generating={generating}
          onGenerate={handleGenerateMealPlan}
        />

        {!mealData ? (
          <EmptyMealPlan
            generating={generating}
            onGenerate={handleGenerateMealPlan}
          />
        ) : (
          <>
            {/* Daily Macros Overview Banner */}
            <MacroSummaryBanner
              dailyCalories={mealData.dailyCalories}
              waterIntake={mealData.waterIntakeLiters}
              macros={mealData.macros}
            />

            {/* Segmented Control Switcher */}
            <SegmentedTabControl
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {/* TAB 1: MEALS & RECIPES */}
            {activeTab === 'meals' && (
              <View style={{ paddingBottom: 24 }}>
                {mealData.meals?.map((meal, idx) => {
                  const isExpanded = expandedMeal === idx;
                  return (
                    <MealAccordionCard
                      key={idx}
                      meal={meal}
                      isExpanded={isExpanded}
                      onToggle={() => setExpandedMeal(isExpanded ? null : idx)}
                    />
                  );
                })}
              </View>
            )}

            {/* TAB 2: GROCERY CHECKLIST */}
            {activeTab === 'grocery' && (
              <View style={[styles.groceryBox, { marginBottom: 24 }]}>
                <Text style={styles.groceryTitle}>Ingredients Needed This Week 🛒</Text>
                {mealData.groceryList?.map((item, idx) => (
                  <GroceryChecklistItem
                    key={idx}
                    item={item}
                    isChecked={checkedGroceryItems[item]}
                    onToggle={() => toggleGroceryItem(item)}
                  />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}