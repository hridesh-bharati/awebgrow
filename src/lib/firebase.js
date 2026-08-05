// src\lib\firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Safe Browser Initialization
const app = typeof window !== 'undefined'
  ? (!getApps().length ? initializeApp(firebaseConfig) : getApp())
  : null;

export const rtdb = app ? getDatabase(app) : null;
export const auth = app ? getAuth(app) : null;