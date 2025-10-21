import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { publicToken, userId } = await request.json()

    const plaidClientId = process.env.PLAID_CLIENT_ID
    const plaidSecret = process.env.PLAID_SECRET
    const plaidEnv = process.env.PLAID_ENV || "sandbox"

    if (!plaidClientId || !plaidSecret) {
      console.warn("Plaid credentials not configured, using mock data")
      return NextResponse.json({
        accessToken: `mock-access-sandbox-${Date.now()}`,
        itemId: `mock-item-${Date.now()}`,
        success: true,
      })
    }

    // Exchange public token for access token
    const response = await fetch(`https://${plaidEnv}.plaid.com/item/public_token/exchange`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: plaidClientId,
        secret: plaidSecret,
        public_token: publicToken,
      }),
    })

    if (!response.ok) {
      throw new Error(`Plaid API error: ${response.statusText}`)
    }

    const data = await response.json()

    // In production, store the access_token securely in your database
    // associated with the userId

    return NextResponse.json({
      accessToken: data.access_token,
      itemId: data.item_id,
      success: true,
    })
  } catch (error) {
    console.error("Error exchanging Plaid token:", error)
    return NextResponse.json({ error: "Failed to exchange token" }, { status: 500 })
  }
}
