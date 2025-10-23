"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useEffect, useState } from "react"

export function EarningsTrendChart({ userId }: { userId?: string }) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)

        // Mock data for now - will be replaced with real API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        const mockData = [
          { day: "Mon", earnings: 285.5 },
          { day: "Tue", earnings: 312.75 },
          { day: "Wed", earnings: 298.25 },
          { day: "Thu", earnings: 345.0 },
          { day: "Fri", earnings: 398.5 },
          { day: "Sat", earnings: 425.75 },
          { day: "Sun", earnings: 380.25 },
        ]
        setData(mockData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching earnings trend:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
      <CardHeader>
        <CardTitle className="text-gold">This Week's Earnings</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-[300px] w-full bg-muted/20" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EDCA3F" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#CA9825" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="day" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #EDCA3F",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                labelStyle={{ color: "#EDCA3F" }}
              />
              <Legend wrapperStyle={{ color: "#999" }} />
              <Bar dataKey="earnings" fill="url(#barGradient)" radius={[8, 8, 0, 0]} name="Earnings ($)" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
