import { initializeApp, getApps, FirebaseError } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

function validateFirebaseConfig() {
  const requiredKeys = ["apiKey", "authDomain", "projectId", "storageBucket", "messagingSenderId", "appId"]

  const missingKeys = requiredKeys.filter((key) => !firebaseConfig[key as keyof typeof firebaseConfig])

  if (missingKeys.length > 0) {
    throw new Error(
      `Firebase configuration error: Missing required environment variables for ${missingKeys.join(", ")}. ` +
        `Please ensure all NEXT_PUBLIC_FIREBASE_* environment variables are set.`,
    )
  }
}

let app
let db
let auth

try {
  validateFirebaseConfig()
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
  db = getFirestore(app)
  auth = getAuth(app)
} catch (error) {
  if (error instanceof FirebaseError && error.code === "auth/configuration-not-found") {
    console.error("[Firebase] Authentication configuration not found. Please check your Firebase project settings.")
    throw new Error("Firebase authentication is not properly configured. Please contact support.")
  } else if (error instanceof Error) {
    console.error("[Firebase] Initialization error:", error.message)
    throw error
  } else {
    console.error("[Firebase] Unknown initialization error")
    throw new Error("Failed to initialize Firebase")
  }
}

export { app, db, auth }
