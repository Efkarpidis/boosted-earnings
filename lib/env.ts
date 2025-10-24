export interface EnvConfig {
  // Firebase
  firebaseApiKey: string
  firebaseAuthDomain: string
  firebaseProjectId: string
  firebaseStorageBucket: string
  firebaseMessagingSenderId: string
  firebaseAppId: string
  firebaseMeasurementId: string

  // MongoDB
  mongodbUri: string

  // Plaid
  plaidClientId?: string
  plaidSecret?: string
  plaidEnv: string

  // Argyle
  argyleClientId?: string
  argyleSecret?: string
  argyleEnv: string
  argyleWebhookSecret?: string
  argyleApiBase: string

  // App
  appUrl: string
  isMockMode: boolean
}

export function validateEnv(): EnvConfig {
  const isMockMode = process.env.ARGYLE_MOCK === "1" || process.env.NODE_ENV === "development"

  const config: EnvConfig = {
    // Firebase (required)
    firebaseApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    firebaseAuthDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    firebaseProjectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    firebaseStorageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    firebaseMessagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    firebaseAppId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
    firebaseMeasurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",

    // MongoDB (required)
    mongodbUri: process.env.MONGODB_URI || "",

    // Plaid (optional in mock mode)
    plaidClientId: process.env.PLAID_CLIENT_ID,
    plaidSecret: process.env.PLAID_SECRET,
    plaidEnv: process.env.PLAID_ENV || "sandbox",

    // Argyle (optional in mock mode)
    argyleClientId: process.env.ARGYLE_CLIENT_ID,
    argyleSecret: process.env.ARGYLE_SECRET,
    argyleEnv: process.env.ARGYLE_ENV || "sandbox",
    argyleWebhookSecret: process.env.ARGYLE_WEBHOOK_SECRET,
    argyleApiBase: process.env.ARGYLE_API_BASE || "https://api.argyle.com/v2",

    // App
    appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    isMockMode,
  }

  // Validate required fields
  const errors: string[] = []

  if (!config.firebaseApiKey) errors.push("NEXT_PUBLIC_FIREBASE_API_KEY is required")
  if (!config.mongodbUri) errors.push("MONGODB_URI is required")

  if (!isMockMode) {
    if (!config.argyleClientId) errors.push("ARGYLE_CLIENT_ID is required (or set ARGYLE_MOCK=1)")
    if (!config.argyleSecret) errors.push("ARGYLE_SECRET is required (or set ARGYLE_MOCK=1)")
    if (!config.argyleWebhookSecret)
      console.warn("[ENV] ARGYLE_WEBHOOK_SECRET not set - webhook signature verification disabled")
  }

  if (errors.length > 0) {
    console.error("[ENV] Configuration errors:")
    errors.forEach((error) => console.error(`  - ${error}`))
    if (!isMockMode) {
      throw new Error(`Environment validation failed: ${errors.join(", ")}`)
    }
  }

  if (isMockMode) {
    console.log("[ENV] Running in MOCK MODE - using sample data")
  }

  return config
}

export const env = validateEnv()
