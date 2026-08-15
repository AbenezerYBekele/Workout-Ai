// functions/index.js
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

const geminiApiKey = defineSecret("GEMINI_API_KEY");

// 🌟 Active Google Gemini Model Identifier
const AI_MODEL = "gemini-1.5-flash-002";

// ==================================================================
// 1. WORKOUT PLAN GENERATOR
// ==================================================================
const workoutSchema = {
  type: SchemaType.OBJECT,
  properties: {
    summary: { type: SchemaType.STRING },
    workoutPlan: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          day: { type: SchemaType.STRING },
          title: { type: SchemaType.STRING },
          durationMinutes: { type: SchemaType.NUMBER },
          exercises: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                name: { type: SchemaType.STRING },
                sets: { type: SchemaType.NUMBER },
                reps: { type: SchemaType.STRING },
                restPeriodSecs: { type: SchemaType.NUMBER },
                instructions: { type: SchemaType.STRING },
                alternativeExercise: { type: SchemaType.STRING },
              },
              required: ["name", "sets", "reps", "restPeriodSecs"],
            },
          },
          notes: { type: SchemaType.STRING },
        },
        required: ["day", "title", "exercises"],
      },
    },
    weeklyCaloriesBurnEstimate: { type: SchemaType.NUMBER },
  },
  required: ["summary", "workoutPlan", "weeklyCaloriesBurnEstimate"],
};

exports.generateWorkout = onCall(
  { secrets: [geminiApiKey] },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "User must be logged in.");
    }

    const uid = request.auth.uid;
    const { userProfile } = request.data;

    if (!userProfile) {
      throw new HttpsError("invalid-argument", "Missing user profile data.");
    }

    const genAI = new GoogleGenerativeAI(geminiApiKey.value());
    const model = genAI.getGenerativeModel({
      model: AI_MODEL,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: workoutSchema,
      },
    });

    const prompt = `Act as an expert certified fitness trainer. Generate a weekly workout plan for this profile:
    - Primary Goal: ${userProfile.goal}
    - Fitness Level: ${userProfile.fitnessLevel}
    - Frequency: ${userProfile.workoutDaysPerWeek} days/week
    - Duration Target: ${userProfile.preferredDurationMins} mins/session
    - Available Equipment: ${userProfile.availableEquipment?.join(", ") || "Bodyweight"}`;

    try {
      const result = await model.generateContent(prompt);
      const planJson = JSON.parse(result.response.text());

      const planRef = db
        .collection("users")
        .doc(uid)
        .collection("workouts")
        .doc("current_plan");

      const newPlan = {
        id: planRef.id,
        type: "workout",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        source: "ai",
        ...planJson,
      };

      await planRef.set(newPlan);
      return { planId: planRef.id, plan: newPlan };
    } catch (error) {
      console.error("Error generating workout:", error);
      throw new HttpsError("internal", error.message || "Failed to generate workout plan.");
    }
  }
);

// ==================================================================
// 2. MEAL PLAN GENERATOR
// ==================================================================
const mealPlanSchema = {
  type: SchemaType.OBJECT,
  properties: {
    dailyCalories: { type: SchemaType.NUMBER },
    macros: {
      type: SchemaType.OBJECT,
      properties: {
        proteinGrams: { type: SchemaType.NUMBER },
        carbsGrams: { type: SchemaType.NUMBER },
        fatsGrams: { type: SchemaType.NUMBER },
      },
      required: ["proteinGrams", "carbsGrams", "fatsGrams"],
    },
    waterIntakeLiters: { type: SchemaType.NUMBER },
    meals: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          mealType: { type: SchemaType.STRING },
          name: { type: SchemaType.STRING },
          calories: { type: SchemaType.NUMBER },
          ingredients: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
          },
          recipeInstructions: { type: SchemaType.STRING },
        },
        required: ["mealType", "name", "calories", "ingredients"],
      },
    },
    groceryList: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },
  },
  required: ["dailyCalories", "macros", "meals", "groceryList"],
};

exports.generateMealPlan = onCall(
  { secrets: [geminiApiKey] },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "User must be logged in.");
    }

    const uid = request.auth.uid;
    const { userProfile } = request.data;

    if (!userProfile) {
      throw new HttpsError("invalid-argument", "Missing user profile data.");
    }

    const genAI = new GoogleGenerativeAI(geminiApiKey.value());
    const model = genAI.getGenerativeModel({
      model: AI_MODEL,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: mealPlanSchema,
      },
    });

    const prompt = `Act as an expert sports nutritionist. Generate a daily meal plan with a grocery list for this profile:
    - Age: ${userProfile.age}, Gender: ${userProfile.gender}
    - Height: ${userProfile.heightCm} cm, Weight: ${userProfile.weightKg} kg, Target Weight: ${userProfile.targetWeightKg} kg
    - Goal: ${userProfile.goal}
    - Dietary Restrictions: ${
      userProfile.dietaryRestrictions?.length > 0
        ? userProfile.dietaryRestrictions.join(", ")
        : "None"
    }`;

    try {
      const result = await model.generateContent(prompt);
      const planJson = JSON.parse(result.response.text());

      const mealRef = db
        .collection("users")
        .doc(uid)
        .collection("meals")
        .doc("current_plan");

      const newMealPlan = {
        id: mealRef.id,
        type: "meal",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        ...planJson,
      };

      await mealRef.set(newMealPlan);
      return { planId: mealRef.id, plan: newMealPlan };
    } catch (error) {
      console.error("Error generating meal plan:", error);
      throw new HttpsError("internal", error.message || "Failed to generate meal plan.");
    }
  }
);

// ==================================================================
// 3. INTERACTIVE AI COACH CHAT
// ==================================================================
exports.askAICoach = onCall(
  { secrets: [geminiApiKey] },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "User must be logged in.");
    }

    const { message, userProfile } = request.data;
    if (!message) {
      throw new HttpsError("invalid-argument", "Message is required.");
    }

    try {
      const genAI = new GoogleGenerativeAI(geminiApiKey.value());
      const model = genAI.getGenerativeModel({ model: AI_MODEL });

      const prompt = `System Instruction: You are Coach Max, an encouraging, scientific personal fitness AI coach.
      Client Profile Context:
      - Goal: ${userProfile?.goal || "Overall fitness"}
      - Current Weight: ${userProfile?.weightKg || "N/A"} kg
      - Fitness Level: ${userProfile?.fitnessLevel || "Beginner"}

      User Question: "${message}"

      Response Requirements: Provide a direct, motivating, and concise answer under 150 words.`;

      const result = await model.generateContent(prompt);
      const replyText = result.response.text();

      return {
        reply: replyText,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Gemini Execution Error:", error);
      throw new HttpsError("internal", error.message || "Failed to consult AI coach.");
    }
  }
);