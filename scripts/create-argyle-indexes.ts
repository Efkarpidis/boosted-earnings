import clientPromise from "../lib/mongodb"

async function createArgyleIndexes() {
  try {
    const client = await clientPromise
    const db = client.db("boosted_earnings")

    console.log("Creating Argyle indexes...")

    // argyle_items indexes
    await db.collection("argyle_items").createIndex({ userId: 1, itemId: 1 }, { unique: true })
    console.log("✓ Created unique index on argyle_items { userId, itemId }")

    // driver_trips indexes
    await db.collection("driver_trips").createIndex({ tripId: 1 }, { unique: true })
    await db.collection("driver_trips").createIndex({ userId: 1, platform: 1, startTime: -1 })
    console.log("✓ Created indexes on driver_trips")

    // driver_earnings indexes
    await db.collection("driver_earnings").createIndex({ earningId: 1 }, { unique: true })
    await db.collection("driver_earnings").createIndex({ userId: 1, platform: 1, startDate: -1 })
    console.log("✓ Created indexes on driver_earnings")

    // driver_balances indexes
    await db.collection("driver_balances").createIndex({ userId: 1, platform: 1 })
    console.log("✓ Created index on driver_balances")

    console.log("\n✅ All Argyle indexes created successfully!")
  } catch (error) {
    console.error("❌ Error creating indexes:", error)
    process.exit(1)
  }
}

createArgyleIndexes()
