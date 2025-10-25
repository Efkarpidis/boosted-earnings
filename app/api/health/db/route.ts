import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Test MongoDB connection with timeout
    const client = await Promise.race([
      clientPromise,
      new Promise((_, reject) => setTimeout(() => reject(new Error("Connection timeout")), 5000)),
    ])

    // Ping the database
    await (client as any).db("admin").command({ ping: 1 })

    const responseTime = Date.now() - startTime

    return NextResponse.json({
      status: "healthy",
      database: "connected",
      responseTime: `${responseTime}ms`,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    const responseTime = Date.now() - startTime

    return NextResponse.json(
      {
        status: "unhealthy",
        database: "disconnected",
        error: error.message,
        responseTime: `${responseTime}ms`,
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    )
  }
}
