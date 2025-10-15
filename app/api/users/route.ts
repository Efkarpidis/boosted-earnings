import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    const { userId, email, userData } = await request.json()

    const client = await clientPromise
    const db = client.db("boosted_earnings")

    const result = await db.collection("users").insertOne({
      userId,
      email,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json({ success: true, userId: result.insertedId })
  } catch (error) {
    console.error("[v0] User creation error:", error)
    return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    const client = await clientPromise
    const db = client.db("boosted_earnings")

    const user = await db.collection("users").findOne({ userId })

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: user })
  } catch (error) {
    console.error("[v0] User fetch error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch user" }, { status: 500 })
  }
}
