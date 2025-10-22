import { NextResponse } from "next/server"
import { plaidClient, isPlaidConfigured } from "@/lib/plaid"
import { saveAssetReport } from "@/lib/mongodb-schemas"

export async function POST(request: Request) {
  try {
    const { accessToken, userId, platform } = await request.json()

    if (!isPlaidConfigured() || accessToken?.startsWith("mock-")) {
      console.warn("Using mock asset data")
      return NextResponse.json({
        assets: {
          totalAssets: 15000,
          accounts: [{ name: "Checking", balance: 2847.5 }],
        },
        mock: true,
      })
    }

    // Create asset report
    const createResponse = await plaidClient.assetReportCreate({
      access_tokens: [accessToken],
      days_requested: 90,
    })

    const assetReportToken = createResponse.data.asset_report_token
    const assetReportId = createResponse.data.asset_report_id

    // Wait a moment for report generation (in production, use webhook)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Get asset report
    const reportResponse = await plaidClient.assetReportGet({
      asset_report_token: assetReportToken,
    })

    const reportData = reportResponse.data.report

    // Save to MongoDB
    await saveAssetReport({
      userId,
      platform,
      assetReportId,
      assetReportToken,
      reportData,
      createdAt: new Date(),
    })

    return NextResponse.json({
      assets: {
        totalAssets: reportData.items.reduce((sum, item) => sum + (item.accounts?.[0]?.balances?.current || 0), 0),
        accounts: reportData.items[0]?.accounts?.map((acc) => ({
          name: acc.name,
          balance: acc.balances.current,
        })),
      },
      assetReportId,
    })
  } catch (error: any) {
    console.error("Error creating asset report:", error)
    return NextResponse.json({ error: "Failed to create asset report", details: error.message }, { status: 500 })
  }
}
