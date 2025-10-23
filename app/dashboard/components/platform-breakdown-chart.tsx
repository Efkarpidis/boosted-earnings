"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { useEffect, useState } from "react"

const COLORS = ["#EDCA3F", "#CA9825", "#FFD700", "#FFA500"]

export function PlatformBreakdownChart({ userId }: { userId?: string }) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        // Mock data for now - will be replaced with real API call
        const mockData = [
          { name: "Uber", value: 1250.5, percentage: 45 },
          { name: "Lyft", value: 875.25, percentage: 31 },
          { name: "DoorDash", value: 485.75, percentage: 17 },
          { name: "Uber Eats", value: 235.0, percentage: 7 },
        ]
        setData(mockData)
      } catch (error) {
        console.error("Error fetching platform breakdown:", error)
      }
    }

    fetchData()
  }, [userId])

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
      <CardHeader>
        <CardTitle className="text-gold">Earnings by Platform</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name} ${percentage}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #EDCA3F",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: any) => `$${value.toFixed(2)}`}
            />
            <Legend wrapperStyle={{ color: "#999" }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
