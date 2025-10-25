import { type NextRequest, NextResponse } from "next/server"
import { plaidClient, isPlaidConfigured } from "@/lib/plaid"
import {
  getPlaidItemsCollection,
  saveAccount,
  saveBalanceHistory,
  type Account,
  type BalanceHistory,
} from "@/lib/mongodb-schemas"
import { generateRequestId, logRequest, logResponse, logError } from "@/lib/request-logger"
import { revalidateTag } from "next/cache"

export async function POST(request: NextRequest) {
  const requestId = generateRequestId()

  try {
    const body = await request.json()
    logRequest(requestId, "POST", "/api/plaid/balances", body)

    const { userId } = body

    if (!userId) {
      const error = { error: "User ID is required" }
      logResponse(requestId, 400, error)
      return NextResponse.json(error, { status: 400 })
    }

    if (!isPlaidConfigured()) {
      console.warn(`[${requestId}] Plaid not configured, returning mock balances`)
      const mockResponse = {
        accounts: [
          {
            accountId: "mock-account-1",
            name: "Chase Checking",
            type: "depository",
            subtype: "checking",
            mask: "1234",
            availableBalance: 2450.5,
            currentBalance: 2450.5,
            currency: "USD",
          },
        ],
        accountsUpdated: 1,
        mock: true,
      }
      logResponse(requestId, 200, mockResponse)
      return NextResponse.json(mockResponse)
    }

    // Get all Plaid items for this user
    const itemsCollection = await getPlaidItemsCollection()
    const items = await itemsCollection.find({ userId }).toArray()

    if (items.length === 0) {
      const response = { accounts: [], accountsUpdated: 0, message: "No connected accounts" }
      logResponse(requestId, 200, response)
      return NextResponse.json(response)
    }

    const allAccounts: any[] = []
    let accountsUpdated = 0

    // Fetch balances for each item
    for (const item of items) {
      try {
        const response = await plaidClient.accountsBalanceGet({
          access_token: item.accessToken,
        })

        const accounts = response.data.accounts

        // Save accounts and balance history
        for (const account of accounts) {
          const accountData: Account = {
            userId,
            itemId: item.itemId,
            accountId: account.account_id,
            name: account.name,
            officialName: account.official_name || undefined,
            type: account.type,
            subtype: account.subtype,
            mask: account.mask || undefined,
            availableBalance: account.balances.available || undefined,
            currentBalance: account.balances.current,
            limit: account.balances.limit || undefined,
            currency: account.balances.iso_currency_code || "USD",
            createdAt: new Date(),
            updatedAt: new Date(),
          }

          await saveAccount(accountData)

          // Save balance history snapshot
          const balanceHistory: BalanceHistory = {
            userId,
            accountId: account.account_id,
            availableBalance: account.balances.available || undefined,
            currentBalance: account.balances.current,
            limit: account.balances.limit || undefined,
            currency: account.balances.iso_currency_code || "USD",
            recordedAt: new Date(),
          }

          await saveBalanceHistory(balanceHistory)

          allAccounts.push({
            accountId: account.account_id,
            name: account.name,
            type: account.type,
            subtype: account.subtype,
            mask: account.mask,
            availableBalance: account.balances.available,
            currentBalance: account.balances.current,
            limit: account.balances.limit,
            currency: account.balances.iso_currency_code || "USD",
          })

          accountsUpdated++
        }

        // Update last synced time
        await itemsCollection.updateOne({ itemId: item.itemId }, { $set: { lastSynced: new Date() } })
      } catch (error: any) {
        console.error(`[${requestId}] Error fetching balances for item ${item.itemId}:`, error.message)
        continue
      }
    }

    revalidateTag("dashboard-stats")
    revalidateTag("plaid-balances")

    const responseData = { accounts: allAccounts, accountsUpdated }
    logResponse(requestId, 200, responseData)
    return NextResponse.json(responseData)
  } catch (error: any) {
    logError(requestId, error)
    return NextResponse.json({ error: error.message || "Failed to fetch balances", requestId }, { status: 500 })
  }
}
