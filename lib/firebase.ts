import { initializeApp, getApps, FirebaseError } from "firebase/app"
import { getFirestore, collection, addDoc, query, where, getDocs, orderBy, limit } from "firebase/firestore"
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth"

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

export { collection, addDoc, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink }

export async function checkExistingEmail(email: string): Promise<{ exists: boolean; message?: string }> {
  try {
    if (!db) {
      throw new Error("Firestore is not initialized")
    }

    const submissionsRef = collection(db, "submissions")
    const q = query(submissionsRef, where("email", "==", email), orderBy("timestamp", "desc"), limit(1))

    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return { exists: false }
    }

    const lastSubmission = querySnapshot.docs[0].data()
    const lastSubmissionTime = lastSubmission.timestamp?.toDate() || new Date(0)
    const now = new Date()
    const timeDifference = now.getTime() - lastSubmissionTime.getTime()
    const fiveMinutesInMs = 5 * 60 * 1000

    if (timeDifference < fiveMinutesInMs) {
      const remainingMinutes = Math.ceil((fiveMinutesInMs - timeDifference) / 60000)
      return {
        exists: true,
        message: `This email was recently used. Please wait ${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""} before submitting again.`,
      }
    }

    return { exists: false }
  } catch (error) {
    console.error("[Firebase] Error checking existing email:", error)
    throw new Error("Failed to check email. Please try again.")
  }
}

export { app, db, auth }
