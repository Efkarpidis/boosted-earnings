"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { useEffect, useState } from "react"

interface NetWorthData {
  totalAssets: number
  totalLiabilities: number
  netWorth: number
  change: number
  changePercent: number
}

export function NetWorthCard() {
  const [data, setData] = useState<NetWorthData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNetWorth()
  }, [])

  const fetchNetWorth = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/net-worth')
      // const data = await response.json()

      // Mock data for now
      setData({
        totalAssets: 15420.5,
        totalLiabilities: 3200.0,
        netWorth: 12220.5,
        change: 450.25,
        changePercent: 3.82,
      })
    } catch (error) {
      console.error("Error fetching net worth:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
        <CardHeader>
          <CardTitle className="text-gold">Net Worth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-8 bg-muted rounded w-32"></div>
            <div className="h-4 bg-muted rounded w-24"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  const isPositiveChange = data.change >= 0

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-gold/20 hover:border-gold/40 transition-all">
      <CardHeader>
        <CardTitle className="text-gold flex items-center justify-between">
          <span>Net Worth</span>
          {isPositiveChange ? (
            <TrendingUp className="h-5 w-5 text-green-500" />
          ) : (
            <TrendingDown className="h-5 w-5 text-red-500" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-3xl font-bold text-foreground">
            ${data.netWorth.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div
            className={`text-sm flex items-center gap-1 mt-1 ${isPositiveChange ? "text-green-500" : "text-red-500"}`}
          >
            {isPositiveChange ? "+" : ""}${Math.abs(data.change).toFixed(2)} ({isPositiveChange ? "+" : ""}
            {data.changePercent.toFixed(2)}%)
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div>
            <div className="text-xs text-muted-foreground">Assets</div>
            <div className="text-lg font-semibold text-green-500">
              ${data.totalAssets.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Liabilities</div>
            <div className="text-lg font-semibold text-red-500">
              ${data.totalLiabilities.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
