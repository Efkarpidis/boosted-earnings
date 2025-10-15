"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { TrendingUp, Users, Globe, Zap } from "lucide-react"

export default function InvestPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    investorType: "regular",
    heardFrom: "",
    otherSource: "",
    disclaimer: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Investment form submitted:", formData)
    // Handle form submission
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section with Background */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-black to-gold-dark/10" />
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              Invest in the Future of <span className="text-gold glow-gold">Gig-Economy Technology</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
              Join us in revolutionizing how millions of gig workers track and optimize their earnings
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gold">
            Why Invest in Boosted Earnings?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <Card className="bg-card/50 backdrop-blur-sm border-gold/20 hover:border-gold/50 transition-all hover:glow-gold">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gold/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gold">Growing Market</h3>
                <p className="text-muted-foreground">
                  The gig economy is projected to reach $455B by 2023, with millions of workers needing better tools.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-gold/20 hover:border-gold/50 transition-all hover:glow-gold">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gold/10 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gold">Proven Demand</h3>
                <p className="text-muted-foreground">
                  Thousands of beta users already tracking over $10M in combined earnings on our platform.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-gold/20 hover:border-gold/50 transition-all hover:glow-gold">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gold/10 rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gold">Scalable Platform</h3>
                <p className="text-muted-foreground">
                  Built on modern infrastructure ready to scale to millions of users across multiple markets.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-gold/20 hover:border-gold/50 transition-all hover:glow-gold">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gold/10 rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gold">First-Mover Advantage</h3>
                <p className="text-muted-foreground">
                  Be part of the first comprehensive earnings platform designed specifically for gig workers.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Investment Form */}
          <div className="max-w-3xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-gold text-center">Express Your Interest</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Full Name *</label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-background border-gold/30 focus:border-gold text-foreground"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Email Address *</label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-background border-gold/30 focus:border-gold text-foreground"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Phone Number *</label>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-background border-gold/30 focus:border-gold text-foreground"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Investor Type *</label>
                    <div className="space-y-3">
                      <div
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.investorType === "regular"
                            ? "border-gold bg-gold/10"
                            : "border-gold/30 hover:border-gold/50"
                        }`}
                        onClick={() => setFormData({ ...formData, investorType: "regular" })}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="investorType"
                            value="regular"
                            checked={formData.investorType === "regular"}
                            onChange={(e) => setFormData({ ...formData, investorType: e.target.value })}
                            className="mt-1"
                          />
                          <div>
                            <h4 className="font-semibold text-gold">Regular Investor</h4>
                            <p className="text-sm text-muted-foreground">
                              Individual investors interested in supporting innovative startups
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.investorType === "accredited"
                            ? "border-gold bg-gold/10"
                            : "border-gold/30 hover:border-gold/50"
                        }`}
                        onClick={() => setFormData({ ...formData, investorType: "accredited" })}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="investorType"
                            value="accredited"
                            checked={formData.investorType === "accredited"}
                            onChange={(e) => setFormData({ ...formData, investorType: e.target.value })}
                            className="mt-1"
                          />
                          <div>
                            <h4 className="font-semibold text-gold">Accredited Investor</h4>
                            <p className="text-sm text-muted-foreground">
                              Investors meeting SEC accreditation requirements with higher investment capacity
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">
                      How did you hear about us? *
                    </label>
                    <Select
                      value={formData.heardFrom}
                      onValueChange={(value) => setFormData({ ...formData, heardFrom: value })}
                    >
                      <SelectTrigger className="bg-background border-gold/30 focus:border-gold text-foreground">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="news">News Article</SelectItem>
                        <SelectItem value="search">Search Engine</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.heardFrom === "other" && (
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Please specify</label>
                      <Textarea
                        placeholder="Tell us how you found us..."
                        value={formData.otherSource}
                        onChange={(e) => setFormData({ ...formData, otherSource: e.target.value })}
                        className="bg-background border-gold/30 focus:border-gold text-foreground"
                        rows={3}
                      />
                    </div>
                  )}

                  <div className="flex items-start gap-3 p-4 bg-gold/5 rounded-lg border border-gold/30">
                    <Checkbox
                      id="disclaimer"
                      checked={formData.disclaimer}
                      onCheckedChange={(checked) => setFormData({ ...formData, disclaimer: checked as boolean })}
                      className="mt-1 border-gold data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                    />
                    <label htmlFor="disclaimer" className="text-sm text-muted-foreground cursor-pointer">
                      I understand that this is an expression of interest and not a commitment to invest. I acknowledge
                      that all investments carry risk and I should conduct my own due diligence. I agree to receive
                      information about investment opportunities from Boosted Earnings.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={!formData.disclaimer}
                    className="w-full bg-gold hover:bg-gold-dark text-black font-semibold text-lg py-6 glow-gold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Interest
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
