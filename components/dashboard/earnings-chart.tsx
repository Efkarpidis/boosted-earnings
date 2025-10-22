"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface EarningsChartProps {
  timeRange: string
  data?: any[]
}

export function EarningsChart({ timeRange, data }: EarningsChartProps) {
  const chartData = data || [
    { name: "Mon", earnings: 420, hours: 8 },
    { name: "Tue", earnings: 380, hours: 7 },
    { name: "Wed", earnings: 510, hours: 9 },
    { name: "Thu", earnings: 390, hours: 7.5 },
    { name: "Fri", earnings: 580, hours: 10 },
    { name: "Sat", earnings: 720, hours: 12 },
    { name: "Sun", earnings: 650, hours: 11 },
  ]

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
      <CardHeader>
        <CardTitle className="text-gold">Earnings Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EDCA3F" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#EDCA3F" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#999" />
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
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#EDCA3F"
              strokeWidth={3}
              dot={{ fill: "#EDCA3F", r: 5 }}
              activeDot={{ r: 7, fill: "#CA9825" }}
              name="Earnings ($)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
