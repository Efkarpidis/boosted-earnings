import { type NextRequest, NextResponse } from "next/server"
import { getDriverTripsCollection, getDriverEarningsCollection } from "@/lib/mongodb-schemas"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 })
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

    return NextResponse.json({
      stats: {
        totalEarnings,
        trips: totalTrips,
        hoursWorked: totalHours,
        avgHourly,
        earningsChange: 12.5, // TODO: Calculate actual change
        hoursChange: -5.2, // TODO: Calculate actual change
        avgHourlyChange: 18.7, // TODO: Calculate actual change
        tripsChange: 8.3, // TODO: Calculate actual change
      },
    })
  } catch (error: any) {
    console.error("[Dashboard Stats] Error:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch stats" }, { status: 500 })
  }
}
