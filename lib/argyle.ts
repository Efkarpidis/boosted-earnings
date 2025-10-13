// Argyle API integration for gig economy earnings data
// Argyle provides access to employment and income data from platforms like Uber, Lyft, DoorDash

export class ArgyleClient {
  private apiKey: string
  private apiSecret: string
  private baseUrl: string

  constructor() {
    this.apiKey = process.env.ARGYLE_API_KEY || ""
    this.apiSecret = process.env.ARGYLE_API_SECRET || ""
    this.baseUrl = process.env.ARGYLE_API_URL || "https://api.argyle.com/v1"
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const auth = Buffer.from(`${this.apiKey}:${this.apiSecret}`).toString("base64")

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Argyle API error: ${response.statusText}`)
    }

    return response.json()
  }

  // Create a user link token for connecting accounts
  async createLinkToken(userId: string) {
    return this.request("/link-tokens", {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/connect`,
      }),
    })
  }

  // Get user accounts (Uber, Lyft, DoorDash, etc.)
  async getAccounts(userId: string) {
    return this.request(`/users/${userId}/accounts`)
  }

  // Get earnings data from connected accounts
  async getEarnings(accountId: string, startDate?: string, endDate?: string) {
    let endpoint = `/accounts/${accountId}/earnings`
    const params = new URLSearchParams()

    if (startDate) params.append("from_date", startDate)
    if (endDate) params.append("to_date", endDate)

    if (params.toString()) {
      endpoint += `?${params.toString()}`
    }

    return this.request(endpoint)
  }

  // Get activities (trips, deliveries)
  async getActivities(accountId: string, startDate?: string, endDate?: string) {
    let endpoint = `/accounts/${accountId}/activities`
    const params = new URLSearchParams()

    if (startDate) params.append("from_date", startDate)
    if (endDate) params.append("to_date", endDate)

    if (params.toString()) {
      endpoint += `?${params.toString()}`
    }

    return this.request(endpoint)
  }

  // Get profile information
  async getProfile(accountId: string) {
    return this.request(`/accounts/${accountId}/profiles`)
  }
}

export const argyle = new ArgyleClient()
