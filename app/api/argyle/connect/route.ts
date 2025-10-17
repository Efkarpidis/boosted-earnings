import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { platform, userId } = await request.json()

    const argyleApiKey = process.env.ARGYLE_API_KEY
    const argyleApiSecret = process.env.ARGYLE_API_SECRET

    if (!argyleApiKey || !argyleApiSecret) {
      console.warn("Argyle API credentials not configured, using mock data")
      return NextResponse.json({
        success: true,
        accountId: `mock_argyle_${platform}_${Date.now()}`,
        platform,
        message: "Mock connection (configure ARGYLE_API_KEY to use real API)",
      })
    }

    // Create Argyle user account and link token
    const response = await fetch("https://api.argyle.com/v1/link-tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${argyleApiKey}:${argyleApiSecret}`).toString("base64")}`,
      },
      body: JSON.stringify({
        user_id: userId,
        link_items: [platform.toLowerCase()],
      }),
    })

    if (!response.ok) {
      throw new Error(`Argyle API error: ${response.statusText}`)
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      linkToken: data.link_token,
      accountId: data.account_id,
      platform,
      message: "Successfully created Argyle link token",
    })
  } catch (error) {
    console.error("Error connecting to Argyle:", error)
    return NextResponse.json({ success: false, error: "Failed to connect to platform" }, { status: 500 })
  }
}
