#!/usr/bin/env tsx

import crypto from "crypto"

function signPayload(payload: string, secret: string): string {
  const hmac = crypto.createHmac("sha256", secret)
  hmac.update(payload)
  return hmac.digest("hex")
}

async function sendMockWebhook() {
  const webhookUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const webhookSecret = process.env.ARGYLE_WEBHOOK_SECRET || "test-secret"

  const payload = JSON.stringify({
    event: "data.ready",
    data: {
      user_id: "test-user-123",
      platform: "uber",
      account_id: "test-account-456",
    },
    timestamp: new Date().toISOString(),
  })

  const signature = signPayload(payload, webhookSecret)

  console.log("[Mock Webhook] Sending test webhook to:", `${webhookUrl}/api/argyle/webhook`)
  console.log("[Mock Webhook] Payload:", payload)
  console.log("[Mock Webhook] Signature:", signature)

  const response = await fetch(`${webhookUrl}/api/argyle/webhook`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-argyle-signature": signature,
    },
    body: payload,
  })

  const data = await response.json()

  if (response.ok) {
    console.log("[Mock Webhook] ✓ Success:", data)
  } else {
    console.error("[Mock Webhook] ✗ Error:", data)
  }
}

sendMockWebhook().catch((error) => {
  console.error("[Mock Webhook] Fatal error:", error)
  process.exit(1)
})
