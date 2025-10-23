import { type NextRequest, NextResponse } from "next/server"
import { getAllDriverConnections } from "@/lib/mongodb-schemas"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 })
    }

    const connections = await getAllDriverConnections(userId)

    return NextResponse.json({
      connections: connections.map((conn) => ({
        platform: conn.platform,
        connectedAt: conn.connectedAt,
        lastSyncAt: conn.lastSyncAt,
        status: conn.status,
      })),
    })
  } catch (error: any) {
    console.error("[Argyle Connections] Error:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch connections" }, { status: 500 })
  }
}
