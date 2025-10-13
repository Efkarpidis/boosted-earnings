// Plaid API integration for bank account verification and income data
// Used for verifying driver income and connecting bank accounts

export class PlaidClient {
  private clientId: string
  private secret: string
  private baseUrl: string

  constructor() {
    this.clientId = process.env.PLAID_CLIENT_ID || ""
    this.secret = process.env.PLAID_SECRET || ""
    this.baseUrl = process.env.PLAID_ENV === "production" ? "https://production.plaid.com" : "https://sandbox.plaid.com"
  }

  private async request(endpoint: string, body: any) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: this.clientId,
        secret: this.secret,
        ...body,
      }),
    })

    if (!response.ok) {
      throw new Error(`Plaid API error: ${response.statusText}`)
    }

    return response.json()
  }

  // Create a link token for Plaid Link
  async createLinkToken(userId: string) {
    return this.request("/link/token/create", {
      user: { client_user_id: userId },
      client_name: "Boosted Earnings",
      products: ["auth", "transactions", "income"],
      country_codes: ["US"],
      language: "en",
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/connect`,
    })
  }

  // Exchange public token for access token
  async exchangePublicToken(publicToken: string) {
    return this.request("/item/public_token/exchange", {
      public_token: publicToken,
    })
  }

  // Get account balances
  async getBalance(accessToken: string) {
    return this.request("/accounts/balance/get", {
      access_token: accessToken,
    })
  }

  // Get transactions
  async getTransactions(accessToken: string, startDate: string, endDate: string) {
    return this.request("/transactions/get", {
      access_token: accessToken,
      start_date: startDate,
      end_date: endDate,
    })
  }

  // Get income verification
  async getIncome(accessToken: string) {
    return this.request("/income/get", {
      access_token: accessToken,
    })
  }
}

export const plaid = new PlaidClient()
