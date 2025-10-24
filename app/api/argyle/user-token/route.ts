import { type NextRequest, NextResponse } from "next/server"
import { createUserToken } from "@/lib/argyle"
import { env } from "@/lib/env"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 })
    }

    const result = await createUserToken(userId)

    if (result.mock) {
      console.log(`[User Token] Generated mock token for user ${userId}`)
    } else {
      console.log(`[User Token] Generated real token for user ${userId}`)
    }

    return NextResponse.json({
      userToken: result.user_token,
      mock: result.mock || false,
      isMockMode: env.isMockMode,
    })
  } catch (error: any) {
    console.error("[User Token] Error:", error)
    return NextResponse.json(
      {
        error: error.message || "Failed to create user token",
        userToken: `mock-user-token-error-${Date.now()}`,
        mock: true,
      },
      { status: 500 },
    )
  }
}
