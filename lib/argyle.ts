import axios, { type AxiosInstance } from "axios"

const argyleApiBase = process.env.ARGYLE_API_BASE || "https://api.argyle.com/v2"
const argyleClientId = process.env.ARGYLE_CLIENT_ID
const argyleSecret = process.env.ARGYLE_SECRET

export const isArgyleConfigured = () => {
  return !!(argyleClientId && argyleSecret)
}

let argyleClient: AxiosInstance | null = null

if (isArgyleConfigured()) {
  argyleClient = axios.create({
    baseURL: argyleApiBase,
    auth: {
      username: argyleClientId!,
      password: argyleSecret!,
    },
    headers: {
      "Content-Type": "application/json",
    },
  })
}

// Mock responses for when Argyle is not configured
const mockEarnings = {
  results: [
    {
      id: "mock-earning-1",
      total: 450.75,
      tips: 85.25,
      bonuses: 25.0,
      start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      end_date: new Date().toISOString().split("T")[0],
      payout_status: "paid",
    },
  ],
}

const mockActivities = {
  results: [
    {
      id: "mock-trip-1",
      start_time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      end_time: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      distance: 12.5,
      duration: 55,
      status: "completed",
      earnings: {
        tip: 8.5,
        base: 18.75,
      },
      location: {
        city: "San Francisco",
      },
    },
  ],
}

const mockBalances = {
  results: [
    {
      platform: "uber",
      balance: 125.5,
      last_synced: new Date().toISOString(),
    },
  ],
}

export async function getEarnings({ accessToken, userId }: { accessToken?: string; userId?: string }) {
  if (!isArgyleConfigured() || !argyleClient) {
    console.warn("[Argyle] Not configured, returning mock earnings")
    return { data: mockEarnings, mock: true }
  }

  try {
    const response = await argyleClient.get("/earnings", {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      params: userId ? { user: userId } : {},
    })
    return { data: response.data, mock: false }
  } catch (error: any) {
    console.error("[Argyle] Error fetching earnings:", error.message)
    return { data: mockEarnings, mock: true, error: error.message }
  }
}

export async function getActivities({ accessToken, userId }: { accessToken?: string; userId?: string }) {
  if (!isArgyleConfigured() || !argyleClient) {
    console.warn("[Argyle] Not configured, returning mock activities")
    return { data: mockActivities, mock: true }
  }

  try {
    const response = await argyleClient.get("/activities", {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      params: userId ? { user: userId } : {},
    })
    return { data: response.data, mock: false }
  } catch (error: any) {
    console.error("[Argyle] Error fetching activities:", error.message)
    return { data: mockActivities, mock: true, error: error.message }
  }
}

export async function getBalances({ accessToken, userId }: { accessToken?: string; userId?: string }) {
  if (!isArgyleConfigured() || !argyleClient) {
    console.warn("[Argyle] Not configured, returning mock balances")
    return { data: mockBalances, mock: true }
  }

  try {
    const response = await argyleClient.get("/balances", {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      params: userId ? { user: userId } : {},
    })
    return { data: response.data, mock: false }
  } catch (error: any) {
    console.error("[Argyle] Error fetching balances:", error.message)
    return { data: mockBalances, mock: true, error: error.message }
  }
}

export async function exchangeCode(code: string) {
  if (!isArgyleConfigured() || !argyleClient) {
    console.warn("[Argyle] Not configured, returning mock exchange")
    return { access_token: `mock-token-${Date.now()}`, item_id: `mock-item-${Date.now()}`, mock: true }
  }

  try {
    const response = await argyleClient.post("/tokens", { code })
    return { ...response.data, mock: false }
  } catch (error: any) {
    console.error("[Argyle] Error exchanging code:", error.message)
    return { access_token: `mock-token-${Date.now()}`, item_id: `mock-item-${Date.now()}`, mock: true }
  }
}
