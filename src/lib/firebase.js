// // src\lib\firebase.js
// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getDatabase } from "firebase/database"; 
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,       
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
// };
 
// const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// export const rtdb = getDatabase(app);
// export const auth = getAuth(app); 

// src/lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database"; 
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,       
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// ✅ FIX: Only initialize on client side (browser)
const getFirebaseApp = () => {
  // 🔥 CRITICAL: Check if we're on the server (during build/SSR)
  if (typeof window === 'undefined') {
    return null; // Don't initialize on server
  }
  
  // Client-side: initialize Firebase
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
};

const app = getFirebaseApp();

// ✅ FIX: Export null-safe instances
export const rtdb = app ? getDatabase(app) : null;
export const auth = app ? getAuth(app) : null;

// ✅ Helper to check if Firebase is ready (use this in components)
export const isFirebaseReady = () => {
  return typeof window !== 'undefined' && app !== null;
};

// ✅ Optional: Debug helper
export const getFirebaseStatus = () => ({
  isReady: app !== null,
  isServer: typeof window === 'undefined',
  hasConfig: !!firebaseConfig.projectId,
  projectId: firebaseConfig.projectId
});