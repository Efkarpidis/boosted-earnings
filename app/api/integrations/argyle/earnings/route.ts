import { NextResponse } from "next/server"
import { argyle } from "@/lib/argyle"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const accountId = searchParams.get("accountId")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    if (!accountId) {
      return NextResponse.json({ error: "Account ID required" }, { status: 400 })
    }

    const earnings = await argyle.getEarnings(accountId, startDate || undefined, endDate || undefined)

    return NextResponse.json(earnings)
  } catch (error: any) {
    console.error("[v0] Argyle earnings error:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch earnings" }, { status: 500 })
  }
}
