import { NextResponse } from "next/server"
import { plaidClient, isPlaidConfigured } from "@/lib/plaid"
import { getAssetReportsCollection } from "@/lib/mongodb-schemas"

export async function POST(request: Request) {
  try {
    const { accessToken, userId, platform, daysRequested = 730 } = await request.json()

    if (!accessToken || !userId) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    if (!isPlaidConfigured() || accessToken.startsWith("mock-")) {
      console.warn("Using mock asset report data")
      return NextResponse.json({
        asset_report_token: `mock-asset-token-${Date.now()}`,
        asset_report_id: `mock-asset-id-${Date.now()}`,
        mock: true,
      })
    }

    // Create asset report
    const response = await plaidClient.assetReportCreate({
      access_tokens: [accessToken],
      days_requested: daysRequested,
      options: {
        client_report_id: `${userId}-${platform}-${Date.now()}`,
        webhook: process.env.PLAID_WEBHOOK_URL,
      },
    })

    try {
      const collection = await getAssetReportsCollection()
      await collection.insertOne({
        userId,
        platform: platform || "Unknown",
        assetReportId: response.data.asset_report_id,
        assetReportToken: response.data.asset_report_token,
        reportData: null, // Will be updated when report is ready
        createdAt: new Date(),
      })
    } catch (dbError) {
      console.error("Error storing asset report in MongoDB:", dbError)
    }

    return NextResponse.json({
      asset_report_token: response.data.asset_report_token,
      asset_report_id: response.data.asset_report_id,
      request_id: response.data.request_id,
    })
  } catch (error: any) {
    console.error("Error creating asset report:", error)
    return NextResponse.json(
      {
        error: "Failed to create asset report",
        details: error.response?.data || error.message,
      },
      { status: 500 },
    )
  }
}

// GET endpoint to retrieve asset report
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const assetReportToken = searchParams.get("assetReportToken")

    if (!assetReportToken) {
      return NextResponse.json({ error: "Missing asset report token" }, { status: 400 })
    }

    if (!isPlaidConfigured() || assetReportToken.startsWith("mock-")) {
      console.warn("Using mock asset report data")
      return NextResponse.json({
        report: {
          items: [
            {
              accounts: [
                {
                  balances: { available: 2847.5, current: 2847.5 },
                  transactions: [],
                },
              ],
            },
          ],
        },
        mock: true,
      })
    }

    // Get asset report
    const response = await plaidClient.assetReportGet({
      asset_report_token: assetReportToken,
    })

    return NextResponse.json({
      report: response.data.report,
      warnings: response.data.warnings,
    })
  } catch (error: any) {
    console.error("Error fetching asset report:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch asset report",
        details: error.response?.data || error.message,
      },
      { status: 500 },
    )
  }
}
