import { NextResponse } from "next/server"
import { plaidClient, isPlaidConfigured } from "@/lib/plaid"
import { getConsumerReportsCollection } from "@/lib/mongodb-schemas"

export async function POST(request: Request) {
  try {
    const { accessToken, userId, platform } = await request.json()

    if (!accessToken || !userId) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    if (!isPlaidConfigured() || accessToken.startsWith("mock-")) {
      console.warn("Using mock consumer report data")
      return NextResponse.json({
        report_token: `mock-consumer-token-${Date.now()}`,
        mock: true,
      })
    }

    // Create consumer report (Base Report)
    // Note: This requires special Plaid approval and may not be available in sandbox
    const response = await plaidClient.creditSessionsGet({
      user_token: accessToken,
    })

    try {
      const collection = await getConsumerReportsCollection()
      await collection.insertOne({
        userId,
        platform: platform || "Unknown",
        reportToken: response.data.id,
        reportData: response.data,
        createdAt: new Date(),
      })
    } catch (dbError) {
      console.error("Error storing consumer report in MongoDB:", dbError)
    }

    return NextResponse.json({
      report_token: response.data.id,
      request_id: response.data.request_id,
    })
  } catch (error: any) {
    console.error("Error creating consumer report:", error)
    // Consumer Report may not be available in sandbox, return mock data
    return NextResponse.json({
      report_token: `mock-consumer-token-${Date.now()}`,
      mock: true,
      note: "Consumer Report requires special Plaid approval",
    })
  }
}
