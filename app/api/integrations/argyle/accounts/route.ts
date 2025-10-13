import { NextResponse } from "next/server"
import { argyle } from "@/lib/argyle"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const accounts = await argyle.getAccounts(userId)

    return NextResponse.json(accounts)
  } catch (error: any) {
    console.error("[v0] Argyle accounts error:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch accounts" }, { status: 500 })
  }
}
