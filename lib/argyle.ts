import axios, { type AxiosInstance } from "axios"
import { env } from "./env"

const argyleApiBase = env.argyleApiBase
const argyleClientId = env.argyleClientId
const argyleSecret = env.argyleSecret

export const isArgyleConfigured = () => {
  return !!(argyleClientId && argyleSecret) && !env.isMockMode
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

async function retryWithBackoff<T>(fn: () => Promise<T>, maxAttempts = 3, baseDelay = 100): Promise<T> {
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error: any) {
      lastError = error
      const status = error.response?.status

      // Don't retry on 4xx errors (except 429)
      if (status && status >= 400 && status < 500 && status !== 429) {
        throw error
      }

      if (attempt < maxAttempts) {
        const delay = Math.min(baseDelay * Math.pow(1.6, attempt - 1), 1600)
        console.log(`[Argyle] Retry attempt ${attempt}/${maxAttempts} after ${delay}ms`)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError
}

export async function fetchAllPages<T>(
  endpoint: string,
  accessToken?: string,
  params: Record<string, any> = {},
): Promise<{ results: T[]; pagesFetched: number }> {
  if (!isArgyleConfigured() || !argyleClient) {
    return { results: [], pagesFetched: 0 }
  }

  const allResults: T[] = []
  let cursor: string | null = null
  let pagesFetched = 0

  do {
    const response = await retryWithBackoff(async () => {
      return await argyleClient!.get(endpoint, {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        params: { ...params, cursor },
      })
    })

    const data = response.data
    if (data.results && Array.isArray(data.results)) {
      allResults.push(...data.results)
    }

    cursor = data.next || null
    pagesFetched++

    console.log(`[Argyle] Fetched page ${pagesFetched} from ${endpoint}, got ${data.results?.length || 0} items`)
  } while (cursor)

  return { results: allResults, pagesFetched }
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

export async function getEarnings({
  accessToken,
  userId,
  since,
}: { accessToken?: string; userId?: string; since?: string }) {
  if (!isArgyleConfigured() || !argyleClient) {
    console.warn("[Argyle] Not configured, returning mock earnings")
    return { data: mockEarnings, mock: true, pagesFetched: 0 }
  }

  try {
    const params: Record<string, any> = {}
    if (userId) params.user = userId
    if (since) params.from_start_date = since

    const { results, pagesFetched } = await fetchAllPages("/earnings", accessToken, params)
    return { data: { results }, mock: false, pagesFetched }
  } catch (error: any) {
    console.error("[Argyle] Error fetching earnings:", error.message)
    return { data: mockEarnings, mock: true, error: error.message, pagesFetched: 0 }
  }
}

export async function getActivities({
  accessToken,
  userId,
  since,
}: { accessToken?: string; userId?: string; since?: string }) {
  if (!isArgyleConfigured() || !argyleClient) {
    console.warn("[Argyle] Not configured, returning mock activities")
    return { data: mockActivities, mock: true, pagesFetched: 0 }
  }

  try {
    const params: Record<string, any> = {}
    if (userId) params.user = userId
    if (since) params.from_start_time = since

    const { results, pagesFetched } = await fetchAllPages("/activities", accessToken, params)
    return { data: { results }, mock: false, pagesFetched }
  } catch (error: any) {
    console.error("[Argyle] Error fetching activities:", error.message)
    return { data: mockActivities, mock: true, error: error.message, pagesFetched: 0 }
  }
}

export async function getBalances({ accessToken, userId }: { accessToken?: string; userId?: string }) {
  if (!isArgyleConfigured() || !argyleClient) {
    console.warn("[Argyle] Not configured, returning mock balances")
    return { data: mockBalances, mock: true }
  }

  try {
    const response = await retryWithBackoff(async () => {
      return await argyleClient!.get("/balances", {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        params: userId ? { user: userId } : {},
      })
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

export async function createLinkToken(userId: string) {
  if (!isArgyleConfigured() || !argyleClient) {
    console.warn("[Argyle] Not configured, returning mock link token")
    return { link_token: `mock-link-token-${Date.now()}`, mock: true }
  }

  try {
    const response = await argyleClient.post("/link-tokens", {
      user_id: userId,
      redirect_uri: `${env.appUrl}/connect/callback`,
    })
    return { link_token: response.data.token, mock: false }
  } catch (error: any) {
    console.error("[Argyle] Error creating link token:", error.message)
    return { link_token: `mock-link-token-${Date.now()}`, mock: true }
  }
}

export async function createUserToken(userId: string) {
  if (!isArgyleConfigured() || !argyleClient) {
    console.warn("[Argyle] Not configured, returning mock user token")
    return { user_token: `mock-user-token-${userId}-${Date.now()}`, mock: true }
  }

  try {
    const response = await argyleClient.post("/user-tokens", {
      user_id: userId,
    })
    return { user_token: response.data.user_token, mock: false }
  } catch (error: any) {
    console.error("[Argyle] Error creating user token:", error.message)
    return { user_token: `mock-user-token-${userId}-${Date.now()}`, mock: true, error: error.message }
  }
}

export { env }
