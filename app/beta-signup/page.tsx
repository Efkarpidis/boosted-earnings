"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Rocket, TrendingUp, Shield, Zap } from "lucide-react"
import { countries, statesByCountry, citiesByState } from "@/lib/location-data"
import { db } from "@/lib/firebase"
import { collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore"

const COOLDOWN_MINUTES = 5

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
  const [submitMessage, setSubmitMessage] = useState("")
  const [submitError, setSubmitError] = useState("")

  const platformOptions = [
    { value: "uber", label: "Uber" },
    { value: "lyft", label: "Lyft" },
    { value: "doordash", label: "DoorDash" },
    { value: "ubereats", label: "Uber Eats" },
    { value: "grubhub", label: "Grubhub" },
    { value: "instacart", label: "Instacart" },
  ]

  const handlePlatformToggle = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }))
  }

  const checkExistingEmail = async (email: string): Promise<boolean> => {
    try {
      const submissionsRef = collection(db, "submissions")
      const q = query(submissionsRef, where("email", "==", email))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const lastSubmission = querySnapshot.docs[0].data()
        const lastSubmitTime = lastSubmission.timestamp?.toDate()

        if (lastSubmitTime) {
          const timeDiff = Date.now() - lastSubmitTime.getTime()
          const minutesDiff = timeDiff / (1000 * 60)

          if (minutesDiff < COOLDOWN_MINUTES) {
            const remainingMinutes = Math.ceil(COOLDOWN_MINUTES - minutesDiff)
            setSubmitError(
              `Please wait ${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""} before submitting again.`,
            )
            return true
          }
        }
      }
      return false
    } catch (error) {
      console.error("[v0] Error checking existing email:", error)
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")
    setSubmitMessage("")

    try {
      // Validate platforms
      if (formData.platforms.length === 0) {
        setSubmitError("Please select at least one platform.")
        setIsSubmitting(false)
        return
      }

      // Check for existing email with cooldown
      const emailExists = await checkExistingEmail(formData.email)
      if (emailExists) {
        setIsSubmitting(false)
        return
      }

      // Prepare submission data
      const submissionData = {
        email: formData.email,
        country: formData.country,
        state: formData.state,
        city: formData.city || formData.manualCity,
        platforms: formData.platforms,
        timestamp: Timestamp.now(),
        status: "pending",
      }

      console.log("[v0] Submitting to Firestore:", submissionData)

      // Submit to Firestore
      const docRef = await addDoc(collection(db, "submissions"), submissionData)

      console.log("[v0] Document written with ID:", docRef.id)

      setSubmitMessage(
        "Thank you for signing up! You've been added to our beta testing list. We'll contact you soon with next steps.",
      )

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
      console.error("[v0] Error submitting form:", error)
      setSubmitError("An error occurred while submitting your application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gold-dark/20 bg-gradient-to-b from-black via-black to-black/95">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center">
              <Rocket className="h-16 w-16 text-gold" />
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-tight text-white glow-gold md:text-6xl">
              Become a Beta Tester
            </h1>
            <p className="mb-8 text-xl text-gold">
              Be among the first to experience the future of rideshare earnings tracking
            </p>
            <p className="text-lg text-muted-foreground">
              Join our exclusive beta program and help shape the platform that will revolutionize how drivers manage
              their earnings.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-gold-dark/20 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gold">Beta Tester Benefits</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-gold-dark/30 bg-card/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <TrendingUp className="mx-auto mb-4 h-12 w-12 text-gold" />
                <h3 className="mb-2 text-xl font-semibold text-white">Early Access</h3>
                <p className="text-muted-foreground">Get exclusive access to all features before the public launch</p>
              </CardContent>
            </Card>

            <Card className="border-gold-dark/30 bg-card/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <Shield className="mx-auto mb-4 h-12 w-12 text-gold" />
                <h3 className="mb-2 text-xl font-semibold text-white">Lifetime Discount</h3>
                <p className="text-muted-foreground">Receive a special lifetime discount on your subscription</p>
              </CardContent>
            </Card>

            <Card className="border-gold-dark/30 bg-card/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <Zap className="mx-auto mb-4 h-12 w-12 text-gold" />
                <h3 className="mb-2 text-xl font-semibold text-white">Shape the Product</h3>
                <p className="text-muted-foreground">Your feedback will directly influence our development roadmap</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Beta Signup Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <Card className="border-gold-dark/30 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-center text-2xl text-gold">Beta Application Form</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-gold">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="border-gold-dark/50 bg-black/50 text-white placeholder:text-muted-foreground focus:border-gold"
                    />
                  </div>

                  {/* Location Fields */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label htmlFor="country" className="text-gold">
                        Country *
                      </Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => setFormData({ ...formData, country: value, state: "", city: "" })}
                        required
                      >
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
                        State/Province *
                      </Label>
                      <Select
                        value={formData.state}
                        onValueChange={(value) => setFormData({ ...formData, state: value, city: "" })}
                        disabled={!formData.country}
                        required
                      >
                        <SelectTrigger className="border-gold-dark/50 bg-black/50 text-white">
                          <SelectValue placeholder="Select state" />
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

                    <div>
                      <Label htmlFor="city" className="text-gold">
                        City *
                      </Label>
                      <Select
                        value={formData.city}
                        onValueChange={(value) => setFormData({ ...formData, city: value })}
                        disabled={!formData.state}
                      >
                        <SelectTrigger className="border-gold-dark/50 bg-black/50 text-white">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.state &&
                            citiesByState[formData.state]?.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Manual City Input */}
                  <div>
                    <Label htmlFor="manual-city" className="text-gold">
                      Or enter your city manually
                    </Label>
                    <Input
                      id="manual-city"
                      type="text"
                      placeholder="Enter your city"
                      value={formData.manualCity}
                      onChange={(e) => setFormData({ ...formData, manualCity: e.target.value })}
                      className="border-gold-dark/50 bg-black/50 text-white placeholder:text-muted-foreground focus:border-gold"
                    />
                  </div>

                  {/* Platform Selection */}
                  <div>
                    <Label className="mb-3 block text-gold">Which platforms do you drive for? *</Label>
                    <div className="grid gap-3 md:grid-cols-2">
                      {platformOptions.map((platform) => (
                        <div key={platform.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={platform.value}
                            checked={formData.platforms.includes(platform.value)}
                            onCheckedChange={() => handlePlatformToggle(platform.value)}
                            className="border-gold data-[state=checked]:bg-gold data-[state=checked]:text-black"
                          />
                          <label
                            htmlFor={platform.value}
                            className="cursor-pointer text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {platform.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Success Message */}
                  {submitMessage && (
                    <div className="rounded-md border border-gold bg-gold/10 p-4">
                      <p className="text-sm text-gold">{submitMessage}</p>
                    </div>
                  )}

                  {/* Error Message */}
                  {submitError && (
                    <div className="rounded-md border border-destructive bg-destructive/10 p-4">
                      <p className="text-sm text-destructive">{submitError}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold text-black hover:bg-gold-dark disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Join Beta Program"}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    By submitting this form, you agree to receive updates about our beta program and product launches.
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
