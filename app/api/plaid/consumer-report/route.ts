import { NextResponse } from "next/server"
import { plaidClient, isPlaidConfigured } from "@/lib/plaid"
import { saveConsumerReport } from "@/lib/mongodb-schemas"

export async function POST(request: Request) {
  try {
    const { userId, platform } = await request.json()

    if (!isPlaidConfigured()) {
      console.warn("Using mock consumer report data")
      return NextResponse.json({
        consumerReport: {
          creditScore: 720,
          accountsOpen: 3,
          totalDebt: 5000,
        },
        mock: true,
      })
    }

    // Create consumer report (Note: This requires special Plaid access)
    const response = await plaidClient.creditSessionsGet({
      user_token: userId,
    })

    const reportData = response.data

    // Save to MongoDB
    await saveConsumerReport({
      userId,
      platform,
      reportToken: userId,
      reportData,
      createdAt: new Date(),
    })

    return NextResponse.json({
      consumerReport: reportData,
    })
  } catch (error: any) {
    console.error("Error fetching consumer report:", error)
    // Consumer reports require special access, return mock data
    return NextResponse.json({
      consumerReport: {
        creditScore: 720,
        accountsOpen: 3,
        totalDebt: 5000,
      },
      mock: true,
    })
  }
}
