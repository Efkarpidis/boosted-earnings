"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { countries, statesByCountry, citiesByState } from "@/lib/location-data"
import { TrendingUp, DollarSign, BarChart3, Shield, Zap, Users } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const [email, setEmail] = useState("")
  const [country, setCountry] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { email, country, state, city })
    // Handle form submission
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance animate-in fade-in slide-in-from-bottom-4 duration-700">
            Elevate Your <span className="text-gold glow-gold">Rideshare Experience</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-balance animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            Designed by a driver, for the driver.
          </p>

          {/* Email Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-gold/20 hover:border-gold/40 transition-all">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background border-2 border-gold/30 focus:border-gold text-foreground transition-all"
                    required
                  />
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger className="bg-background border-2 border-gold/30 focus:border-gold text-foreground transition-all">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Select value={state} onValueChange={setState} disabled={!country}>
                    <SelectTrigger className="bg-background border-2 border-gold/30 focus:border-gold text-foreground transition-all">
                      <SelectValue placeholder="Select State/Province" />
                    </SelectTrigger>
                    <SelectContent>
                      {country &&
                        statesByCountry[country]?.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            {s.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Select value={city} onValueChange={setCity} disabled={!state}>
                    <SelectTrigger className="bg-background border-2 border-gold/30 focus:border-gold text-foreground transition-all">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      {state &&
                        citiesByState[state]?.map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-dark text-black font-semibold glow-gold transition-all hover:scale-[1.02]"
                >
                  Get Early Access
                </Button>
              </CardContent>
            </Card>
          </form>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-card">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gold glow-gold">
            Why Boosted Earnings?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Real-Time Tracking",
                description: "Monitor your earnings across all platforms in real-time with intelligent analytics.",
              },
              {
                icon: BarChart3,
                title: "Smart Insights",
                description: "Get actionable insights to maximize your earnings and optimize your driving strategy.",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your data is encrypted and secure. We never share your information with third parties.",
              },
              {
                icon: DollarSign,
                title: "Multi-Platform Support",
                description: "Connect Uber, Lyft, DoorDash, and more. All your earnings in one place.",
              },
              {
                icon: Zap,
                title: "Instant Notifications",
                description: "Get alerts for peak hours, surge pricing, and earning opportunities in your area.",
              },
              {
                icon: Users,
                title: "Driver Community",
                description: "Join thousands of drivers sharing tips, strategies, and success stories.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm border-gold/20 hover:border-gold/50 transition-all hover:glow-gold hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gold/10 rounded-full flex items-center justify-center transition-all hover:bg-gold/20">
                    <feature.icon className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div className="animate-in fade-in slide-in-from-left-8 duration-700">
              <h2 className="text-4xl font-bold mb-6 text-gold glow-gold">Maximize Your Earnings</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our intelligent platform analyzes your driving patterns, market conditions, and historical data to help
                you earn more per hour. Get personalized recommendations on when and where to drive for maximum profit.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  </div>
                  <span className="text-foreground">Track earnings across multiple platforms simultaneously</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  </div>
                  <span className="text-foreground">Identify peak earning hours in your market</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  </div>
                  <span className="text-foreground">Optimize routes and reduce dead miles</span>
                </li>
              </ul>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden border-2 border-gold/20 hover:border-gold/40 transition-all animate-in fade-in slide-in-from-right-8 duration-700">
              <Image
                src="/rideshare-earnings-dashboard-with-charts.jpg"
                alt="Earnings Dashboard"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Reality Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden border-2 border-gold/20 hover:border-gold/40 transition-all order-2 md:order-1 animate-in fade-in slide-in-from-left-8 duration-700">
              <Image src="/driver-using-smartphone-in-car.jpg" alt="Driver Reality" fill className="object-cover" />
            </div>
            <div className="order-1 md:order-2 animate-in fade-in slide-in-from-right-8 duration-700">
              <h2 className="text-4xl font-bold mb-6 text-gold glow-gold">Built by Drivers, for Drivers</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We understand the challenges of gig economy work because we've been there. Boosted Earnings was created
                by an experienced rideshare driver who wanted better tools to track and optimize earnings.
              </p>
              <p className="text-lg text-muted-foreground">
                No more juggling multiple apps, spreadsheets, or guessing when to drive. Get the insights you need to
                make informed decisions and boost your income.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in slide-in-from-left-8 duration-700">
              <h2 className="text-4xl font-bold mb-6 text-gold glow-gold">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join our beta program and be among the first to experience the future of rideshare earnings tracking.
                Limited spots available.
              </p>
              <Button className="bg-gold hover:bg-gold-dark text-black font-semibold text-lg px-8 py-6 glow-gold transition-all hover:scale-[1.05]">
                Join Beta Program
              </Button>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden border-2 border-gold/20 hover:border-gold/40 transition-all animate-in fade-in slide-in-from-right-8 duration-700">
              <Image src="/happy-rideshare-driver-with-smartphone.jpg" alt="Contact" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
