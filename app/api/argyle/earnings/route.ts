import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const accountId = searchParams.get("accountId")
    const timeRange = searchParams.get("timeRange") || "week"

    const argyleApiKey = process.env.ARGYLE_API_KEY
    const argyleApiSecret = process.env.ARGYLE_API_SECRET

    if (!argyleApiKey || !argyleApiSecret || !accountId || accountId.startsWith("mock_")) {
      console.warn("Using mock earnings data")
      return NextResponse.json(getMockEarnings(timeRange))
    }

    // Fetch earnings from Argyle API
    const response = await fetch(`https://api.argyle.com/v1/accounts/${accountId}/earnings`, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${argyleApiKey}:${argyleApiSecret}`).toString("base64")}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Argyle API error: ${response.statusText}`)
    }

    const data = await response.json()

    // Transform Argyle data to our format
    const earnings = {
      totalEarnings: data.results.reduce((sum: number, item: any) => sum + Number.parseFloat(item.gross_pay || 0), 0),
      hoursWorked: data.results.reduce((sum: number, item: any) => sum + Number.parseFloat(item.hours || 0), 0),
      avgHourly: 0,
      trips: data.results.length,
      breakdown: transformBreakdown(data.results),
      dailyData: transformDailyData(data.results),
    }

    earnings.avgHourly = earnings.hoursWorked > 0 ? earnings.totalEarnings / earnings.hoursWorked : 0

    return NextResponse.json(earnings)
  } catch (error) {
    console.error("Error fetching earnings:", error)
    return NextResponse.json({ error: "Failed to fetch earnings" }, { status: 500 })
  }
}

function getMockEarnings(timeRange: string) {
  return {
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
      { date: "2024-01-15", earnings: 420, hours: 8, name: "Mon" },
      { date: "2024-01-16", earnings: 380, hours: 7, name: "Tue" },
      { date: "2024-01-17", earnings: 510, hours: 9, name: "Wed" },
      { date: "2024-01-18", earnings: 390, hours: 7.5, name: "Thu" },
      { date: "2024-01-19", earnings: 580, hours: 10, name: "Fri" },
      { date: "2024-01-20", earnings: 720, hours: 12, name: "Sat" },
      { date: "2024-01-21", earnings: 650, hours: 11, name: "Sun" },
    ],
  }
}

function transformBreakdown(results: any[]) {
  const platformMap = new Map()
  results.forEach((item: any) => {
    const platform = item.employer || "Unknown"
    if (!platformMap.has(platform)) {
      platformMap.set(platform, { platform, earnings: 0, trips: 0 })
    }
    const current = platformMap.get(platform)
    current.earnings += Number.parseFloat(item.gross_pay || 0)
    current.trips += 1
  })
  return Array.from(platformMap.values())
}

function transformDailyData(results: any[]) {
  const dailyMap = new Map()
  results.forEach((item: any) => {
    const date = item.pay_date || new Date().toISOString().split("T")[0]
    if (!dailyMap.has(date)) {
      dailyMap.set(date, { date, earnings: 0, hours: 0 })
    }
    const current = dailyMap.get(date)
    current.earnings += Number.parseFloat(item.gross_pay || 0)
    current.hours += Number.parseFloat(item.hours || 0)
  })
  return Array.from(dailyMap.values()).sort((a, b) => a.date.localeCompare(b.date))
}
