"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { countries, statesByCountry, citiesByState } from "@/lib/location-data"
import { checkExistingEmail, db, addDoc, collection } from "@/lib/firebase"
import { Zap, Shield, TrendingUp, CheckCircle2 } from "lucide-react"

export default function BetaSignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    country: "",
    state: "",
    city: "",
    manualCity: "",
    platforms: [] as string[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState("")

  const platformOptions = [
    { value: "uber", label: "Uber" },
    { value: "lyft", label: "Lyft" },
    { value: "doordash", label: "DoorDash" },
    { value: "ubereats", label: "Uber Eats" },
    { value: "grubhub", label: "Grubhub" },
    { value: "instacart", label: "Instacart" },
  ]

  const togglePlatform = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.platforms.length === 0) {
      setError("Please select at least one platform.")
      return
    }

    setIsSubmitting(true)

    try {
      const cooldownMessage = await checkExistingEmail(formData.email)
      if (cooldownMessage) {
        setError(cooldownMessage)
        setIsSubmitting(false)
        return
      }

      // Submit to Firestore
      await addDoc(collection(db, "submissions"), {
        email: formData.email,
        country: formData.country,
        state: formData.state,
        city: formData.city || formData.manualCity,
        platforms: formData.platforms,
        timestamp: new Date().toISOString(),
      })

      setSubmitSuccess(true)

      // Reset form
      setFormData({
        email: "",
        country: "",
        state: "",
        city: "",
        manualCity: "",
        platforms: [],
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      setError("An error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance animate-in fade-in slide-in-from-bottom-4 duration-700">
            Become a <span className="text-gold glow-gold">Beta Tester</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            Join the exclusive group of drivers shaping the future of earnings tracking
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Zap,
                title: "Early Access",
                description: "Be the first to experience our revolutionary platform",
              },
              {
                icon: Shield,
                title: "Exclusive Benefits",
                description: "Lifetime discount and premium features for beta testers",
              },
              {
                icon: TrendingUp,
                title: "Shape the Product",
                description: "Your feedback directly influences our development",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm border-gold/20 hover:border-gold/40 transition-all hover:glow-gold animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gold/10 rounded-full flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="mb-8 p-6 bg-gold/10 border-2 border-gold rounded-lg flex items-start gap-4 animate-in fade-in slide-in-from-top-4 glow-gold">
              <CheckCircle2 className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gold mb-2">Welcome to the Beta Program!</h3>
                <p className="text-foreground">
                  Thank you for signing up. We'll send you an email with next steps and early access details within 24
                  hours.
                </p>
              </div>
            </div>
          )}

          {/* Beta Signup Form */}
          <Card className="bg-card/50 backdrop-blur-sm border-2 border-gold/20 hover:border-gold/30 transition-all animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-gold text-center glow-gold">Join the Beta Program</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Email Address *</label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background border-2 border-gold/30 focus:border-gold text-foreground transition-all"
                    required
                  />
                </div>

                {/* Location Selects */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Country *</label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => setFormData({ ...formData, country: value, state: "", city: "" })}
                    >
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

                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">State/Province *</label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => setFormData({ ...formData, state: value, city: "" })}
                      disabled={!formData.country}
                    >
                      <SelectTrigger className="bg-background border-2 border-gold/30 focus:border-gold text-foreground transition-all">
                        <SelectValue placeholder="Select State/Province" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.country &&
                          statesByCountry[formData.country]?.map((s) => (
                            <SelectItem key={s.value} value={s.value}>
                              {s.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">City</label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) => setFormData({ ...formData, city: value })}
                      disabled={!formData.state}
                    >
                      <SelectTrigger className="bg-background border-2 border-gold/30 focus:border-gold text-foreground transition-all">
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.state &&
                          citiesByState[formData.state]?.map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              {c.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Or Enter City Manually</label>
                    <Input
                      type="text"
                      placeholder="Enter your city"
                      value={formData.manualCity}
                      onChange={(e) => setFormData({ ...formData, manualCity: e.target.value })}
                      className="bg-background border-2 border-gold/30 focus:border-gold text-foreground transition-all"
                    />
                  </div>
                </div>

                {/* Platform Selection */}
                <div>
                  <label className="block text-sm font-medium mb-3 text-foreground">
                    Which platforms do you drive for? * (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {platformOptions.map((platform) => (
                      <div
                        key={platform.value}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.platforms.includes(platform.value)
                            ? "border-gold bg-gold/10 glow-gold"
                            : "border-gold/30 hover:border-gold/50"
                        }`}
                        onClick={() => togglePlatform(platform.value)}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={formData.platforms.includes(platform.value)}
                            onCheckedChange={() => togglePlatform(platform.value)}
                            className="border-2 border-gold data-[state=checked]:bg-gold data-[state=checked]:border-gold data-[state=checked]:text-black"
                          />
                          <span className="text-foreground font-medium">{platform.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-destructive/10 border-2 border-destructive/50 rounded-lg text-destructive-foreground animate-in fade-in slide-in-from-top-2">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-gold-dark text-black font-semibold text-lg py-6 glow-gold disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02]"
                >
                  {isSubmitting ? "Submitting..." : "Join Beta Program"}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By signing up, you agree to receive updates about the beta program and product launches.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
