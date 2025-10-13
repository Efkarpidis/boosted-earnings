"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, LinkIcon } from "lucide-react"

export default function ConnectPage() {
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([])
  const [loading, setLoading] = useState<string | null>(null)

  const platforms = [
    { id: "uber", name: "Uber", logo: "🚗", type: "argyle" },
    { id: "lyft", name: "Lyft", logo: "🚙", type: "argyle" },
    { id: "doordash", name: "DoorDash", logo: "🍔", type: "argyle" },
    { id: "ubereats", name: "Uber Eats", logo: "🍕", type: "argyle" },
    { id: "grubhub", name: "Grubhub", logo: "🥡", type: "argyle" },
    { id: "instacart", name: "Instacart", logo: "🛒", type: "argyle" },
    { id: "bank", name: "Bank Account", logo: "🏦", type: "plaid" },
  ]

  const handleConnect = async (platformId: string, type: string) => {
    setLoading(platformId)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In production, this would:
      // 1. Create a link token from Argyle or Plaid
      // 2. Open the respective SDK
      // 3. Handle the callback and store the access token

      setConnectedPlatforms([...connectedPlatforms, platformId])
    } catch (error) {
      console.error("[v0] Connection error:", error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Connect Your Accounts</h1>
          <p className="text-muted-foreground">
            Link your gig platform accounts to automatically track your earnings and get personalized insights.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {platforms.map((platform) => {
            const isConnected = connectedPlatforms.includes(platform.id)
            const isLoading = loading === platform.id

            return (
              <Card key={platform.id} className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-2xl">
                        {platform.logo}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{platform.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {platform.type === "argyle" ? "Earnings platform" : "Bank account"}
                        </CardDescription>
                      </div>
                    </div>
                    {isConnected && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {isConnected ? (
                    <div className="space-y-2">
                      <div className="rounded-lg bg-primary/10 p-3 text-sm text-primary">✓ Connected and syncing</div>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        Disconnect
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => handleConnect(platform.id, platform.type)}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        "Connecting..."
                      ) : (
                        <>
                          <LinkIcon className="mr-2 h-4 w-4" />
                          Connect {platform.name}
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="mt-8 border-border bg-card">
          <CardHeader>
            <CardTitle>Why Connect Your Accounts?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>Automatic earnings tracking across all platforms</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>Real-time income updates and notifications</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>Detailed analytics and performance insights</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>Tax-ready reports and mileage tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>Bank-level security with 256-bit encryption</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
