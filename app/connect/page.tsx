"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { LinkIcon, CheckCircle2, Zap, Shield, TrendingUp } from "lucide-react"
import { ArgyleLink } from "./argyle-link"

export default function ConnectPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [showLink, setShowLink] = useState(false)
  const [userToken, setUserToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleConnect = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to connect your accounts.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/argyle/user-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.uid }),
      })

      const data = await response.json()

      if (data.mock || data.isMockMode) {
        toast({
          title: "Demo Mode",
          description: "Opening Argyle Link in demo mode. Configure Argyle credentials for real connections.",
        })
      }

      setUserToken(data.userToken)
      setShowLink(true)
    } catch (error: any) {
      console.error("Error creating user token:", error)
      toast({
        title: "Connection Error",
        description: error.message || "Failed to initialize Argyle Link.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSuccess = async (code: string, metadata: any) => {
    try {
      const response = await fetch("/api/argyle/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          userId: user?.uid,
          platform: metadata.platform || "Uber",
        }),
      })

      const data = await response.json()

      toast({
        title: "Success!",
        description: `Connected to ${metadata.platform || "your rideshare account"}. Syncing data...`,
      })

      // Trigger initial sync
      await fetch("/api/argyle/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.uid }),
      })

      router.push("/dashboard")
    } catch (error: any) {
      console.error("Error exchanging code:", error)
      toast({
        title: "Connection Error",
        description: error.message || "Failed to complete connection.",
        variant: "destructive",
      })
    }
  }

  const handleClose = () => {
    setShowLink(false)
    setUserToken(null)
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4">Connect Your Rideshare Accounts</h1>
            <p className="text-xl text-muted-foreground">
              Securely link your Uber, Lyft, DoorDash, and Uber Eats accounts to track earnings in real-time
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Bank-Level Security</h3>
                <p className="text-sm text-muted-foreground">
                  Your credentials are encrypted and never stored on our servers
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Real-Time Sync</h3>
                <p className="text-sm text-muted-foreground">Automatic daily updates keep your earnings data fresh</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Smart Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Track performance across platforms and optimize your earnings
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main CTA Card */}
          <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
            <CardHeader>
              <CardTitle className="text-2xl text-gold flex items-center gap-2">
                <LinkIcon className="w-6 h-6" />
                Get Started
              </CardTitle>
              <CardDescription>Connect your accounts in under 2 minutes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Supported Platforms</p>
                    <p className="text-sm text-muted-foreground">Uber, Lyft, DoorDash, Uber Eats, and more</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Instant Access</p>
                    <p className="text-sm text-muted-foreground">
                      View your earnings, trips, and performance metrics immediately
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Always in Control</p>
                    <p className="text-sm text-muted-foreground">Disconnect anytime from your dashboard settings</p>
                  </div>
                </div>

                <Button
                  onClick={handleConnect}
                  disabled={loading}
                  size="lg"
                  className="w-full bg-gold hover:bg-gold-dark text-black font-semibold text-lg py-6 mt-6"
                >
                  {loading ? "Initializing..." : "Connect Your Accounts"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Argyle Link Modal */}
          {showLink && userToken && (
            <ArgyleLink userToken={userToken} onSuccess={handleSuccess} onClose={handleClose} />
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
