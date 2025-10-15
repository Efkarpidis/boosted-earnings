"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@/lib/firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { UserPlus } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)

      // Update user profile with name
      await updateProfile(userCredential.user, {
        displayName: formData.name,
      })

      router.push("/dashboard")
    } catch (error: any) {
      console.error("Signup error:", error)
      setError(error.message || "Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gold text-center flex items-center justify-center gap-2">
                <UserPlus className="w-8 h-8" />
                Create Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Full Name</label>
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
                  <label className="block text-sm font-medium mb-2 text-foreground">Email Address</label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background border-gold/30 focus:border-gold text-foreground"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Password</label>
                  <Input
                    type="password"
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="bg-background border-gold/30 focus:border-gold text-foreground"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Confirm Password</label>
                  <Input
                    type="password"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="bg-background border-gold/30 focus:border-gold text-foreground"
                    required
                  />
                </div>

                {error && (
                  <div className="p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive-foreground text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gold hover:bg-gold-dark text-black font-semibold text-lg py-6 glow-gold disabled:opacity-50"
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Already have an account?{" "}
                  <Link href="/login" className="text-gold hover:text-gold-dark font-semibold">
                    Sign In
                  </Link>
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
