import { Configuration, PlaidApi, PlaidEnvironments } from "plaid"

const plaidClientId = process.env.PLAID_CLIENT_ID
const plaidSecret = process.env.PLAID_SECRET
const plaidEnv = process.env.PLAID_ENV || "sandbox"

if (!plaidClientId || !plaidSecret) {
  console.warn("Plaid credentials not configured. Using mock data.")
}

const configuration = new Configuration({
  basePath: PlaidEnvironments[plaidEnv as keyof typeof PlaidEnvironments],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": plaidClientId || "",
      "PLAID-SECRET": plaidSecret || "",
    },
  },
})

export const plaidClient = new PlaidApi(configuration)

export const isPlaidConfigured = () => {
  return !!(plaidClientId && plaidSecret)
}
