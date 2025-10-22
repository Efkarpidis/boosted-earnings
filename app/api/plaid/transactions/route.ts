import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const accessToken = searchParams.get("accessToken")

    const plaidClientId = process.env.PLAID_CLIENT_ID
    const plaidSecret = process.env.PLAID_SECRET
    const plaidEnv = process.env.PLAID_ENV || "sandbox"

    if (!plaidClientId || !plaidSecret || !accessToken || accessToken.startsWith("mock-")) {
      console.warn("Using mock transaction data")
      return NextResponse.json(getMockTransactions())
    }

    // Fetch transactions from Plaid
    const endDate = new Date().toISOString().split("T")[0]
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

    const response = await fetch(`https://${plaidEnv}.plaid.com/transactions/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: plaidClientId,
        secret: plaidSecret,
        access_token: accessToken,
        start_date: startDate,
        end_date: endDate,
      }),
    })

    if (!response.ok) {
      throw new Error(`Plaid API error: ${response.statusText}`)
    }

    const data = await response.json()

    return NextResponse.json({
      transactions: data.transactions,
      accounts: data.accounts,
    })
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}

function getMockTransactions() {
  return {
    transactions: [
      { date: "2024-01-20", name: "Uber Earnings Deposit", amount: 720, category: ["Income"] },
      { date: "2024-01-19", name: "Lyft Earnings Deposit", amount: 580, category: ["Income"] },
      { date: "2024-01-18", name: "DoorDash Earnings", amount: 390, category: ["Income"] },
    ],
    accounts: [{ account_id: "mock_account_1", name: "Checking Account", type: "depository" }],
  }
}
