import { type NextRequest, NextResponse } from "next/server"
import { getEarnings, getActivities, getBalances } from "@/lib/argyle"
import { getArgyleItemsCollection, saveDriverEarning, saveDriverTrip, saveDriverBalance } from "@/lib/mongodb-schemas"

export async function POST(request: NextRequest) {
  try {
    const { userId, itemId } = await request.json()

    if (!userId && !itemId) {
      return NextResponse.json({ error: "Missing required field: userId or itemId" }, { status: 400 })
    }

    const itemsCollection = await getArgyleItemsCollection()
    const query = itemId ? { itemId } : userId ? { userId } : {}
    const items = await itemsCollection.find(query).toArray()

    if (items.length === 0) {
      return NextResponse.json({ error: "No Argyle items found for this user" }, { status: 404 })
    }

    let itemsSynced = 0
    let newTrips = 0
    const updatedTrips = 0
    let newEarnings = 0
    const updatedEarnings = 0

    for (const item of items) {
      const [earningsResult, activitiesResult, balancesResult] = await Promise.all([
        getEarnings({ accessToken: item.accessToken, userId: item.userId }),
        getActivities({ accessToken: item.accessToken, userId: item.userId }),
        getBalances({ accessToken: item.accessToken, userId: item.userId }),
      ])

      if (earningsResult.data?.results) {
        for (const earning of earningsResult.data.results) {
          await saveDriverEarning({
            userId: item.userId,
            platform: item.platform,
            earningId: earning.id,
            totalAmount: earning.total || 0,
            tips: earning.tips || 0,
            bonuses: earning.bonuses || 0,
            startDate: earning.start_date,
            endDate: earning.end_date,
            payoutStatus: earning.payout_status || "pending",
            updatedAt: new Date(),
          })
          newEarnings++
        }
      }

      if (activitiesResult.data?.results) {
        for (const activity of activitiesResult.data.results) {
          await saveDriverTrip({
            userId: item.userId,
            platform: item.platform,
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
          newTrips++
        }
      }

      if (balancesResult.data?.results) {
        for (const balance of balancesResult.data.results) {
          await saveDriverBalance({
            userId: item.userId,
            platform: item.platform,
            balanceAmount: balance.balance || 0,
            lastSyncedAt: new Date(),
          })
        }
      }

      itemsSynced++
    }

    return NextResponse.json({
      itemsSynced,
      newTrips,
      updatedTrips,
      newEarnings,
      updatedEarnings,
      mock: items[0]?.accessToken?.startsWith("mock-") || false,
    })
  } catch (error: any) {
    console.error("[Argyle Sync] Error:", error)
    return NextResponse.json({ error: error.message || "Sync failed" }, { status: 500 })
  }
}
