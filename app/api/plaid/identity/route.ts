import { NextResponse } from "next/server"
import { plaidClient, isPlaidConfigured } from "@/lib/plaid"
import { saveBankIdentity } from "@/lib/mongodb-schemas"

export async function POST(request: Request) {
  try {
    const { accessToken, userId, platform, accountId } = await request.json()

    if (!isPlaidConfigured() || accessToken?.startsWith("mock-")) {
      console.warn("Using mock identity data")
      return NextResponse.json({
        identity: {
          names: ["John Driver"],
          emails: [{ data: "driver@example.com", primary: true }],
          phoneNumbers: [{ data: "+1234567890", primary: true }],
        },
        mock: true,
      })
    }

    // Fetch identity from Plaid
    const response = await plaidClient.identityGet({
      access_token: accessToken,
    })

    const account = response.data.accounts.find((acc) => acc.account_id === accountId) || response.data.accounts[0]

    const identityData = {
      userId,
      platform,
      accountId: account.account_id,
      owners: account.owners,
      lastUpdated: new Date(),
    }

    // Save to MongoDB
    await saveBankIdentity(identityData)

    return NextResponse.json({
      identity: {
        names: account.owners[0]?.names || [],
        emails: account.owners[0]?.emails || [],
        phoneNumbers: account.owners[0]?.phone_numbers || [],
        addresses: account.owners[0]?.addresses || [],
      },
    })
  } catch (error: any) {
    console.error("Error fetching identity:", error)
    return NextResponse.json({ error: "Failed to fetch identity", details: error.message }, { status: 500 })
  }
}
