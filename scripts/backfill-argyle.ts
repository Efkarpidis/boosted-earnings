#!/usr/bin/env tsx

import { getDriverConnectionsCollection } from "../lib/mongodb-schemas"

async function backfill() {
  const args = process.argv.slice(2)
  const userId = args.find((arg) => arg.startsWith("--user="))?.split("=")[1]
  const platform = args.find((arg) => arg.startsWith("--platform="))?.split("=")[1]
  const days = Number.parseInt(args.find((arg) => arg.startsWith("--days="))?.split("=")[1] || "365")

  if (!userId) {
    console.error("Usage: tsx scripts/backfill-argyle.ts --user=<userId> [--platform=<platform>] [--days=365]")
    process.exit(1)
  }

  console.log(`[Backfill] Starting backfill for user=${userId}, platform=${platform || "all"}, days=${days}`)

  const connectionsCollection = await getDriverConnectionsCollection()
  const query: any = { userId, status: "connected" }
  if (platform) query.platform = platform

  const connections = await connectionsCollection.find(query).toArray()

  if (connections.length === 0) {
    console.error(`[Backfill] No connected accounts found for user ${userId}`)
    process.exit(1)
  }

  console.log(`[Backfill] Found ${connections.length} connection(s)`)

  for (const connection of connections) {
    console.log(`[Backfill] Processing ${connection.platform}...`)

    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/argyle/sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: connection.userId,
        platform: connection.platform,
        backfill: true,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      console.log(
        `[Backfill] ✓ ${connection.platform}: trips=${data.tripsUpserted}, earnings=${data.earningsUpserted}, pages=${data.pagesFetched}`,
      )
    } else {
      console.error(`[Backfill] ✗ ${connection.platform}: ${data.error}`)
    }
  }

  console.log("[Backfill] Complete")
  process.exit(0)
}

backfill().catch((error) => {
  console.error("[Backfill] Fatal error:", error)
  process.exit(1)
})
