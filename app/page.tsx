"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Shield, BarChart3, Zap, DollarSign, Clock } from "lucide-react"
import { countries, statesByCountry, citiesByState } from "@/lib/location-data"

export default function HomePage() {
  const [email, setEmail] = useState("")
  const [country, setCountry] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactMessage, setContactMessage] = useState("")

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Email signup:", { email, country, state, city })
    // TODO: Add email submission logic
    alert("Thank you for your interest! We'll be in touch soon.")
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Contact form:", { contactEmail, contactMessage })
    // TODO: Add contact form submission logic
    alert("Thank you for reaching out! We'll get back to you soon.")
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gold-dark/20 bg-gradient-to-b from-black via-black to-black/95">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold leading-tight text-white glow-gold md:text-6xl lg:text-7xl">
              Elevate Your Rideshare Experience
            </h1>
            <p className="mb-8 text-xl text-gold md:text-2xl">Designed by a driver, for the driver.</p>
            <p className="mb-12 text-lg text-muted-foreground">
              Track your earnings, optimize your routes, and maximize your income with our comprehensive rideshare
              dashboard.
            </p>

            {/* Email Signup Form */}
            <form onSubmit={handleEmailSubmit} className="mx-auto max-w-2xl">
              <Card className="border-gold-dark/30 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-gold">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-gold-dark/50 bg-black/50 text-white placeholder:text-muted-foreground focus:border-gold"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <Label htmlFor="country" className="text-gold">
                          Country
                        </Label>
                        <Select value={country} onValueChange={setCountry} required>
                          <SelectTrigger className="border-gold-dark/50 bg-black/50 text-white">
                            <SelectValue placeholder="Select country" />
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

                      <div>
                        <Label htmlFor="state" className="text-gold">
                          State/Province
                        </Label>
                        <Select value={state} onValueChange={setState} disabled={!country} required>
                          <SelectTrigger className="border-gold-dark/50 bg-black/50 text-white">
                            <SelectValue placeholder="Select state" />
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
                      </div>

                      <div>
                        <Label htmlFor="city" className="text-gold">
                          City
                        </Label>
                        <Select value={city} onValueChange={setCity} disabled={!state} required>
                          <SelectTrigger className="border-gold-dark/50 bg-black/50 text-white">
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            {state &&
                              citiesByState[state]?.map((c) => (
                                <SelectItem key={c} value={c}>
                                  {c}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-gold text-black hover:bg-gold-dark">
                      Get Early Access
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-b border-gold-dark/20 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-gold glow-gold">Powerful Features</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-gold-dark/30 bg-card/50 backdrop-blur transition-all hover:border-gold hover:shadow-lg hover:shadow-gold/20">
              <CardContent className="p-6">
                <TrendingUp className="mb-4 h-12 w-12 text-gold" />
                <h3 className="mb-2 text-xl font-semibold text-white">Real-Time Earnings Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor your earnings across multiple platforms in real-time with detailed breakdowns.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gold-dark/30 bg-card/50 backdrop-blur transition-all hover:border-gold hover:shadow-lg hover:shadow-gold/20">
              <CardContent className="p-6">
                <BarChart3 className="mb-4 h-12 w-12 text-gold" />
                <h3 className="mb-2 text-xl font-semibold text-white">Advanced Analytics</h3>
                <p className="text-muted-foreground">
                  Get insights into your performance with comprehensive charts and data visualization.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gold-dark/30 bg-card/50 backdrop-blur transition-all hover:border-gold hover:shadow-lg hover:shadow-gold/20">
              <CardContent className="p-6">
                <Shield className="mb-4 h-12 w-12 text-gold" />
                <h3 className="mb-2 text-xl font-semibold text-white">Secure Data Protection</h3>
                <p className="text-muted-foreground">
                  Your data is encrypted and protected with bank-level security standards.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gold-dark/30 bg-card/50 backdrop-blur transition-all hover:border-gold hover:shadow-lg hover:shadow-gold/20">
              <CardContent className="p-6">
                <Zap className="mb-4 h-12 w-12 text-gold" />
                <h3 className="mb-2 text-xl font-semibold text-white">Multi-Platform Support</h3>
                <p className="text-muted-foreground">
                  Connect Uber, Lyft, DoorDash, and more - all in one unified dashboard.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gold-dark/30 bg-card/50 backdrop-blur transition-all hover:border-gold hover:shadow-lg hover:shadow-gold/20">
              <CardContent className="p-6">
                <DollarSign className="mb-4 h-12 w-12 text-gold" />
                <h3 className="mb-2 text-xl font-semibold text-white">Expense Tracking</h3>
                <p className="text-muted-foreground">
                  Track gas, maintenance, and other expenses to calculate your true profit.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gold-dark/30 bg-card/50 backdrop-blur transition-all hover:border-gold hover:shadow-lg hover:shadow-gold/20">
              <CardContent className="p-6">
                <Clock className="mb-4 h-12 w-12 text-gold" />
                <h3 className="mb-2 text-xl font-semibold text-white">Time Optimization</h3>
                <p className="text-muted-foreground">
                  Identify peak hours and optimal routes to maximize your hourly earnings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Earnings Reality Section */}
      <section className="border-b border-gold-dark/20 py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h2 className="mb-6 text-4xl font-bold text-gold glow-gold">The Reality of Rideshare Earnings</h2>
              <p className="mb-4 text-lg text-muted-foreground">
                Most drivers don't realize how much they're actually making after expenses. Our platform gives you the
                complete picture.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2 text-gold">✓</span>
                  <span>Track gross earnings vs. net profit</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gold">✓</span>
                  <span>Calculate true hourly rate including expenses</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gold">✓</span>
                  <span>Identify hidden costs eating into your profits</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gold">✓</span>
                  <span>Make data-driven decisions to boost earnings</span>
                </li>
              </ul>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-lg border border-gold-dark/30">
              <Image src="/rideshare-driver-earnings-dashboard-with-charts.jpg" alt="Earnings Dashboard" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Maximize Earnings Section */}
      <section className="border-b border-gold-dark/20 py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-[400px] overflow-hidden rounded-lg border border-gold-dark/30">
              <Image src="/driver-using-smartphone-app-in-car-at-night.jpg" alt="Driver using app" fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="mb-6 text-4xl font-bold text-gold glow-gold">Maximize Your Earnings</h2>
              <p className="mb-4 text-lg text-muted-foreground">
                Our intelligent analytics help you work smarter, not harder. Discover the best times to drive, optimal
                routes, and strategies to increase your income.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2 text-gold">✓</span>
                  <span>Peak hour analysis and recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gold">✓</span>
                  <span>Route optimization for maximum efficiency</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gold">✓</span>
                  <span>Platform comparison to choose the best rides</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gold">✓</span>
                  <span>Goal setting and progress tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <h2 className="mb-6 text-4xl font-bold text-gold glow-gold">Get in Touch</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Have questions or feedback? We'd love to hear from you. Our team is here to help you succeed.
              </p>
              <div className="relative h-[300px] overflow-hidden rounded-lg border border-gold-dark/30">
                <Image src="/professional-customer-support-team.jpg" alt="Contact us" fill className="object-cover" />
              </div>
            </div>
            <div>
              <form onSubmit={handleContactSubmit}>
                <Card className="border-gold-dark/30 bg-card/50 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="contact-email" className="text-gold">
                          Email Address
                        </Label>
                        <Input
                          id="contact-email"
                          type="email"
                          placeholder="your@email.com"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          required
                          className="border-gold-dark/50 bg-black/50 text-white placeholder:text-muted-foreground focus:border-gold"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-gold">
                          Message
                        </Label>
                        <textarea
                          id="message"
                          rows={6}
                          placeholder="Tell us what's on your mind..."
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          required
                          className="w-full rounded-md border border-gold-dark/50 bg-black/50 px-3 py-2 text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>

                      <Button type="submit" className="w-full bg-gold text-black hover:bg-gold-dark">
                        Send Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
