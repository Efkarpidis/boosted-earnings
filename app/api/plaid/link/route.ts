import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { userId } = await request.json()

    // In production, this would integrate with Plaid API
    console.log("Creating Plaid link token for user:", userId)

    // Mock Plaid link token
    const mockResponse = {
      linkToken: `link-sandbox-${Date.now()}`,
      expiration: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    }

    return NextResponse.json(mockResponse)
  } catch (error) {
    console.error("Error creating Plaid link token:", error)
    return NextResponse.json({ error: "Failed to create link token" }, { status: 500 })
  }
}
