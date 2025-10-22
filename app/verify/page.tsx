"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { auth, isSignInWithEmailLink, signInWithEmailLink } from "@/lib/firebase"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

export default function VerifyPage() {
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const verifyEmailLink = async () => {
      try {
        // Check if the current URL is a sign-in link
        if (!isSignInWithEmailLink(auth, window.location.href)) {
          setStatus("error")
          setMessage("Invalid or expired link. Please request a new sign-in link.")
          return
        }

        // Get the email from local storage
        let email = window.localStorage.getItem("emailForSignIn")

        // If email is not in local storage, prompt user to enter it
        if (!email) {
          email = window.prompt("Please provide your email for confirmation")
        }

        if (!email) {
          setStatus("error")
          setMessage("Email is required to complete sign-in.")
          return
        }

        // Sign in with email link
        await signInWithEmailLink(auth, email, window.location.href)

        // Clear email from local storage
        window.localStorage.removeItem("emailForSignIn")

        setStatus("success")
        setMessage("Successfully signed in! Redirecting to dashboard...")

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } catch (error: any) {
        console.error("Verification error:", error)
        setStatus("error")
        setMessage(error.message || "Failed to verify email link. Please try again.")
      }
    }

    verifyEmailLink()
  }, [router])

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gold text-center flex items-center justify-center gap-2">
                {status === "loading" && <Loader2 className="w-8 h-8 animate-spin" />}
                {status === "success" && <CheckCircle className="w-8 h-8 text-green-500" />}
                {status === "error" && <XCircle className="w-8 h-8 text-red-500" />}
                {status === "loading" && "Verifying..."}
                {status === "success" && "Success!"}
                {status === "error" && "Error"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                {status === "loading" && (
                  <div className="space-y-4">
                    <div className="w-20 h-20 mx-auto bg-gold/10 rounded-full flex items-center justify-center glow-gold animate-pulse">
                      <Loader2 className="w-10 h-10 text-gold animate-spin" />
                    </div>
                    <p className="text-foreground text-lg">Verifying your email link...</p>
                  </div>
                )}

                {status === "success" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <div className="w-20 h-20 mx-auto bg-green-500/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <p className="text-foreground text-lg">{message}</p>
                  </div>
                )}

                {status === "error" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <div className="w-20 h-20 mx-auto bg-red-500/10 rounded-full flex items-center justify-center">
                      <XCircle className="w-10 h-10 text-red-500" />
                    </div>
                    <p className="text-foreground text-lg">{message}</p>
                    <a
                      href="/signup"
                      className="inline-block mt-4 px-6 py-3 bg-gold hover:bg-gold-dark text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 glow-gold"
                    >
                      Request New Link
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
