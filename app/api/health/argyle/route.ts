import { NextResponse } from "next/server"
import { env, isArgyleConfigured } from "@/lib/argyle"
import { generateRequestId, logRequest, logResponse, logError } from "@/lib/request-logger"

export async function GET() {
  const requestId = generateRequestId()
  logRequest(requestId, "GET", "/api/health/argyle")

  try {
    const health = {
      ok: true,
      configured: isArgyleConfigured(),
      mockMode: env.isMockMode,
      env: env.argyleEnv,
      timestamp: new Date().toISOString(),
    }

    if (!isArgyleConfigured() && !env.isMockMode) {
      health.ok = false
      health.message = "Argyle credentials not configured"
      health.missing = []
      if (!env.argyleClientId) health.missing.push("ARGYLE_CLIENT_ID")
      if (!env.argyleSecret) health.missing.push("ARGYLE_SECRET")
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
