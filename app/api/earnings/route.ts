import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

// GET earnings data
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("boosted_earnings")

    const query: any = { userId }
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      }
    }

    const earnings = await db.collection("earnings").find(query).sort({ date: -1 }).toArray()

    return NextResponse.json(earnings)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST add earnings entry
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, platform, amount, trips, hours, date } = body

    if (!userId || !platform || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("boosted_earnings")

    const result = await db.collection("earnings").insertOne({
      userId,
      platform,
      amount,
      trips,
      hours,
      date: new Date(date),
      createdAt: new Date(),
    })

    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
