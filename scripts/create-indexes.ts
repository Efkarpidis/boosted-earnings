// MongoDB index creation script for optimal query performance
// Run this script once to create indexes on your collections

import clientPromise from "../lib/mongodb"

async function createIndexes() {
  try {
    const client = await clientPromise
    const db = client.db("boosted_earnings")

    console.log("Creating indexes...")

    // Plaid Items indexes
    await db.collection("plaid_items").createIndex({ userId: 1, itemId: 1 }, { unique: true })
    await db.collection("plaid_items").createIndex({ userId: 1 })

    // Accounts indexes
    await db.collection("accounts").createIndex({ userId: 1, accountId: 1 }, { unique: true })
    await db.collection("accounts").createIndex({ userId: 1 })
    await db.collection("accounts").createIndex({ itemId: 1 })

    // Transactions indexes
    await db.collection("transactions").createIndex({ userId: 1, transactionId: 1 }, { unique: true })
    await db.collection("transactions").createIndex({ userId: 1, date: -1 })
    await db.collection("transactions").createIndex({ userId: 1, platform: 1, date: -1 })
    await db.collection("transactions").createIndex({ userId: 1, expenseType: 1, date: -1 })
    await db.collection("transactions").createIndex({ userId: 1, isIncome: 1, date: -1 })

    // Balance History indexes
    await db.collection("balances_history").createIndex({ userId: 1, accountId: 1, recordedAt: -1 })
    await db.collection("balances_history").createIndex({ userId: 1, recordedAt: -1 })

    // Manual Assets indexes
    await db.collection("manual_assets").createIndex({ userId: 1, assetId: 1 }, { unique: true })
    await db.collection("manual_assets").createIndex({ userId: 1 })

    // Liabilities indexes
    await db.collection("liabilities").createIndex({ userId: 1, liabilityId: 1 }, { unique: true })
    await db.collection("liabilities").createIndex({ userId: 1 })

    // Transaction Overrides indexes
    await db.collection("tx_overrides").createIndex({ userId: 1, transactionId: 1 }, { unique: true })

    console.log("✅ All indexes created successfully!")
  } catch (error) {
    console.error("Error creating indexes:", error)
    throw error
  }
}

createIndexes()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
