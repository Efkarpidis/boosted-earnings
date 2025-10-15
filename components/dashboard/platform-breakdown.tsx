"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

export function PlatformBreakdown() {
  // Mock data - in production this would come from API
  const data = [
    { name: "Uber", value: 1200, color: "#EDCA3F" },
    { name: "Lyft", value: 850, color: "#CA9825" },
    { name: "DoorDash", value: 550, color: "#A67C1B" },
    { name: "Uber Eats", value: 247.5, color: "#8B6914" },
  ]

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
      <CardHeader>
        <CardTitle className="text-gold">Platform Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#0F0F0F" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #EDCA3F",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: number) => `$${value.toFixed(2)}`}
            />
            <Legend wrapperStyle={{ color: "#999" }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
