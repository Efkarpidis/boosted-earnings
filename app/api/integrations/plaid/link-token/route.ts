import { NextResponse } from "next/server"
import { plaid } from "@/lib/plaid"

export async function POST(request: Request) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const linkToken = await plaid.createLinkToken(userId)

    return NextResponse.json(linkToken)
  } catch (error: any) {
    console.error("[v0] Plaid link token error:", error)
    return NextResponse.json({ error: error.message || "Failed to create link token" }, { status: 500 })
  }
}
