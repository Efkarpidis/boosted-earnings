import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { env } from "@/lib/env"
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
    const webhookSecret = env.argyleWebhookSecret

    // Enforce signature verification if secret is configured
    if (webhookSecret) {
      if (!signature) {
        console.error("[Argyle Webhook] Missing signature header")
        return NextResponse.json({ error: "Missing signature" }, { status: 400 })
      }

      const isValid = verifyWebhookSignature(payload, signature, webhookSecret)
      if (!isValid) {
        console.error("[Argyle Webhook] Invalid signature")
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
      }
    } else {
      console.warn("[Argyle Webhook] Signature verification disabled - ARGYLE_WEBHOOK_SECRET not set")
    }

    const event = JSON.parse(payload)
    const { event: eventType, data } = event

    // Log only event metadata, not PII
    console.log(`[Argyle Webhook] event=${eventType}, data_count=${Array.isArray(data) ? data.length : 1}`)

    // Handle relevant events by triggering a sync
    const relevantEvents = [
      "connection.updated",
      "data.ready",
      "employment.data.updated",
      "earnings.created",
      "earnings.updated",
      "activities.created",
      "activities.updated",
    ]

    if (relevantEvents.includes(eventType)) {
      // Trigger async sync (don't await to respond quickly)
      const userId = data?.user_id || data?.[0]?.user_id
      if (userId) {
        fetch(`${env.appUrl}/api/argyle/sync`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }).catch((error) => {
          console.error("[Argyle Webhook] Failed to trigger sync:", error)
        })
      }
    }

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

    return NextResponse.json({ received: true, event: eventType, processed: count })
  } catch (error: any) {
    console.error("[Argyle Webhook] Error:", error.message)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
