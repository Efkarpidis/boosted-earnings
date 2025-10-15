import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const accountId = searchParams.get("accountId")
    const timeRange = searchParams.get("timeRange") || "week"

    // In production, this would fetch from Argyle API
    console.log("Fetching earnings for account:", accountId, "timeRange:", timeRange)

    // Mock earnings data
    const mockEarnings = {
      totalEarnings: 2847.5,
      hoursWorked: 42.5,
      avgHourly: 67.0,
      trips: 156,
      breakdown: [
        { platform: "Uber", earnings: 1200, trips: 68 },
        { platform: "Lyft", earnings: 850, trips: 45 },
        { platform: "DoorDash", earnings: 550, trips: 32 },
        { platform: "Uber Eats", earnings: 247.5, trips: 11 },
      ],
      dailyData: [
        { date: "2024-01-15", earnings: 420, hours: 8 },
        { date: "2024-01-16", earnings: 380, hours: 7 },
        { date: "2024-01-17", earnings: 510, hours: 9 },
        { date: "2024-01-18", earnings: 390, hours: 7.5 },
        { date: "2024-01-19", earnings: 580, hours: 10 },
        { date: "2024-01-20", earnings: 720, hours: 12 },
        { date: "2024-01-21", earnings: 650, hours: 11 },
      ],
    }

    return NextResponse.json(mockEarnings)
  } catch (error) {
    console.error("Error fetching earnings:", error)
    return NextResponse.json({ error: "Failed to fetch earnings" }, { status: 500 })
  }
}
