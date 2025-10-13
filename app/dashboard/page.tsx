"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, MapPin, Calendar, Clock, Target, ArrowUp, ArrowDown } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function DashboardPage() {
  // Sample data - in production, this would come from API
  const earningsData = [
    { date: "Mon", earnings: 245, trips: 18 },
    { date: "Tue", earnings: 312, trips: 22 },
    { date: "Wed", earnings: 289, trips: 20 },
    { date: "Thu", earnings: 356, trips: 25 },
    { date: "Fri", earnings: 423, trips: 31 },
    { date: "Sat", earnings: 512, trips: 38 },
    { date: "Sun", earnings: 467, trips: 34 },
  ]

  const hourlyData = [
    { hour: "6AM", earnings: 45 },
    { hour: "9AM", earnings: 78 },
    { hour: "12PM", earnings: 92 },
    { hour: "3PM", earnings: 65 },
    { hour: "6PM", earnings: 125 },
    { hour: "9PM", earnings: 98 },
    { hour: "12AM", earnings: 87 },
  ]

  const platformData = [
    { name: "Uber", value: 1245, color: "#000000" },
    { name: "Lyft", value: 892, color: "#FF00BF" },
    { name: "DoorDash", value: 567, color: "#FF3008" },
  ]

  const topZones = [
    { zone: "Downtown", earnings: "$1,234", trips: 45 },
    { zone: "Airport", earnings: "$987", trips: 32 },
    { zone: "University District", earnings: "$756", trips: 38 },
    { zone: "Financial District", earnings: "$654", trips: 28 },
    { zone: "Entertainment District", earnings: "$543", trips: 25 },
  ]

  const upcomingSchedule = [
    { day: "Monday", shift: "7:00 AM - 11:00 AM", goal: "$250" },
    { day: "Tuesday", shift: "5:00 PM - 10:00 PM", goal: "$300" },
    { day: "Friday", shift: "6:00 PM - 2:00 AM", goal: "$450" },
    { day: "Saturday", shift: "10:00 AM - 6:00 PM", goal: "$500" },
  ]

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b border-border bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's your earnings overview.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Export Data</Button>
              <Button>Connect Platform</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,604</div>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+12.5%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">188</div>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+8.2%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg Per Trip</CardTitle>
                <Target className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$13.85</div>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">+3.8%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Hours Driven</CardTitle>
                <Clock className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42.5</div>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">-5.2%</span> from last week
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="zones">Top Zones</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Weekly Earnings Chart */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle>Weekly Earnings</CardTitle>
                    <CardDescription>Your earnings over the past 7 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={earningsData}>
                        <defs>
                          <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="earnings"
                          stroke="hsl(var(--primary))"
                          fillOpacity={1}
                          fill="url(#colorEarnings)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Platform Breakdown */}
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle>Platform Breakdown</CardTitle>
                    <CardDescription>Earnings by platform this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center">
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={platformData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {platformData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                      {platformData.map((platform) => (
                        <div key={platform.name} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: platform.color }} />
                            <span>{platform.name}</span>
                          </div>
                          <span className="font-semibold">${platform.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Hourly Performance */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle>Hourly Performance</CardTitle>
                  <CardDescription>Average earnings by hour of day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="earnings" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle>Trip Volume Trends</CardTitle>
                    <CardDescription>Number of trips completed per day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={earningsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="trips"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{ fill: "hsl(var(--primary))" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>Key performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Acceptance Rate</span>
                      <span className="text-lg font-semibold">87%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[87%] rounded-full bg-primary" />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Customer Rating</span>
                      <span className="text-lg font-semibold">4.92 ★</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[98%] rounded-full bg-primary" />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Cancellation Rate</span>
                      <span className="text-lg font-semibold">3%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[3%] rounded-full bg-destructive" />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">On-Time Rate</span>
                      <span className="text-lg font-semibold">96%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[96%] rounded-full bg-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle>Upcoming Schedule</CardTitle>
                  <CardDescription>Your planned driving shifts and goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingSchedule.map((schedule, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <Calendar className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold">{schedule.day}</div>
                            <div className="text-sm text-muted-foreground">{schedule.shift}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Goal</div>
                          <div className="font-semibold text-primary">{schedule.goal}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="mt-6 w-full">Add New Shift</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="zones" className="space-y-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle>Top Earning Zones</CardTitle>
                  <CardDescription>Your most profitable areas this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topZones.map((zone, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <span className="font-bold text-primary">#{index + 1}</span>
                          </div>
                          <div>
                            <div className="font-semibold">{zone.zone}</div>
                            <div className="text-sm text-muted-foreground">{zone.trips} trips</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">{zone.earnings}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Heat Map Placeholder */}
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle>Earnings Heat Map</CardTitle>
                  <CardDescription>Visual representation of high-earning areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-[400px] items-center justify-center rounded-lg bg-muted">
                    <div className="text-center">
                      <MapPin className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Interactive map coming soon
                        <br />
                        Connect your account to see real-time heat maps
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
