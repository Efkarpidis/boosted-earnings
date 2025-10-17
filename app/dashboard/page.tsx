"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EarningsChart } from "@/components/dashboard/earnings-chart"
import { PlatformBreakdown } from "@/components/dashboard/platform-breakdown"
import { WeeklyComparison } from "@/components/dashboard/weekly-comparison"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/components/auth/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { TrendingUp, DollarSign, Clock, TrendingDown, LinkIcon, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

function DashboardContent() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [timeRange, setTimeRange] = useState("week")
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([])
  const [earningsData, setEarningsData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null)
  const [accountId, setAccountId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [usingMockData, setUsingMockData] = useState(false)

  useEffect(() => {
    if (accountId) {
      fetchEarningsData()
    }
  }, [accountId, timeRange])

  const fetchEarningsData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/argyle/earnings?accountId=${accountId}&timeRange=${timeRange}`)
      const data = await response.json()

      if (data.mock) {
        setUsingMockData(true)
        toast({
          title: "Using Mock Data",
          description: "API credentials not configured. Displaying sample data.",
          variant: "default",
        })
      }

      setEarningsData(data)
    } catch (error) {
      console.error("Error fetching earnings:", error)
      setError("Failed to fetch earnings data. Please try again.")
      toast({
        title: "Error",
        description: "Failed to fetch earnings data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleConnectPlatform = async (platform: string) => {
    if (connectedPlatforms.includes(platform)) {
      toast({
        title: "Already Connected",
        description: `${platform} is already connected to your account.`,
      })
      return
    }

    setConnectingPlatform(platform)
    setError(null)

    try {
      // Step 1: Initialize Argyle connection for earnings data
      const argyleResponse = await fetch("/api/argyle/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, userId: user?.uid }),
      })

      const argyleData = await argyleResponse.json()

      if (!argyleResponse.ok) {
        throw new Error(argyleData.error || "Failed to connect to Argyle")
      }

      if (argyleData.mock) {
        setUsingMockData(true)
        toast({
          title: "Mock Connection",
          description: `${platform} connected with sample data. Configure API keys for real data.`,
        })
      } else {
        toast({
          title: "Success!",
          description: `${platform} connected successfully via Argyle.`,
        })
      }

      // Step 2: Initialize Plaid Link for bank data (optional)
      try {
        const plaidResponse = await fetch("/api/plaid/link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user?.uid }),
        })

        const plaidData = await plaidResponse.json()

        if (plaidData.link_token && !plaidData.mock) {
          // In production, you would open Plaid Link UI here with the link_token
          console.log("Plaid Link Token:", plaidData.link_token)
        }
      } catch (plaidError) {
        console.log("Plaid connection optional, continuing with Argyle only")
      }

      // Update state with successful connection
      setConnectedPlatforms([...connectedPlatforms, platform])
      if (argyleData.accountId) {
        setAccountId(argyleData.accountId)
      }
    } catch (error: any) {
      console.error("Error connecting platform:", error)
      const errorMessage = error.message || "Failed to connect platform. Please try again."
      setError(errorMessage)

      toast({
        title: "Connection Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setConnectingPlatform(null)
    }
  }

  const stats = earningsData || {
    totalEarnings: 2847.5,
    earningsChange: 12.5,
    hoursWorked: 42.5,
    hoursChange: -5.2,
    avgHourly: 67.0,
    avgHourlyChange: 18.7,
    trips: 156,
    tripsChange: 8.3,
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gold mb-2">
                Welcome back, {user?.displayName || "Driver"}!
              </h1>
              <p className="text-muted-foreground">Track and optimize your rideshare earnings</p>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px] bg-background border-gold/30 focus:border-gold text-foreground">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {usingMockData && (
            <Alert className="mb-6 border-gold/30 bg-gold/5">
              <AlertCircle className="h-4 w-4 text-gold" />
              <AlertDescription className="text-foreground">
                You're viewing sample data. Connect your platforms and configure API keys (ARGYLE_API_KEY,
                PLAID_CLIENT_ID) to see real earnings.
              </AlertDescription>
            </Alert>
          )}

          {/* Connect Platforms Section */}
          <Card className="bg-card/50 backdrop-blur-sm border-gold/20 mb-8">
            <CardHeader>
              <CardTitle className="text-gold flex items-center gap-2">
                <LinkIcon className="w-5 h-5" />
                Connect Your Platforms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Connect your rideshare and delivery platforms to automatically track your earnings
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Uber", "Lyft", "DoorDash", "Uber Eats"].map((platform) => (
                  <Button
                    key={platform}
                    onClick={() => handleConnectPlatform(platform)}
                    disabled={connectingPlatform !== null}
                    variant={connectedPlatforms.includes(platform) ? "default" : "outline"}
                    className={
                      connectedPlatforms.includes(platform)
                        ? "bg-gold hover:bg-gold-dark text-black font-semibold"
                        : "border-gold text-gold hover:bg-gold hover:text-black bg-transparent"
                    }
                  >
                    {connectingPlatform === platform ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Connecting...
                      </>
                    ) : connectedPlatforms.includes(platform) ? (
                      `✓ ${platform}`
                    ) : (
                      `Connect ${platform}`
                    )}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card/50 backdrop-blur-sm border-gold/20 hover:border-gold/50 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <DollarSign className="w-5 h-5 text-gold" />
                </div>
                <p className="text-3xl font-bold text-gold mb-1">${stats.totalEarnings.toFixed(2)}</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-500">+{stats.earningsChange || 12.5}%</span>
                  <span className="text-muted-foreground">vs last {timeRange}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-gold/20 hover:border-gold/50 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Hours Worked</p>
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{stats.hoursWorked}</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  <span className="text-red-500">{stats.hoursChange || -5.2}%</span>
                  <span className="text-muted-foreground">vs last {timeRange}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-gold/20 hover:border-gold/50 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Avg. Hourly</p>
                  <TrendingUp className="w-5 h-5 text-gold" />
                </div>
                <p className="text-3xl font-bold text-gold mb-1">${stats.avgHourly.toFixed(2)}</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-500">+{stats.avgHourlyChange || 18.7}%</span>
                  <span className="text-muted-foreground">vs last {timeRange}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-gold/20 hover:border-gold/50 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Trips</p>
                  <TrendingUp className="w-5 h-5 text-gold" />
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{stats.trips}</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-500">+{stats.tripsChange || 8.3}%</span>
                  <span className="text-muted-foreground">vs last {timeRange}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <EarningsChart timeRange={timeRange} data={earningsData?.dailyData} />
            <PlatformBreakdown data={earningsData?.breakdown} />
          </div>

          {/* Weekly Comparison */}
          <WeeklyComparison data={earningsData?.dailyData} />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
