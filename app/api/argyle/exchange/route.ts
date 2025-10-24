import { type NextRequest, NextResponse } from "next/server"
import { exchangeCode } from "@/lib/argyle"
import { saveArgyleItem, saveDriverConnection } from "@/lib/mongodb-schemas"

export async function POST(request: NextRequest) {
  try {
    const { code, userId, platform } = await request.json()

    if (!code || !userId || !platform) {
      return NextResponse.json({ error: "Missing required fields: code, userId, platform" }, { status: 400 })
    }

    const result = await exchangeCode(code)

    await saveArgyleItem({
      userId,
      itemId: result.item_id,
      accessToken: result.access_token,
      platform,
      createdAt: new Date(),
    })

    await saveDriverConnection({
      userId,
      platform,
      providerUserId: result.user_id || userId,
      itemId: result.item_id,
      accessToken: result.access_token,
      connectedAt: new Date(),
      status: "connected",
      errorCount: 0,
    })

    console.log(`[Argyle Exchange] Connected ${platform} for user ${userId}`)

    return NextResponse.json({
      itemId: result.item_id,
      platform,
      mock: result.mock || false,
    })
  } catch (error: any) {
    console.error("[Argyle Exchange] Error:", error)
    return NextResponse.json({ error: error.message || "Failed to exchange code" }, { status: 500 })
  }
}
