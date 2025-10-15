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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { TrendingUp, Users, Target, Rocket } from "lucide-react"

export default function InvestPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    investorType: "regular",
    heardFrom: "",
    heardFromOther: "",
    disclaimerAccepted: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.disclaimerAccepted) {
      alert("Please accept the disclaimer to continue.")
      return
    }

    setIsSubmitting(true)
    console.log("[v0] Investment inquiry:", formData)

    // TODO: Add actual submission logic (Firebase/API)
    setTimeout(() => {
      setSubmitMessage("Thank you for your interest! Our team will contact you within 48 hours.")
      setIsSubmitting(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        investorType: "regular",
        heardFrom: "",
        heardFromOther: "",
        disclaimerAccepted: false,
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section with Background */}
      <section className="relative overflow-hidden border-b border-gold-dark/20">
        <div className="absolute inset-0">
          <Image
            src="/investment-opportunity-business-growth.jpg"
            alt="Investment Opportunity"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black" />
        </div>
        <div className="container relative mx-auto px-4 py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold leading-tight text-white glow-gold md:text-6xl">
              Invest in the Future of Gig-Economy Technology
            </h1>
            <p className="mb-8 text-xl text-gold">
              Join us in revolutionizing how millions of drivers manage their earnings
            </p>
            <p className="text-lg text-muted-foreground">
              Boosted Earnings is seeking strategic investors to scale our platform and empower gig workers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Investment Opportunity Features */}
      <section className="border-b border-gold-dark/20 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-gold glow-gold">Why Invest in Boosted Earnings?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-gold-dark/30 bg-card/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <TrendingUp className="mx-auto mb-4 h-12 w-12 text-gold" />
                <h3 className="mb-2 text-xl font-semibold text-white">Growing Market</h3>
                <p className="text-muted-foreground">
                  The gig economy is projected to reach $455B by 2023, with millions of active drivers
                </p>
              </CardContent>
            </Card>

            <Card className="border-gold-dark/30 bg-card/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <Users className="mx-auto mb-4 h-12 w-12 text-gold" />
                <h3 className="mb-2 text-xl font-semibold text-white">Proven Demand</h3>
                <p className="text-muted-foreground">
                  Built by a driver for drivers - solving real pain points with validated user feedback
                </p>
              </CardContent>
            </Card>

            <Card className="border-gold-dark/30 bg-card/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <Target className="mx-auto mb-4 h-12 w-12 text-gold" />
                <h3 className="mb-2 text-xl font-semibold text-white">Clear Revenue Model</h3>
                <p className="text-muted-foreground">
                  Subscription-based SaaS with multiple revenue streams and high retention potential
                </p>
              </CardContent>
            </Card>

            <Card className="border-gold-dark/30 bg-card/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <Rocket className="mx-auto mb-4 h-12 w-12 text-gold" />
                <h3 className="mb-2 text-xl font-semibold text-white">Scalable Technology</h3>
                <p className="text-muted-foreground">
                  Modern tech stack built for rapid scaling across multiple gig platforms
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Investment Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <Card className="border-gold-dark/30 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-center text-2xl text-gold">Investment Inquiry Form</CardTitle>
                <p className="text-center text-sm text-muted-foreground">
                  Fill out the form below and our team will reach out to discuss investment opportunities
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <Label htmlFor="name" className="text-gold">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="border-gold-dark/50 bg-black/50 text-white placeholder:text-muted-foreground focus:border-gold"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-gold">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="border-gold-dark/50 bg-black/50 text-white placeholder:text-muted-foreground focus:border-gold"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="text-gold">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="border-gold-dark/50 bg-black/50 text-white placeholder:text-muted-foreground focus:border-gold"
                    />
                  </div>

                  {/* Investor Type Toggle */}
                  <div>
                    <Label className="mb-3 block text-gold">Investor Type *</Label>
                    <div className="grid gap-4 md:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, investorType: "regular" })}
                        className={`rounded-lg border p-4 text-left transition-all ${
                          formData.investorType === "regular"
                            ? "border-gold bg-gold/10"
                            : "border-gold-dark/50 bg-black/50 hover:border-gold"
                        }`}
                      >
                        <h4 className="mb-1 font-semibold text-white">Regular Investor</h4>
                        <p className="text-sm text-muted-foreground">Individual or institutional investor</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, investorType: "accredited" })}
                        className={`rounded-lg border p-4 text-left transition-all ${
                          formData.investorType === "accredited"
                            ? "border-gold bg-gold/10"
                            : "border-gold-dark/50 bg-black/50 hover:border-gold"
                        }`}
                      >
                        <h4 className="mb-1 font-semibold text-white">Accredited Investor</h4>
                        <p className="text-sm text-muted-foreground">Meets SEC accreditation requirements</p>
                      </button>
                    </div>
                  </div>

                  {/* How did you hear about us */}
                  <div>
                    <Label htmlFor="heard-from" className="text-gold">
                      How did you hear about us? *
                    </Label>
                    <Select
                      value={formData.heardFrom}
                      onValueChange={(value) => setFormData({ ...formData, heardFrom: value })}
                      required
                    >
                      <SelectTrigger className="border-gold-dark/50 bg-black/50 text-white">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="news">News Article</SelectItem>
                        <SelectItem value="search">Search Engine</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Other source textarea */}
                  {formData.heardFrom === "other" && (
                    <div>
                      <Label htmlFor="heard-from-other" className="text-gold">
                        Please specify
                      </Label>
                      <textarea
                        id="heard-from-other"
                        rows={3}
                        placeholder="Tell us how you heard about us..."
                        value={formData.heardFromOther}
                        onChange={(e) => setFormData({ ...formData, heardFromOther: e.target.value })}
                        className="w-full rounded-md border border-gold-dark/50 bg-black/50 px-3 py-2 text-white placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                  )}

                  {/* Disclaimer Checkbox */}
                  <div className="flex items-start space-x-3 rounded-lg border border-gold-dark/50 bg-black/30 p-4">
                    <Checkbox
                      id="disclaimer"
                      checked={formData.disclaimerAccepted}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, disclaimerAccepted: checked as boolean })
                      }
                      className="mt-1 border-gold data-[state=checked]:bg-gold data-[state=checked]:text-black"
                    />
                    <label htmlFor="disclaimer" className="cursor-pointer text-sm text-muted-foreground">
                      I understand that this is an inquiry form and does not constitute an offer to sell securities. I
                      acknowledge that all investment opportunities are subject to due diligence and regulatory
                      compliance. *
                    </label>
                  </div>

                  {/* Success Message */}
                  {submitMessage && (
                    <div className="rounded-md border border-gold bg-gold/10 p-4">
                      <p className="text-sm text-gold">{submitMessage}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold text-black hover:bg-gold-dark disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Investment Inquiry"}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    All information provided will be kept confidential and used solely for investment evaluation
                    purposes.
                  </p>
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
