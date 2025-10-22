import { type NextRequest, NextResponse } from "next/server"
import { plaidClient, isPlaidConfigured } from "@/lib/plaid"
import {
  getPlaidItemsCollection,
  saveAccount,
  saveBalanceHistory,
  type Account,
  type BalanceHistory,
} from "@/lib/mongodb-schemas"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    if (!isPlaidConfigured()) {
      console.warn("Plaid not configured, returning mock balances")
      return NextResponse.json({
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
        mock: true,
      })
    }

    // Get all Plaid items for this user
    const itemsCollection = await getPlaidItemsCollection()
    const items = await itemsCollection.find({ userId }).toArray()

    if (items.length === 0) {
      return NextResponse.json({ accounts: [], message: "No connected accounts" })
    }

    const allAccounts: any[] = []

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
        }

        // Update last synced time
        await itemsCollection.updateOne({ itemId: item.itemId }, { $set: { lastSynced: new Date() } })
      } catch (error: any) {
        console.error(`Error fetching balances for item ${item.itemId}:`, error.message)
        continue
      }
    }

    return NextResponse.json({ accounts: allAccounts })
  } catch (error: any) {
    console.error("Error in /api/plaid/balances:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch balances" }, { status: 500 })
  }
}
