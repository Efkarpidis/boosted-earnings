import { type NextRequest, NextResponse } from "next/server"
import { createLinkToken } from "@/lib/argyle"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "Missing required field: userId" }, { status: 400 })
    }

    const result = await createLinkToken(userId)

    return NextResponse.json({
      linkToken: result.link_token,
      mock: result.mock || false,
    })
  } catch (error: any) {
    console.error("[Argyle Link Token] Error:", error)
    return NextResponse.json({ error: error.message || "Failed to create link token" }, { status: 500 })
  }
}
