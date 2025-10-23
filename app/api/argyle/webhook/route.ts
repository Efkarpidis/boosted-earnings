import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { saveDriverEarning, saveDriverTrip, saveDriverBalance } from "@/lib/mongodb-schemas"

function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac("sha256", secret)
  hmac.update(payload)
  const expectedSignature = hmac.digest("hex")
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text()
    const signature = request.headers.get("x-argyle-signature") || ""
    const webhookSecret = process.env.ARGYLE_WEBHOOK_SECRET

    if (webhookSecret && signature) {
      const isValid = verifyWebhookSignature(payload, signature, webhookSecret)
      if (!isValid) {
        console.error("[Argyle Webhook] Invalid signature")
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
      }
    }

    const event = JSON.parse(payload)
    const { event: eventType, data } = event

    let count = 0

    switch (eventType) {
      case "earnings.created":
      case "earnings.updated":
        if (Array.isArray(data)) {
          for (const earning of data) {
            await saveDriverEarning({
              userId: earning.user_id || "unknown",
              platform: earning.platform || "Uber",
              earningId: earning.id,
              totalAmount: earning.total || 0,
              tips: earning.tips || 0,
              bonuses: earning.bonuses || 0,
              startDate: earning.start_date,
              endDate: earning.end_date,
              payoutStatus: earning.payout_status || "pending",
              updatedAt: new Date(),
            })
            count++
          }
        }
        console.log(`[Argyle Webhook] event=${eventType} count=${count}`)
        break

      case "activities.created":
      case "activities.updated":
        if (Array.isArray(data)) {
          for (const activity of data) {
            await saveDriverTrip({
              userId: activity.user_id || "unknown",
              platform: activity.platform || "Uber",
              tripId: activity.id,
              startTime: new Date(activity.start_time),
              endTime: new Date(activity.end_time),
              distanceMiles: activity.distance || 0,
              durationMin: activity.duration || 0,
              status: activity.status || "completed",
              earningsTip: activity.earnings?.tip || 0,
              earningsBase: activity.earnings?.base || 0,
              city: activity.location?.city,
              createdAt: new Date(),
            })
            count++
          }
        }
        console.log(`[Argyle Webhook] event=${eventType} count=${count}`)
        break

      case "balances.updated":
        if (Array.isArray(data)) {
          for (const balance of data) {
            await saveDriverBalance({
              userId: balance.user_id || "unknown",
              platform: balance.platform || "Uber",
              balanceAmount: balance.balance || 0,
              lastSyncedAt: new Date(),
            })
            count++
          }
        }
        console.log(`[Argyle Webhook] event=${eventType} count=${count}`)
        break

      default:
        console.log(`[Argyle Webhook] Unhandled event type: ${eventType}`)
    }

    return NextResponse.json({ received: true, processed: count })
  } catch (error: any) {
    console.error("[Argyle Webhook] Error:", error)
    return NextResponse.json({ error: error.message || "Webhook processing failed" }, { status: 500 })
  }
}
