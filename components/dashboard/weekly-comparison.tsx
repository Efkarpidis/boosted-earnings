"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface WeeklyComparisonProps {
  data?: any[]
}

export function WeeklyComparison({ data }: WeeklyComparisonProps) {
  const mockData = [
    { day: "Mon", thisWeek: 420, lastWeek: 380 },
    { day: "Tue", thisWeek: 380, lastWeek: 420 },
    { day: "Wed", thisWeek: 510, lastWeek: 450 },
    { day: "Thu", thisWeek: 390, lastWeek: 410 },
    { day: "Fri", thisWeek: 580, lastWeek: 520 },
    { day: "Sat", thisWeek: 720, lastWeek: 680 },
    { day: "Sun", thisWeek: 650, lastWeek: 600 },
  ]

  const chartData = data || mockData

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
      <CardHeader>
        <CardTitle className="text-gold">Weekly Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
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
              formatter={(value: number) => `$${value}`}
            />
            <Legend wrapperStyle={{ color: "#999" }} />
            <Bar dataKey="thisWeek" fill="url(#thisWeekGradient)" radius={[8, 8, 0, 0]} name="This Week" />
            <Bar dataKey="lastWeek" fill="url(#lastWeekGradient)" radius={[8, 8, 0, 0]} name="Last Week" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
