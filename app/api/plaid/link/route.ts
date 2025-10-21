import { NextResponse } from "next/server"
import { plaidClient, isPlaidConfigured } from "@/lib/plaid"
import { CountryCode, Products } from "plaid"

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

    // Create Plaid link token for sandbox environment
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: userId,
      },
      client_name: "Boosted Earnings",
      products: [Products.Auth, Products.Transactions, Products.Identity, Products.Assets],
      country_codes: [CountryCode.Us],
      language: "en",
      webhook: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/plaid/webhook`,
      account_filters: {
        depository: {
          account_subtypes: ["checking", "savings"],
        },
      },
    })

    return NextResponse.json({
      link_token: response.data.link_token,
      expiration: response.data.expiration,
      request_id: response.data.request_id,
    })
  } catch (error: any) {
    console.error("Error creating Plaid link token:", error)
    return NextResponse.json({ error: "Failed to create link token", details: error.message }, { status: 500 })
  }
}
