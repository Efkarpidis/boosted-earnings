"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, TrendingUp, Clock, LinkIcon, Calendar } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"

// Sample data for charts
const earningsData = [
  { date: "Mon", uber: 245, lyft: 180, doordash: 95 },
  { date: "Tue", uber: 280, lyft: 210, doordash: 120 },
  { date: "Wed", uber: 310, lyft: 195, doordash: 110 },
  { date: "Thu", uber: 290, lyft: 220, doordash: 130 },
  { date: "Fri", uber: 380, lyft: 290, doordash: 160 },
  { date: "Sat", uber: 420, lyft: 340, doordash: 180 },
  { date: "Sun", uber: 390, lyft: 310, doordash: 150 },
]

const platformData = [
  { name: "Uber", value: 2315, color: "#EDCA3F" },
  { name: "Lyft", value: 1745, color: "#CA9825" },
  { name: "DoorDash", value: 945, color: "#FFD700" },
]

const hourlyData = [
  { hour: "6am", earnings: 45 },
  { hour: "9am", earnings: 85 },
  { hour: "12pm", earnings: 120 },
  { hour: "3pm", earnings: 95 },
  { hour: "6pm", earnings: 150 },
  { hour: "9pm", earnings: 180 },
  { hour: "12am", earnings: 90 },
]

const expenseData = [
  { category: "Gas", amount: 450 },
  { category: "Maintenance", amount: 200 },
  { category: "Insurance", amount: 150 },
  { category: "Car Wash", amount: 60 },
  { category: "Other", amount: 80 },
]

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("week")
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([])

  const totalEarnings = 5005
  const totalExpenses = 940
  const netProfit = totalEarnings - totalExpenses
  const hoursWorked = 42
  const hourlyRate = (netProfit / hoursWorked).toFixed(2)

  const handleConnectPlatform = (platform: string) => {
    // TODO: Implement Argyle/Plaid integration
    console.log("[v0] Connecting platform:", platform)
    alert(`Connecting to ${platform}... This will integrate with Argyle API for earnings data.`)
    setConnectedPlatforms([...connectedPlatforms, platform])
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black">
        <Header />

        <div className="container mx-auto px-4 py-8">
          {/* Dashboard Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="mb-2 text-4xl font-bold text-gold glow-gold">Earnings Dashboard</h1>
              <p className="text-muted-foreground">Track your rideshare earnings in real-time</p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40 border-gold-dark/50 bg-black/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-gold-dark/30 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Earnings</p>
                    <p className="text-3xl font-bold text-gold">${totalEarnings}</p>
                  </div>
                  <DollarSign className="h-12 w-12 text-gold/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-gold-dark/30 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Net Profit</p>
                    <p className="text-3xl font-bold text-green-500">${netProfit}</p>
                  </div>
                  <TrendingUp className="h-12 w-12 text-green-500/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-gold-dark/30 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Hourly Rate</p>
                    <p className="text-3xl font-bold text-gold">${hourlyRate}/hr</p>
                  </div>
                  <Clock className="h-12 w-12 text-gold/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-gold-dark/30 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Hours Worked</p>
                    <p className="text-3xl font-bold text-white">{hoursWorked}h</p>
                  </div>
                  <Calendar className="h-12 w-12 text-white/50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Platform Connection Cards */}
          <Card className="mb-8 border-gold-dark/30 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gold">
                <LinkIcon className="h-5 w-5" />
                Connect Your Platforms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button
                  onClick={() => handleConnectPlatform("Uber")}
                  disabled={connectedPlatforms.includes("Uber")}
                  className="bg-gold text-black hover:bg-gold-dark disabled:opacity-50"
                >
                  {connectedPlatforms.includes("Uber") ? "✓ Uber Connected" : "Connect Uber"}
                </Button>
                <Button
                  onClick={() => handleConnectPlatform("Lyft")}
                  disabled={connectedPlatforms.includes("Lyft")}
                  className="bg-gold text-black hover:bg-gold-dark disabled:opacity-50"
                >
                  {connectedPlatforms.includes("Lyft") ? "✓ Lyft Connected" : "Connect Lyft"}
                </Button>
                <Button
                  onClick={() => handleConnectPlatform("DoorDash")}
                  disabled={connectedPlatforms.includes("DoorDash")}
                  className="bg-gold text-black hover:bg-gold-dark disabled:opacity-50"
                >
                  {connectedPlatforms.includes("DoorDash") ? "✓ DoorDash Connected" : "Connect DoorDash"}
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Connect your platforms to automatically sync earnings data via Argyle integration
              </p>
            </CardContent>
          </Card>

          {/* Charts Tabs */}
          <Tabs defaultValue="earnings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-card/50 lg:w-auto lg:inline-grid">
              <TabsTrigger value="earnings" className="data-[state=active]:bg-gold data-[state=active]:text-black">
                Earnings
              </TabsTrigger>
              <TabsTrigger value="platforms" className="data-[state=active]:bg-gold data-[state=active]:text-black">
                Platforms
              </TabsTrigger>
              <TabsTrigger value="hourly" className="data-[state=active]:bg-gold data-[state=active]:text-black">
                Hourly
              </TabsTrigger>
              <TabsTrigger value="expenses" className="data-[state=active]:bg-gold data-[state=active]:text-black">
                Expenses
              </TabsTrigger>
            </TabsList>

            {/* Earnings Chart */}
            <TabsContent value="earnings">
              <Card className="border-gold-dark/30 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-gold">Daily Earnings Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={earningsData}>
                      <defs>
                        <linearGradient id="colorUber" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EDCA3F" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#EDCA3F" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="colorLyft" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#CA9825" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#CA9825" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="colorDoorDash" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#FFD700" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#CA9825" opacity={0.1} />
                      <XAxis dataKey="date" stroke="#EDCA3F" />
                      <YAxis stroke="#EDCA3F" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1a1a1a",
                          border: "1px solid #CA9825",
                          borderRadius: "8px",
                          color: "#ffffff",
                        }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="uber"
                        stroke="#EDCA3F"
                        fillOpacity={1}
                        fill="url(#colorUber)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="lyft"
                        stroke="#CA9825"
                        fillOpacity={1}
                        fill="url(#colorLyft)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="doordash"
                        stroke="#FFD700"
                        fillOpacity={1}
                        fill="url(#colorDoorDash)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Platform Distribution Chart */}
            <TabsContent value="platforms">
              <Card className="border-gold-dark/30 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-gold">Earnings by Platform</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={platformData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {platformData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1a1a1a",
                          border: "1px solid #CA9825",
                          borderRadius: "8px",
                          color: "#ffffff",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Hourly Earnings Chart */}
            <TabsContent value="hourly">
              <Card className="border-gold-dark/30 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-gold">Peak Hours Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#CA9825" opacity={0.1} />
                      <XAxis dataKey="hour" stroke="#EDCA3F" />
                      <YAxis stroke="#EDCA3F" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1a1a1a",
                          border: "1px solid #CA9825",
                          borderRadius: "8px",
                          color: "#ffffff",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="earnings"
                        stroke="#EDCA3F"
                        strokeWidth={3}
                        dot={{ fill: "#EDCA3F", r: 6 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Expenses Chart */}
            <TabsContent value="expenses">
              <Card className="border-gold-dark/30 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-gold">Expense Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={expenseData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#CA9825" opacity={0.1} />
                      <XAxis dataKey="category" stroke="#EDCA3F" />
                      <YAxis stroke="#EDCA3F" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1a1a1a",
                          border: "1px solid #CA9825",
                          borderRadius: "8px",
                          color: "#ffffff",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="amount" fill="#EDCA3F" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
