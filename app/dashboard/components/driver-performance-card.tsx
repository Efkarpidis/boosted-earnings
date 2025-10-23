"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Clock, DollarSign, MapPin } from "lucide-react"
import { useEffect, useState } from "react"

export function DriverPerformanceCard({ userId }: { userId?: string }) {
  const [stats, setStats] = useState({
    trips: 0,
    hours: 0,
    avgTripEarnings: 0,
    avgTip: 0,
    loading: true,
  })

  useEffect(() => {
    async function fetchStats() {
      try {
        // Mock data for now - will be replaced with real API call
        setStats({
          trips: 12,
          hours: 8.5,
          avgTripEarnings: 23.75,
          avgTip: 5.25,
          loading: false,
        })
      } catch (error) {
        console.error("Error fetching driver stats:", error)
        setStats({
          trips: 12,
          hours: 8.5,
          avgTripEarnings: 23.75,
          avgTip: 5.25,
          loading: false,
        })
      }
    }

    fetchStats()
  }, [userId])

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
      <CardHeader>
        <CardTitle className="text-gold flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Today's Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4" />
              <span>Trips</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.trips}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Clock className="w-4 h-4" />
              <span>Hours</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.hours.toFixed(1)}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <DollarSign className="w-4 h-4" />
              <span>Avg Trip</span>
            </div>
            <p className="text-2xl font-bold text-gold">${stats.avgTripEarnings.toFixed(2)}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <DollarSign className="w-4 h-4" />
              <span>Avg Tip</span>
            </div>
            <p className="text-2xl font-bold text-gold">${stats.avgTip.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
