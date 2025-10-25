import { type NextRequest, NextResponse } from "next/server"
import { getEarnings, getActivities, getBalances } from "@/lib/argyle"
import {
  getDriverConnectionsCollection,
  saveDriverEarning,
  saveDriverTrip,
  saveDriverBalance,
  saveDriverConnection,
} from "@/lib/mongodb-schemas"
import { generateRequestId, logRequest, logResponse, logError } from "@/lib/request-logger"
import { revalidateTag } from "next/cache"

export async function POST(request: NextRequest) {
  const requestId = generateRequestId()

  try {
    const body = await request.json()
    logRequest(requestId, "POST", "/api/argyle/sync", body)

    const { userId, platform, backfill } = body

    if (!userId) {
      const error = { error: "Missing required field: userId" }
      logResponse(requestId, 400, error)
      return NextResponse.json(error, { status: 400 })
    }

    const dbTimeout = 5000
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database operation timeout")), dbTimeout),
    )

    const syncPromise = (async () => {
      const connectionsCollection = await getDriverConnectionsCollection()
      const query: any = { userId, status: "connected" }
      if (platform) query.platform = platform

      const connections = await connectionsCollection.find(query).toArray()

      if (connections.length === 0) {
        return { error: "No connected accounts found for this user", status: 404 }
      }

      let totalTripsUpserted = 0
      let totalEarningsUpserted = 0
      let totalBalancesUpserted = 0
      let totalPagesFetched = 0

      for (const connection of connections) {
        try {
          const sinceDate = backfill
            ? new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
            : connection.lastSyncAt
              ? new Date(connection.lastSyncAt).toISOString().split("T")[0]
              : undefined

          console.log(
            `[${requestId}] Syncing ${connection.platform} for user ${userId}, since=${sinceDate || "all time"}`,
          )

          const [earningsResult, activitiesResult, balancesResult] = await Promise.all([
            getEarnings({ accessToken: connection.accessToken, userId: connection.userId, since: sinceDate }),
            getActivities({ accessToken: connection.accessToken, userId: connection.userId, since: sinceDate }),
            getBalances({ accessToken: connection.accessToken, userId: connection.userId }),
          ])

          totalPagesFetched += (earningsResult.pagesFetched || 0) + (activitiesResult.pagesFetched || 0)

          if (earningsResult.data?.results) {
            for (const earning of earningsResult.data.results) {
              await saveDriverEarning({
                userId: connection.userId,
                platform: connection.platform,
                earningId: earning.id,
                totalAmount: earning.total || 0,
                tips: earning.tips || 0,
                bonuses: earning.bonuses || 0,
                startDate: earning.start_date,
                endDate: earning.end_date,
                payoutStatus: earning.payout_status || "pending",
                updatedAt: new Date(),
              })
              totalEarningsUpserted++
            }
          }

          if (activitiesResult.data?.results) {
            for (const activity of activitiesResult.data.results) {
              await saveDriverTrip({
                userId: connection.userId,
                platform: connection.platform,
                tripId: activity.id,
                startTime: new Date(activity.start_time),
                endTime: new Date(activity.end_time),
                distanceMiles: activity.distance || 0,
                durationMin: activity.duration || 0,
                status: activity.status || "completed",
                earningsTip: activity.earnings?.tip || 0,
                earningsBase: activity.earnings?.base || 0,
                city: activity.location?.city,
                createdAt: new Date(),
              })
              totalTripsUpserted++
            }
          }

          if (balancesResult.data?.results) {
            for (const balance of balancesResult.data.results) {
              await saveDriverBalance({
                userId: connection.userId,
                platform: connection.platform,
                balanceAmount: balance.balance || 0,
                lastSyncedAt: new Date(),
              })
              totalBalancesUpserted++
            }
          }

          await saveDriverConnection({
            ...connection,
            lastSyncAt: new Date(),
            errorCount: 0,
            lastError: undefined,
          })

          console.log(
            `[${requestId}] Completed ${connection.platform}: trips=${totalTripsUpserted}, earnings=${totalEarningsUpserted}, pages=${totalPagesFetched}`,
          )
        } catch (error: any) {
          console.error(`[${requestId}] Error syncing ${connection.platform}:`, error)

          await saveDriverConnection({
            ...connection,
            lastError: error.message,
            errorCount: (connection.errorCount || 0) + 1,
            status: connection.errorCount >= 3 ? "error" : "connected",
          })
        }
      }

      return {
        tripsUpserted: totalTripsUpserted,
        earningsUpserted: totalEarningsUpserted,
        balancesUpserted: totalBalancesUpserted,
        pagesFetched: totalPagesFetched,
        connectionsSynced: connections.length,
        mock: connections[0]?.accessToken?.startsWith("mock-") || false,
      }
    })()

    const result = await Promise.race([syncPromise, timeoutPromise])

    if ((result as any).error) {
      logResponse(requestId, (result as any).status || 500, result)
      return NextResponse.json(result, { status: (result as any).status || 500 })
    }

    revalidateTag("dashboard-stats")
    revalidateTag("argyle-connections")

    logResponse(requestId, 200, result)
    return NextResponse.json(result)
  } catch (error: any) {
    logError(requestId, error)

    if (error.message?.includes("timeout")) {
      return NextResponse.json(
        {
          error: "Database operation timed out. Please try again.",
          details: error.message,
          requestId,
        },
        { status: 504 },
      )
    }

    return NextResponse.json({ error: error.message || "Sync failed", requestId }, { status: 500 })
  }
}
