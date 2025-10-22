"use client"

import { useState, useEffect, useCallback } from "react"
import { usePlaidLink } from "react-plaid-link"
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
import { DriverPerformanceCard } from "./components/driver-performance-card"
import { EarningsTrendChart } from "./components/earnings-trend-chart"
import { PlatformBreakdownChart as ArgylePlatformBreakdown } from "./components/platform-breakdown-chart"

function DashboardContent() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [timeRange, setTimeRange] = useState("week")
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([])
  const [earningsData, setEarningsData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [usingMockData, setUsingMockData] = useState(false)
  const [linkToken, setLinkToken] = useState<string | null>(null)
  const [currentPlatform, setCurrentPlatform] = useState<string | null>(null)
  const [syncing, setSyncing] = useState(false)

  const onSuccess = useCallback(
    async (publicToken: string, metadata: any) => {
      if (!currentPlatform) return

      setLoading(true)
      try {
        // Exchange public token for access token
        const exchangeResponse = await fetch("/api/plaid/exchange", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            publicToken,
            userId: user?.uid,
            platform: currentPlatform,
          }),
        })

        const exchangeData = await exchangeResponse.json()

        if (exchangeData.mock) {
          setUsingMockData(true)
          toast({
            title: "Mock Connection",
            description: `${currentPlatform} connected with sample data in sandbox mode.`,
          })
        } else {
          toast({
            title: "Success!",
            description: `Connected to Plaid for ${currentPlatform} in sandbox mode.`,
          })
        }

        const [balanceRes, identityRes, assetsRes, consumerRes] = await Promise.all([
          fetch("/api/plaid/balance", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              accessToken: exchangeData.accessToken,
              userId: user?.uid,
              platform: currentPlatform,
              accountId: exchangeData.accountId,
            }),
          }),
          fetch("/api/plaid/identity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              accessToken: exchangeData.accessToken,
              userId: user?.uid,
              platform: currentPlatform,
              accountId: exchangeData.accountId,
            }),
          }),
          fetch("/api/plaid/assets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              accessToken: exchangeData.accessToken,
              userId: user?.uid,
              platform: currentPlatform,
            }),
          }),
          fetch("/api/plaid/consumer-report", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user?.uid,
              platform: currentPlatform,
            }),
          }),
        ])

        const [balanceData, identityData, assetsData, consumerData] = await Promise.all([
          balanceRes.json(),
          identityRes.json(),
          assetsRes.json(),
          consumerRes.json(),
        ])

        console.log("[v0] Plaid data fetched:", { balanceData, identityData, assetsData, consumerData })

        // Update connected platforms
        setConnectedPlatforms([...connectedPlatforms, currentPlatform])

        setEarningsData({
          totalEarnings: balanceData.balance?.current || 2847.5,
          dailyData: generateMockDailyData(balanceData.balance?.current || 2847.5),
          breakdown: [{ platform: currentPlatform, earnings: balanceData.balance?.current || 2847.5, trips: 156 }],
        })
      } catch (error: any) {
        console.error("Error processing Plaid connection:", error)
        toast({
          title: "Connection Error",
          description: error.message || "Failed to process Plaid connection.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
        setCurrentPlatform(null)
      }
    },
    [currentPlatform, user, connectedPlatforms, toast],
  )

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
  })

  const handleConnectPlatform = async (platform: string) => {
    if (connectedPlatforms.includes(platform)) {
      toast({
        title: "Already Connected",
        description: `${platform} is already connected to your account.`,
      })
      return
    }

    setConnectingPlatform(platform)
    setCurrentPlatform(platform)
    setError(null)

    try {
      // Get Plaid Link token
      const response = await fetch("/api/plaid/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.uid, platform }),
      })

      const data = await response.json()

      if (data.mock) {
        setUsingMockData(true)
        toast({
          title: "Sandbox Mode",
          description: `Opening Plaid Link for ${platform} in sandbox mode. Configure PLAID_CLIENT_ID and PLAID_SECRET for real data.`,
        })
      }

      setLinkToken(data.link_token)

      // Open Plaid Link when ready
      setTimeout(() => {
        if (ready) {
          open()
        }
      }, 500)
    } catch (error: any) {
      console.error("Error connecting platform:", error)
      setError(error.message || "Failed to connect platform.")
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to initialize Plaid Link.",
        variant: "destructive",
      })
    } finally {
      setConnectingPlatform(null)
    }
  }

  const handleSyncTrips = async () => {
    setSyncing(true)
    try {
      const response = await fetch("/api/argyle/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.uid || "test-user" }),
      })

      const data = await response.json()

      if (data.mock) {
        toast({
          title: "Sandbox Mode",
          description: `Synced ${data.newTrips} trips and ${data.newEarnings} earnings (mock data). Configure ARGYLE_CLIENT_ID and ARGYLE_SECRET for real data.`,
        })
      } else {
        toast({
          title: "Sync Complete",
          description: `Synced ${data.newTrips} trips and ${data.newEarnings} earnings from Argyle.`,
        })
      }
    } catch (error: any) {
      console.error("Error syncing trips:", error)
      toast({
        title: "Sync Failed",
        description: error.message || "Failed to sync trips from Argyle.",
        variant: "destructive",
      })
    } finally {
      setSyncing(false)
    }
  }

  const handleRefreshBalances = async () => {
    setSyncing(true)
    try {
      const response = await fetch("/api/plaid/balances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.uid || "test-user" }),
      })

      const data = await response.json()

      toast({
        title: "Balances Refreshed",
        description: `Updated balances for ${data.accountsUpdated || 0} accounts.`,
      })
    } catch (error: any) {
      console.error("Error refreshing balances:", error)
      toast({
        title: "Refresh Failed",
        description: error.message || "Failed to refresh balances from Plaid.",
        variant: "destructive",
      })
    } finally {
      setSyncing(false)
    }
  }

  useEffect(() => {
    if (linkToken && ready) {
      open()
    }
  }, [linkToken, ready, open])

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
                You're viewing sample data in Plaid sandbox mode. Configure API keys (PLAID_CLIENT_ID, PLAID_SECRET,
                PLAID_ENV=sandbox) to test with real sandbox accounts.
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
                Connect your rideshare and delivery platforms via Plaid sandbox to track earnings
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Uber", "Lyft", "DoorDash", "Uber Eats"].map((platform) => (
                  <Button
                    key={platform}
                    onClick={() => handleConnectPlatform(platform)}
                    disabled={connectingPlatform !== null || loading}
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

          {/* Sync Action Buttons */}
          <div className="flex gap-4 mb-8">
            <Button
              onClick={handleSyncTrips}
              disabled={syncing}
              className="bg-gold hover:bg-gold-dark text-black font-semibold"
            >
              {syncing ? "Syncing..." : "Sync Trips (Argyle)"}
            </Button>
            <Button
              onClick={handleRefreshBalances}
              disabled={syncing}
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-black bg-transparent"
            >
              {syncing ? "Refreshing..." : "Refresh Balances (Plaid)"}
            </Button>
          </div>

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

          {/* Argyle Components */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <DriverPerformanceCard userId={user?.uid} />
            <div className="lg:col-span-2">
              <EarningsTrendChart userId={user?.uid} />
            </div>
          </div>

          <div className="mb-8">
            <ArgylePlatformBreakdown userId={user?.uid} />
          </div>

          {/* Weekly Comparison */}
          <WeeklyComparison data={earningsData?.dailyData} />
        </div>
      </div>

      <Footer />
    </div>
  )
}

function generateMockDailyData(totalEarnings: number) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  return days.map((name, index) => ({
    name,
    earnings: Math.round((totalEarnings / 7) * (0.8 + Math.random() * 0.4)),
    hours: 7 + Math.random() * 5,
  }))
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
