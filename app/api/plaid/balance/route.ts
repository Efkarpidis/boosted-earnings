import { NextResponse } from "next/server"
import { plaidClient, isPlaidConfigured } from "@/lib/plaid"
import { getBankBalancesCollection } from "@/lib/mongodb-schemas"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const accessToken = searchParams.get("accessToken")
    const userId = searchParams.get("userId")
    const platform = searchParams.get("platform")

    if (!accessToken || !userId) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    if (!isPlaidConfigured() || accessToken.startsWith("mock-")) {
      console.warn("Using mock balance data")
      return NextResponse.json({
        accounts: [
          {
            account_id: "mock_account_1",
            balances: {
              available: 2847.5,
              current: 2847.5,
              limit: null,
              iso_currency_code: "USD",
            },
            name: `${platform || "Platform"} Earnings Account`,
            type: "depository",
            subtype: "checking",
          },
        ],
        mock: true,
      })
    }

    // Fetch balance from Plaid
    const response = await plaidClient.accountsBalanceGet({
      access_token: accessToken,
    })

    try {
      const collection = await getBankBalancesCollection()
      for (const account of response.data.accounts) {
        await collection.updateOne(
          { userId, accountId: account.account_id },
          {
            $set: {
              platform: platform || "Unknown",
              available: account.balances.available || 0,
              current: account.balances.current || 0,
              limit: account.balances.limit,
              currency: account.balances.iso_currency_code || "USD",
              lastUpdated: new Date(),
            },
          },
          { upsert: true },
        )
      }
    } catch (dbError) {
      console.error("Error storing balance in MongoDB:", dbError)
    }

    return NextResponse.json({
      accounts: response.data.accounts,
      request_id: response.data.request_id,
    })
  } catch (error: any) {
    console.error("Error fetching balance:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch balance",
        details: error.response?.data || error.message,
      },
      { status: 500 },
    )
  }
}
