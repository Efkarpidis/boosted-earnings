import { Configuration, PlaidApi, PlaidEnvironments, Products, CountryCode } from "plaid"

// Initialize Plaid client configuration
const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV as keyof typeof PlaidEnvironments] || PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID || "",
      "PLAID-SECRET": process.env.PLAID_SECRET || "",
    },
  },
})

export const plaidClient = new PlaidApi(configuration)

// Helper function to check if Plaid is configured
export function isPlaidConfigured(): boolean {
  return !!(process.env.PLAID_CLIENT_ID && process.env.PLAID_SECRET)
}

// Plaid products we're using
export const PLAID_PRODUCTS: Products[] = [
  Products.Auth,
  Products.Balance,
  Products.Identity,
  Products.Assets,
  Products.Transactions,
]

// Country codes
export const PLAID_COUNTRY_CODES: CountryCode[] = [CountryCode.Us]
