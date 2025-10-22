"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { auth, sendSignInLinkToEmail } from "@/lib/firebase"
import { Mail, Sparkles } from "lucide-react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setIsLoading(true)

    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/verify`,
        handleCodeInApp: true,
      }

      await sendSignInLinkToEmail(auth, email, actionCodeSettings)

      window.localStorage.setItem("emailForSignIn", email)

      setSuccess(true)
    } catch (error: any) {
      console.error("Signup error:", error)
      setError(error.message || "Failed to send magic link. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black">
        <Header />

        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-md">
            <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gold text-center flex items-center justify-center gap-2">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                  Check Your Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-gold/10 rounded-full flex items-center justify-center glow-gold">
                    <Mail className="w-10 h-10 text-gold" />
                  </div>
                  <p className="text-foreground text-lg">
                    We've sent a magic link to <span className="text-gold font-semibold">{email}</span>
                  </p>
                  <p className="text-muted-foreground">
                    Click the link in your email to complete your sign up. The link will expire in 1 hour.
                  </p>
                </div>

                <div className="pt-4 border-t border-gold/20">
                  <p className="text-sm text-muted-foreground text-center">
                    Didn't receive the email?{" "}
                    <button
                      onClick={() => setSuccess(false)}
                      className="text-gold hover:text-gold-dark font-semibold transition-colors"
                    >
                      Try again
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gold text-center flex items-center justify-center gap-2">
                <Sparkles className="w-8 h-8" />
                Passwordless Sign Up
              </CardTitle>
              <p className="text-muted-foreground text-center mt-2">No password needed. We'll send you a magic link.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Email Address</label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background border-2 border-gold/30 focus:border-gold text-foreground transition-all duration-300 glow-gold-subtle"
                    required
                  />
                </div>

                {error && (
                  <div className="p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive-foreground text-sm animate-in fade-in slide-in-from-top-2">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gold hover:bg-gold-dark text-black font-semibold text-lg py-6 glow-gold disabled:opacity-50 transition-all duration-300 hover:scale-105"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⚡</span>
                      Sending magic link...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      Send Magic Link
                    </span>
                  )}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Already have an account?{" "}
                  <Link href="/login" className="text-gold hover:text-gold-dark font-semibold transition-colors">
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
