import { NextResponse } from "next/server"
import { plaidClient, isPlaidConfigured } from "@/lib/plaid"
import { getPlaidAccountsCollection } from "@/lib/mongodb-schemas"

export async function POST(request: Request) {
  try {
    const { publicToken, userId, platform } = await request.json()

    if (!isPlaidConfigured()) {
      console.warn("Plaid credentials not configured, using mock data")
      return NextResponse.json({
        accessToken: `mock-access-sandbox-${Date.now()}`,
        itemId: `mock-item-${Date.now()}`,
        accountId: `mock-account-${Date.now()}`,
        success: true,
        mock: true,
      })
    }

    // Exchange public token for access token
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    })

    const accessToken = response.data.access_token
    const itemId = response.data.item_id

    // Get account information
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    })

    const accountId = accountsResponse.data.accounts[0]?.account_id

    try {
      const collection = await getPlaidAccountsCollection()
      await collection.insertOne({
        userId,
        platform: platform || "Unknown",
        accessToken,
        itemId,
        accountId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    } catch (dbError) {
      console.error("Error storing Plaid account in MongoDB:", dbError)
      // Continue even if DB storage fails
    }

    return NextResponse.json({
      accessToken,
      itemId,
      accountId,
      success: true,
    })
  } catch (error: any) {
    console.error("Error exchanging Plaid token:", error)
    return NextResponse.json(
      {
        error: "Failed to exchange token",
        details: error.response?.data || error.message,
      },
      { status: 500 },
    )
  }
}
