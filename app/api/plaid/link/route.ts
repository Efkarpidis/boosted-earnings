import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { userId } = await request.json()

    const plaidClientId = process.env.PLAID_CLIENT_ID
    const plaidSecret = process.env.PLAID_SECRET
    const plaidEnv = process.env.PLAID_ENV || "sandbox"

    if (!plaidClientId || !plaidSecret) {
      console.warn("Plaid credentials not configured, using mock data")
      return NextResponse.json({
        linkToken: `mock-link-sandbox-${Date.now()}`,
        expiration: new Date(Date.now() + 3600000).toISOString(),
      })
    }

    // Create Plaid link token
    const response = await fetch(`https://${plaidEnv}.plaid.com/link/token/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: plaidClientId,
        secret: plaidSecret,
        user: {
          client_user_id: userId,
        },
        client_name: "Boosted Earnings",
        products: ["transactions", "auth"],
        country_codes: ["US"],
        language: "en",
      }),
    })

    if (!response.ok) {
      throw new Error(`Plaid API error: ${response.statusText}`)
    }

    const data = await response.json()

    return NextResponse.json({
      linkToken: data.link_token,
      expiration: data.expiration,
    })
  } catch (error) {
    console.error("Error creating Plaid link token:", error)
    return NextResponse.json({ error: "Failed to create link token" }, { status: 500 })
  }
}
