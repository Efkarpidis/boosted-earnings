import { type NextRequest, NextResponse } from "next/server"
import { plaidClient, isPlaidConfigured } from "@/lib/plaid"
import { getPlaidItemsCollection, saveTransaction, type Transaction, savePlaidItem } from "@/lib/mongodb-schemas"
import { classifyTransaction } from "@/lib/transaction-classifier"

export async function POST(request: NextRequest) {
  try {
    const { userId, itemId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    if (!isPlaidConfigured()) {
      console.warn("Plaid not configured, returning mock transactions")
      return NextResponse.json({
        added: [
          {
            transactionId: "mock-tx-1",
            amount: 450.0,
            date: new Date().toISOString().split("T")[0],
            name: "Uber Trip Payment",
            platform: "Uber",
            isIncome: true,
          },
        ],
        modified: [],
        removed: [],
        hasMore: false,
        mock: true,
      })
    }

    const itemsCollection = await getPlaidItemsCollection()

    // If itemId provided, sync only that item, otherwise sync all
    const query = itemId ? { userId, itemId } : { userId }
    const items = await itemsCollection.find(query).toArray()

    if (items.length === 0) {
      return NextResponse.json({ error: "No connected accounts found" }, { status: 404 })
    }

    let totalAdded = 0
    let totalModified = 0
    let totalRemoved = 0

    for (const item of items) {
      try {
        let cursor = item.cursor
        let hasMore = true

        while (hasMore) {
          const response = await plaidClient.transactionsSync({
            access_token: item.accessToken,
            cursor: cursor,
          })

          const { added, modified, removed, next_cursor, has_more } = response.data

          // Process added transactions
          for (const tx of added) {
            const classification = await classifyTransaction(
              {
                userId,
                accountId: tx.account_id,
                transactionId: tx.transaction_id,
                amount: tx.amount,
                date: tx.date,
                name: tx.name,
                merchantName: tx.merchant_name || undefined,
                category: tx.category || [],
                pending: tx.pending,
                isIncome: tx.amount > 0,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              userId,
            )

            const transaction: Transaction = {
              userId,
              accountId: tx.account_id,
              transactionId: tx.transaction_id,
              amount: tx.amount,
              date: tx.date,
              name: tx.name,
              merchantName: tx.merchant_name || undefined,
              category: tx.category || [],
              pending: tx.pending,
              platform: classification.platform,
              expenseType: classification.expenseType,
              isIncome: classification.isIncome,
              createdAt: new Date(),
              updatedAt: new Date(),
            }

            await saveTransaction(transaction)
            totalAdded++
          }

          // Process modified transactions
          for (const tx of modified) {
            const classification = await classifyTransaction(
              {
                userId,
                accountId: tx.account_id,
                transactionId: tx.transaction_id,
                amount: tx.amount,
                date: tx.date,
                name: tx.name,
                merchantName: tx.merchant_name || undefined,
                category: tx.category || [],
                pending: tx.pending,
                isIncome: tx.amount > 0,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              userId,
            )

            const transaction: Transaction = {
              userId,
              accountId: tx.account_id,
              transactionId: tx.transaction_id,
              amount: tx.amount,
              date: tx.date,
              name: tx.name,
              merchantName: tx.merchant_name || undefined,
              category: tx.category || [],
              pending: tx.pending,
              platform: classification.platform,
              expenseType: classification.expenseType,
              isIncome: classification.isIncome,
              createdAt: new Date(),
              updatedAt: new Date(),
            }

            await saveTransaction(transaction)
            totalModified++
          }

          // Process removed transactions
          for (const removedTx of removed) {
            const { getTransactionsCollection } = await import("@/lib/mongodb-schemas")
            const collection = await getTransactionsCollection()
            await collection.deleteOne({ userId, transactionId: removedTx.transaction_id })
            totalRemoved++
          }

          // Update cursor
          cursor = next_cursor
          hasMore = has_more

          // Save updated cursor
          await savePlaidItem({
            ...item,
            cursor: next_cursor,
            lastSynced: new Date(),
          })
        }
      } catch (error: any) {
        console.error(`Error syncing transactions for item ${item.itemId}:`, error.message)
        continue
      }
    }

    return NextResponse.json({
      added: totalAdded,
      modified: totalModified,
      removed: totalRemoved,
      message: `Synced ${totalAdded} new, ${totalModified} modified, ${totalRemoved} removed transactions`,
    })
  } catch (error: any) {
    console.error("Error in /api/plaid/sync:", error)
    return NextResponse.json({ error: error.message || "Failed to sync transactions" }, { status: 500 })
  }
}
