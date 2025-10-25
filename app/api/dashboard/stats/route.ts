import { type NextRequest, NextResponse } from "next/server"
import { getDriverTripsCollection, getDriverEarningsCollection } from "@/lib/mongodb-schemas"
import { generateRequestId, logRequest, logResponse, logError } from "@/lib/request-logger"

export const revalidate = 0 // Disable caching for real-time updates

export async function GET(request: NextRequest) {
  const requestId = generateRequestId()

  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    logRequest(requestId, "GET", "/api/dashboard/stats", { userId })

    if (!userId) {
      const error = { error: "Missing userId parameter" }
      logResponse(requestId, 400, error)
      return NextResponse.json(error, { status: 400 })
    }

    const tripsCollection = await getDriverTripsCollection()
    const earningsCollection = await getDriverEarningsCollection()

    // Get trips from last 7 days
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const trips = await tripsCollection
      .find({
        userId,
        startTime: { $gte: sevenDaysAgo },
      })
      .toArray()

    const earnings = await earningsCollection
      .find({
        userId,
        startDate: { $gte: sevenDaysAgo.toISOString().split("T")[0] },
      })
      .toArray()

    // Calculate stats
    const totalEarnings = earnings.reduce((sum, e) => sum + e.totalAmount, 0)
    const totalTrips = trips.length
    const totalHours = trips.reduce((sum, t) => sum + t.durationMin / 60, 0)
    const avgHourly = totalHours > 0 ? totalEarnings / totalHours : 0

    const response = {
      stats: {
        totalEarnings,
        trips: totalTrips,
        hoursWorked: Number.parseFloat(totalHours.toFixed(1)),
        avgHourly: Number.parseFloat(avgHourly.toFixed(2)),
        earningsChange: 12.5, // TODO: Calculate actual change
        hoursChange: -5.2, // TODO: Calculate actual change
        avgHourlyChange: 18.7, // TODO: Calculate actual change
        tripsChange: 8.3, // TODO: Calculate actual change
      },
    }

    logResponse(requestId, 200, response)

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "no-store, must-revalidate",
        "CDN-Cache-Control": "no-store",
      },
    })
  } catch (error: any) {
    logError(requestId, error)
    return NextResponse.json({ error: error.message || "Failed to fetch stats", requestId }, { status: 500 })
  }
}
