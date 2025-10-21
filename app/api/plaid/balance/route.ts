import { NextResponse } from "next/server"
import { plaidClient, isPlaidConfigured } from "@/lib/plaid"
import { saveBankBalance } from "@/lib/mongodb-schemas"

export async function POST(request: Request) {
  try {
    const { accessToken, userId, platform, accountId } = await request.json()

    if (!isPlaidConfigured() || accessToken?.startsWith("mock-")) {
      console.warn("Using mock balance data")
      return NextResponse.json({
        balance: {
          available: 2847.5,
          current: 2847.5,
          currency: "USD",
        },
        mock: true,
      })
    }

    // Fetch balance from Plaid
    const response = await plaidClient.accountsBalanceGet({
      access_token: accessToken,
    })

    const account = response.data.accounts.find((acc) => acc.account_id === accountId) || response.data.accounts[0]

    const balanceData = {
      userId,
      platform,
      accountId: account.account_id,
      available: account.balances.available || 0,
      current: account.balances.current || 0,
      limit: account.balances.limit || undefined,
      currency: account.balances.iso_currency_code || "USD",
      lastUpdated: new Date(),
    }

    // Save to MongoDB
    await saveBankBalance(balanceData)

    return NextResponse.json({
      balance: {
        available: balanceData.available,
        current: balanceData.current,
        limit: balanceData.limit,
        currency: balanceData.currency,
      },
    })
  } catch (error: any) {
    console.error("Error fetching balance:", error)
    return NextResponse.json({ error: "Failed to fetch balance", details: error.message }, { status: 500 })
  }
}
