import { NextResponse } from "next/server"
import { plaid } from "@/lib/plaid"
import clientPromise from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    const { publicToken, userId } = await request.json()

    if (!publicToken || !userId) {
      return NextResponse.json({ error: "Public token and user ID required" }, { status: 400 })
    }

    const { access_token, item_id } = await plaid.exchangePublicToken(publicToken)

    // Store access token in database
    const client = await clientPromise
    const db = client.db("boosted_earnings")

    await db.collection("plaid_items").insertOne({
      userId,
      accessToken: access_token,
      itemId: item_id,
      createdAt: new Date(),
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[v0] Plaid token exchange error:", error)
    return NextResponse.json({ error: error.message || "Failed to exchange token" }, { status: 500 })
  }
}
