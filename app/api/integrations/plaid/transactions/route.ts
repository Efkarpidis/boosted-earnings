import { NextResponse } from "next/server"
import { plaid } from "@/lib/plaid"
import clientPromise from "@/lib/mongodb"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    if (!userId || !startDate || !endDate) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Get access token from database
    const client = await clientPromise
    const db = client.db("boosted_earnings")
    const plaidItem = await db.collection("plaid_items").findOne({ userId })

    if (!plaidItem) {
      return NextResponse.json({ error: "No connected bank account" }, { status: 404 })
    }

    const transactions = await plaid.getTransactions(plaidItem.accessToken, startDate, endDate)

    return NextResponse.json(transactions)
  } catch (error: any) {
    console.error("[v0] Plaid transactions error:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch transactions" }, { status: 500 })
  }
}
