import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

// GET user profile
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("boosted_earnings")
    const user = await db.collection("users").findOne({ userId })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST create/update user profile
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, email, name, platforms } = body

    if (!userId || !email) {
      return NextResponse.json({ error: "User ID and email required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("boosted_earnings")

    const result = await db.collection("users").updateOne(
      { userId },
      {
        $set: {
          email,
          name,
          platforms,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true },
    )

    return NextResponse.json({ success: true, result })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
