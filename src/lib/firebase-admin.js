// src\lib\firebase-admin.js
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import { getAuth } from "firebase-admin/auth";

let adminApp = null;
let adminDatabase = null;
let adminAuth = null;

const existingApps = getApps();

if (existingApps.length === 0) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "webgrow-d55e1";
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (privateKey && clientEmail) {
    try {
      // Line break safe guard processing
      if (privateKey.includes("\\n")) {
        privateKey = privateKey.replace(/\\n/g, "\n");
      }

      adminApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || `https://${projectId}-default-rtdb.firebaseio.com`,
      });

      console.log("🚀 [SERVER ENGINE] Firebase Admin App initialized successfully!");
    } catch (error) {
      console.error("❌ [SERVER ENGINE] Firebase Admin initialization crashed:", error);
    }
  } else {
    console.warn("⚠️ [SERVER ENGINE] Firebase Admin credentials missing in env variables.");
  }
} else {
  adminApp = existingApps[0];
}
if (adminApp) {
  adminDatabase = getDatabase(adminApp);
  adminAuth = getAuth(adminApp);
}

export { adminDatabase, adminAuth };
export default adminApp;