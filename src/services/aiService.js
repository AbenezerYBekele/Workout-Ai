// src/services/aiService.js (or services/aiService.js)
import { ai } from './firebase'; // Imports initialized AI instance from services/firebase.js
import { getGenerativeModel } from 'firebase/ai';

// gemini-2.0-flash was shut down by Google on June 1, 2026 (zero quota, all requests fail).
// gemini-3.1-flash-lite is the direct replacement Firebase recommends for it.
const MODEL_NAME = 'gemini-3.1-flash-lite';

// 1. Generate AI Workout Plan via Firebase AI Logic
export const fetchAIWorkout = async (userProfile) => {
  try {
    const model = getGenerativeModel(ai, { model: MODEL_NAME });

    const prompt = `Act as an expert fitness trainer. Return ONLY a valid raw JSON object matching this exact structure with no markdown wrapping:
    {
      "summary": "Full body routine",
      "weeklyCaloriesBurnEstimate": 1500,
      "workoutPlan": [
        {
          "day": "Day 1 - Push",
          "title": "Chest & Triceps Focus",
          "durationMinutes": 45,
          "exercises": [
            {
              "name": "Dumbbell Press",
              "sets": 3,
              "reps": "10-12",
              "restPeriodSecs": 60,
              "instructions": "Keep elbows at 45 degrees",
              "alternativeExercise": "Push-ups"
            }
          ]
        }
      ]
    }

    User Profile: Goal: ${userProfile?.goal || "Fitness"}, Level: ${userProfile?.fitnessLevel || "Beginner"}, Frequency: ${userProfile?.workoutDaysPerWeek || 3} days/week, Equipment: ${userProfile?.availableEquipment?.join(", ") || "Bodyweight"}.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanJsonText = text.replace(/```json|```/g, "").trim();
    const parsedData = JSON.parse(cleanJsonText);

    return { plan: parsedData };
  } catch (error) {
    console.error("Firebase AI Logic Workout Error:", error);
    throw error;
  }
};

// 2. Generate AI Meal Plan via Firebase AI Logic
export const fetchAIMealPlan = async (userProfile) => {
  try {
    const model = getGenerativeModel(ai, { model: MODEL_NAME });

    const prompt = `Act as a sports nutritionist. Return ONLY a valid raw JSON object matching this exact structure with no markdown wrapping:
    {
      "dailyCalories": 2200,
      "macros": { "proteinGrams": 150, "carbsGrams": 200, "fatsGrams": 60 },
      "waterIntakeLiters": 3.0,
      "meals": [
        {
          "mealType": "Breakfast",
          "name": "Oatmeal with Whey Protein & Berries",
          "calories": 450,
          "ingredients": ["Oats", "Whey Protein", "Blueberries"],
          "recipeInstructions": "Mix oats with milk, microwave, and top with protein & berries."
        }
      ],
      "groceryList": ["Oats", "Whey Protein", "Blueberries", "Almond Milk"]
    }

    User Profile: Target Weight: ${userProfile?.targetWeightKg || 70}kg, Goal: ${userProfile?.goal || "Weight loss"}, Diet Restrictions: ${userProfile?.dietaryRestrictions?.join(", ") || "None"}.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanJsonText = text.replace(/```json|```/g, "").trim();
    const parsedData = JSON.parse(cleanJsonText);

    return { plan: parsedData };
  } catch (error) {
    console.error("Firebase AI Logic Meal Error:", error);
    throw error;
  }
};

// 3. Ask AI Coach via Firebase AI Logic
export const fetchAICoachReply = async (message, userProfile) => {
  try {
    const model = getGenerativeModel(ai, { model: MODEL_NAME });

    const prompt = `You are Coach Max, an encouraging personal fitness AI coach.
    Client Context: Goal: ${userProfile?.goal || "Overall fitness"}, Weight: ${userProfile?.weightKg || "N/A"}kg.

    User Question: "${message}"

    Provide a direct, motivating answer under 120 words.`;

    const result = await model.startChat().sendMessage(prompt);
    const replyText = result.response.text();

    return { reply: replyText, timestamp: new Date().toISOString() };
  } catch (error) {
    console.error("Firebase AI Logic Coach Error:", error);
    throw error;
  }
};