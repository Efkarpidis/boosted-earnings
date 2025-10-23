import { type NextRequest, NextResponse } from "next/server"
import { getDriverConnectionsCollection } from "@/lib/mongodb-schemas"
import { env } from "@/lib/env"

// Simple concurrency limiter
async function processBatch<T>(items: T[], batchSize: number, processor: (item: T) => Promise<void>) {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)
    await Promise.all(batch.map(processor))
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret (optional security)
    const authHeader = request.headers.get("authorization")
    const cronSecret = process.env.CRON_SECRET
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[Argyle Daily Cron] Starting daily sync")

    const connectionsCollection = await getDriverConnectionsCollection()
    const connections = await connectionsCollection.find({ status: "connected" }).toArray()

    console.log(`[Argyle Daily Cron] Found ${connections.length} connected accounts`)

    let successCount = 0
    let errorCount = 0

    // Process in batches of 3 to avoid rate limits
    await processBatch(connections, 3, async (connection) => {
      try {
        const response = await fetch(`${env.appUrl}/api/argyle/sync`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: connection.userId,
            platform: connection.platform,
            backfill: false, // Incremental sync only
          }),
        })

        if (response.ok) {
          successCount++
          console.log(`[Argyle Daily Cron] Synced ${connection.platform} for user ${connection.userId}`)
        } else {
          errorCount++
          console.error(`[Argyle Daily Cron] Failed to sync ${connection.platform} for user ${connection.userId}`)
        }
      } catch (error: any) {
        errorCount++
        console.error(`[Argyle Daily Cron] Error syncing ${connection.platform}:`, error.message)
      }
    })

    console.log(`[Argyle Daily Cron] Completed: success=${successCount}, errors=${errorCount}`)

    return NextResponse.json({
      success: true,
      totalConnections: connections.length,
      successCount,
      errorCount,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("[Argyle Daily Cron] Error:", error)
    return NextResponse.json({ error: error.message || "Cron job failed" }, { status: 500 })
  }
}
