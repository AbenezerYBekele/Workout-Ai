# 🏋️‍♂️ Pulse AI — Intelligent Fitness & Nutrition Mobile Coach

> A production-grade, cross-platform mobile application powered by **React Native (Expo)**, **Firebase**, and **Google Gemini AI**. Pulse AI creates personalized workout routines, custom macro nutrition plans, weight tracking visualizer charts, and real-time interactive AI fitness coaching.

---

## 🌟 Technical Highlights for Recruiters

* **Deterministic AI JSON Schemas:** Enforces strict structural constraints on Generative AI prompts, guaranteeing 100% predictable JSON payloads for mobile rendering.
* **Serverless Proxy & Zero-Trust Security:** API keys are protected using **Firebase Secret Manager** and **Firebase AI Logic**, completely eliminating client-side key exposure in mobile production bundles.
* **Reactive Route Guarding:** Built a central navigation observer in **Expo Router** using the **Observer Pattern** (`onAuthStateChanged`) and route segment monitoring to handle auth states and onboarding gates seamlessly.
* **Optimized Local Caching:** Utilized **Zustand** for client-side state caching to minimize Firestore read operations and ensure instant UI transitions.
* **Enterprise Modular Design System:** Engineered a decoupled styling architecture (`.styles.js`) supporting responsive desktop split-screens and mobile viewports.

<p align="center">
   <img width="300" alt="Workout AI - Profile" src="https://github.com/user-attachments/assets/a2aed9d1-c813-465d-995a-b6026fc05d20" />
  <img width="300" alt="Workout AI - Home" src="https://github.com/user-attachments/assets/7a2bd968-d37e-4c52-a2a2-dd6c484aa7fe" />
  <img width="300" alt="Workout AI - Progress" src="https://github.com/user-attachments/assets/b2c65d58-846e-48c6-8f1a-cc39f18356d9" />
 
</p>


## 🚀 Key Feature Modules
1. Authentication & Onboarding
2. AI Workout Generator
3. AI Meal Planner & Grocery List
4. Progress Visualizer & Cloud Storage
5. Real-Time AI Coach ("Coach Max")

## Technical Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React Native (Expo SDK 52/57) |
| **Routing & Navigation** | Expo Router (File-based navigation) |
| **Global State Management** | Zustand |
| **Backend & Database** | Firebase Cloud Firestore |
| **Authentication** | Firebase Authentication (Email, OAuth, Anonymous) |
| **Media Storage** | Firebase Storage |
| **AI / Machine Learning** | Google Gemini 2.0 Flash / Firebase AI Logic |
| **Styling & Design** | React Native StyleSheet / NativeWind (Tailwind CSS) |
| **Data Visualization** | React Native Chart Kit & React Native SVG |


### 🛠️ Tech Stack & Purpose

| Layer | Technology | Version | Purpose in Application |
| :--- | :--- | :--- | :--- |
| **Framework** | [React Native (Expo)](https://expo.dev) | SDK 52 / 57 | Cross-platform mobile & web runtime |
| **Routing** | [Expo Router](https://docs.expo.dev/router/introduction/) | v4 / v5 | File-based navigation & route guarding |
| **AI Engine** | [Google Gemini 2.0 Flash](https://ai.google.dev) | v2.0 | Generating workout plans, macros, & chat responses |
| **Database** | [Cloud Firestore](https://firebase.google.com/docs/firestore) | v11+ | Storing user profiles, workout plans, & logs |
| **Authentication** | [Firebase Auth](https://firebase.google.com/docs/auth) | v11+ | Email/Password, Anonymous, & Google Sign-In |
| **File Storage** | [Firebase Storage](https://firebase.google.com/docs/storage) | v11+ | Cloud storage for progress transformation photos |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) | v5+ | Lightweight client-side profile caching |
| **Visualization** | [React Native Chart Kit](https://github.com/indiespirit/react-native-chart-kit) | v7+ | Rendering dynamic weight trend line charts |
| **Icons** | [Lucide React Native](https://lucide.dev) | v1.25+ | Modern vector icons for UI tabs & cards |

