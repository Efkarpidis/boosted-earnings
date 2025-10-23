"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useEffect, useState } from "react"

interface PlatformIncome {
  platform: string
  thisWeek: number
  lastWeek: number
}

export function IncomeByPlatformChart() {
  const [data, setData] = useState<PlatformIncome[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchIncomeData()
  }, [])

  const fetchIncomeData = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/income-by-platform')
      // const data = await response.json()

      // Mock data for now
      setData([
        { platform: "Uber", thisWeek: 1250.5, lastWeek: 1100.0 },
        { platform: "Lyft", thisWeek: 850.25, lastWeek: 920.5 },
        { platform: "DoorDash", thisWeek: 650.0, lastWeek: 580.75 },
        { platform: "UberEats", thisWeek: 420.75, lastWeek: 450.0 },
      ])
    } catch (error) {
      console.error("Error fetching income data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
        <CardHeader>
          <CardTitle className="text-gold">Income by Platform</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading chart...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
      <CardHeader>
        <CardTitle className="text-gold">Income by Platform</CardTitle>
        <p className="text-sm text-muted-foreground">Comparing this week vs last week</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <defs>
              <linearGradient id="thisWeekGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EDCA3F" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#EDCA3F" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="lastWeekGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#CA9825" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#CA9825" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="platform" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #EDCA3F",
                borderRadius: "8px",
                color: "#fff",
              }}
              labelStyle={{ color: "#EDCA3F" }}
              formatter={(value: number) => `$${value.toFixed(2)}`}
            />
            <Legend wrapperStyle={{ color: "#999" }} />
            <Bar dataKey="thisWeek" fill="url(#thisWeekGradient)" name="This Week" radius={[8, 8, 0, 0]} />
            <Bar dataKey="lastWeek" fill="url(#lastWeekGradient)" name="Last Week" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
