import { NextResponse } from "next/server"
import { isPlaidConfigured } from "@/lib/plaid"
import { generateRequestId, logRequest, logResponse, logError } from "@/lib/request-logger"

export async function GET() {
  const requestId = generateRequestId()
  logRequest(requestId, "GET", "/api/health/plaid")

  try {
    const plaidEnv = process.env.PLAID_ENV || "sandbox"
    const health = {
      ok: isPlaidConfigured(),
      configured: isPlaidConfigured(),
      env: plaidEnv,
      timestamp: new Date().toISOString(),
    }

    if (!isPlaidConfigured()) {
      health.message = "Plaid credentials not configured"
      health.missing = []
      if (!process.env.PLAID_CLIENT_ID) health.missing.push("PLAID_CLIENT_ID")
      if (!process.env.PLAID_SECRET) health.missing.push("PLAID_SECRET")
    }

    logResponse(requestId, health.ok ? 200 : 503, health)
    return NextResponse.json(health, { status: health.ok ? 200 : 503 })
  } catch (error: any) {
    logError(requestId, error)
    return NextResponse.json(
      {
        ok: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
