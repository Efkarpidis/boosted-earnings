import clientPromise from "../lib/mongodb"

async function createArgyleIndexes() {
  try {
    const client = await clientPromise
    const db = client.db("boosted_earnings")

    console.log("Creating Argyle indexes...")

    // argyle_items indexes
    try {
      await db.collection("argyle_items").createIndex({ userId: 1, itemId: 1 }, { unique: true })
      console.log("✓ Created unique index on argyle_items { userId, itemId }")
    } catch (error: any) {
      if (error.code === 85 || error.codeName === "IndexOptionsConflict") {
        console.log("  → Index already exists on argyle_items { userId, itemId }")
      } else {
        throw error
      }
    }

    // driver_trips indexes
    try {
      await db.collection("driver_trips").createIndex({ tripId: 1 }, { unique: true })
      console.log("✓ Created unique index on driver_trips { tripId }")
    } catch (error: any) {
      if (error.code === 85 || error.codeName === "IndexOptionsConflict") {
        console.log("  → Index already exists on driver_trips { tripId }")
      } else {
        throw error
      }
    }

    try {
      await db.collection("driver_trips").createIndex({ userId: 1, platform: 1, startTime: -1 })
      console.log("✓ Created index on driver_trips { userId, platform, startTime }")
    } catch (error: any) {
      if (error.code === 85 || error.codeName === "IndexOptionsConflict") {
        console.log("  → Index already exists on driver_trips { userId, platform, startTime }")
      } else {
        throw error
      }
    }

    // driver_earnings indexes
    try {
      await db.collection("driver_earnings").createIndex({ earningId: 1 }, { unique: true })
      console.log("✓ Created unique index on driver_earnings { earningId }")
    } catch (error: any) {
      if (error.code === 85 || error.codeName === "IndexOptionsConflict") {
        console.log("  → Index already exists on driver_earnings { earningId }")
      } else {
        throw error
      }
    }

    try {
      await db.collection("driver_earnings").createIndex({ userId: 1, platform: 1, startDate: -1 })
      console.log("✓ Created index on driver_earnings { userId, platform, startDate }")
    } catch (error: any) {
      if (error.code === 85 || error.codeName === "IndexOptionsConflict") {
        console.log("  → Index already exists on driver_earnings { userId, platform, startDate }")
      } else {
        throw error
      }
    }

    // driver_balances indexes
    try {
      await db.collection("driver_balances").createIndex({ userId: 1, platform: 1 })
      console.log("✓ Created index on driver_balances { userId, platform }")
    } catch (error: any) {
      if (error.code === 85 || error.codeName === "IndexOptionsConflict") {
        console.log("  → Index already exists on driver_balances { userId, platform }")
      } else {
        throw error
      }
    }

    // driver_connections indexes
    try {
      await db.collection("driver_connections").createIndex({ userId: 1, platform: 1 }, { unique: true })
      console.log("✓ Created unique index on driver_connections { userId, platform }")
    } catch (error: any) {
      if (error.code === 85 || error.codeName === "IndexOptionsConflict") {
        console.log("  → Index already exists on driver_connections { userId, platform }")
      } else {
        throw error
      }
    }

    try {
      await db.collection("driver_connections").createIndex({ status: 1 })
      console.log("✓ Created index on driver_connections { status }")
    } catch (error: any) {
      if (error.code === 85 || error.codeName === "IndexOptionsConflict") {
        console.log("  → Index already exists on driver_connections { status }")
      } else {
        throw error
      }
    }

    console.log("\n✅ All Argyle indexes created successfully!")
    process.exit(0)
  } catch (error) {
    console.error("❌ Error creating indexes:", error)
    process.exit(1)
  }
}

createArgyleIndexes()

export async function ensureIndexes() {
  try {
    await createArgyleIndexes()
  } catch (error) {
    console.error("[Indexes] Failed to ensure indexes:", error)
  }
}
