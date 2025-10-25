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

    const connectionsCollection = await getDriverConnectionsCollection()
    const query: any = { userId, status: "connected" }
    if (platform) query.platform = platform

    const connections = await connectionsCollection.find(query).toArray()

    if (connections.length === 0) {
      const error = { error: "No connected accounts found for this user" }
      logResponse(requestId, 404, error)
      return NextResponse.json(error, { status: 404 })
    }

    let totalTripsUpserted = 0
    let totalEarningsUpserted = 0
    let totalBalancesUpserted = 0
    let totalPagesFetched = 0

    for (const connection of connections) {
      try {
        // Determine since date for incremental sync
        const sinceDate = backfill
          ? new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
          : connection.lastSyncAt
            ? new Date(connection.lastSyncAt).toISOString().split("T")[0]
            : undefined

        console.log(
          `[${requestId}] Syncing ${connection.platform} for user ${userId}, since=${sinceDate || "all time"}`,
        )

        // Fetch data with pagination
        const [earningsResult, activitiesResult, balancesResult] = await Promise.all([
          getEarnings({ accessToken: connection.accessToken, userId: connection.userId, since: sinceDate }),
          getActivities({ accessToken: connection.accessToken, userId: connection.userId, since: sinceDate }),
          getBalances({ accessToken: connection.accessToken, userId: connection.userId }),
        ])

        totalPagesFetched += (earningsResult.pagesFetched || 0) + (activitiesResult.pagesFetched || 0)

        // Upsert earnings
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

        // Upsert activities/trips
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

        // Upsert balances
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

        // Update connection with last sync time and clear errors
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

        // Update connection with error
        await saveDriverConnection({
          ...connection,
          lastError: error.message,
          errorCount: (connection.errorCount || 0) + 1,
          status: connection.errorCount >= 3 ? "error" : "connected",
        })
      }
    }

    revalidateTag("dashboard-stats")
    revalidateTag("argyle-connections")

    const response = {
      tripsUpserted: totalTripsUpserted,
      earningsUpserted: totalEarningsUpserted,
      balancesUpserted: totalBalancesUpserted,
      pagesFetched: totalPagesFetched,
      connectionsSynced: connections.length,
      mock: connections[0]?.accessToken?.startsWith("mock-") || false,
    }

    logResponse(requestId, 200, response)
    return NextResponse.json(response)
  } catch (error: any) {
    logError(requestId, error)
    return NextResponse.json({ error: error.message || "Sync failed", requestId }, { status: 500 })
  }
}
