import { NextResponse } from "next/server"
import { plaidClient, isPlaidConfigured, PLAID_PRODUCTS, PLAID_COUNTRY_CODES } from "@/lib/plaid"

export async function POST(request: Request) {
  try {
    const { userId, platform } = await request.json()

    if (!isPlaidConfigured()) {
      console.warn("Plaid credentials not configured, using mock data")
      return NextResponse.json({
        link_token: `mock-link-sandbox-${Date.now()}`,
        expiration: new Date(Date.now() + 3600000).toISOString(),
        mock: true,
      })
    }

    // Create Plaid link token with all required products
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: userId,
      },
      client_name: "Boosted Earnings",
      products: PLAID_PRODUCTS,
      country_codes: PLAID_COUNTRY_CODES,
      language: "en",
      webhook: process.env.PLAID_WEBHOOK_URL,
      // Add platform-specific metadata
      ...(platform && {
        link_customization_name: platform,
      }),
    })

    return NextResponse.json({
      link_token: response.data.link_token,
      expiration: response.data.expiration,
      request_id: response.data.request_id,
    })
  } catch (error: any) {
    console.error("Error creating Plaid link token:", error)
    return NextResponse.json(
      {
        error: "Failed to create link token",
        details: error.response?.data || error.message,
      },
      { status: 500 },
    )
  }
}
