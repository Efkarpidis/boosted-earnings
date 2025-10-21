import { NextResponse } from "next/server"
import { plaidClient, isPlaidConfigured } from "@/lib/plaid"
import { getBankIdentitiesCollection } from "@/lib/mongodb-schemas"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const accessToken = searchParams.get("accessToken")
    const userId = searchParams.get("userId")
    const platform = searchParams.get("platform")

    if (!accessToken || !userId) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    if (!isPlaidConfigured() || accessToken.startsWith("mock-")) {
      console.warn("Using mock identity data")
      return NextResponse.json({
        accounts: [
          {
            account_id: "mock_account_1",
            owners: [
              {
                names: ["John Driver"],
                emails: [{ data: "driver@example.com", primary: true, type: "primary" }],
                phone_numbers: [{ data: "555-0123", primary: true, type: "mobile" }],
                addresses: [
                  {
                    data: {
                      street: "123 Main St",
                      city: "San Francisco",
                      region: "CA",
                      postal_code: "94102",
                      country: "US",
                    },
                    primary: true,
                  },
                ],
              },
            ],
          },
        ],
        mock: true,
      })
    }

    // Fetch identity from Plaid
    const response = await plaidClient.identityGet({
      access_token: accessToken,
    })

    try {
      const collection = await getBankIdentitiesCollection()
      for (const account of response.data.accounts) {
        await collection.updateOne(
          { userId, accountId: account.account_id },
          {
            $set: {
              platform: platform || "Unknown",
              owners: account.owners.map((owner) => ({
                names: owner.names,
                emails: owner.emails.map((e) => e.data),
                phoneNumbers: owner.phone_numbers.map((p) => p.data),
                addresses: owner.addresses.map((a) => ({
                  street: a.data.street,
                  city: a.data.city,
                  region: a.data.region,
                  postalCode: a.data.postal_code,
                  country: a.data.country,
                })),
              })),
              lastUpdated: new Date(),
            },
          },
          { upsert: true },
        )
      }
    } catch (dbError) {
      console.error("Error storing identity in MongoDB:", dbError)
    }

    return NextResponse.json({
      accounts: response.data.accounts,
      request_id: response.data.request_id,
    })
  } catch (error: any) {
    console.error("Error fetching identity:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch identity",
        details: error.response?.data || error.message,
      },
      { status: 500 },
    )
  }
}
