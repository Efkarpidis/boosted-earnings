"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Activity, AlertCircle, CheckCircle2 } from "lucide-react"

interface DebugPanelProps {
  userId?: string
}

export function DebugPanel({ userId }: DebugPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [argyleHealth, setArgyleHealth] = useState<any>(null)
  const [plaidHealth, setPlaidHealth] = useState<any>(null)
  const [lastApiCall, setLastApiCall] = useState<any>(null)
  const [connections, setConnections] = useState<any[]>([])

  useEffect(() => {
    const originalFetch = window.fetch
    window.fetch = async (...args) => {
      const [url, options] = args
      const startTime = Date.now()

      try {
        const response = await originalFetch(...args)
        const duration = Date.now() - startTime

        // Only log our API calls
        if (typeof url === "string" && url.startsWith("/api/")) {
          setLastApiCall({
            url,
            method: options?.method || "GET",
            status: response.status,
            duration,
            timestamp: new Date().toISOString(),
            ok: response.ok,
          })
        }

        return response
      } catch (error: any) {
        const duration = Date.now() - startTime
        if (typeof url === "string" && url.startsWith("/api/")) {
          setLastApiCall({
            url,
            method: options?.method || "GET",
            status: 0,
            duration,
            timestamp: new Date().toISOString(),
            ok: false,
            error: error.message,
          })
        }
        throw error
      }
    }

    return () => {
      window.fetch = originalFetch
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const fetchHealth = async () => {
      try {
        const [argyleRes, plaidRes] = await Promise.all([fetch("/api/health/argyle"), fetch("/api/health/plaid")])
        setArgyleHealth(await argyleRes.json())
        setPlaidHealth(await plaidRes.json())
      } catch (error) {
        console.error("[Debug Panel] Error fetching health:", error)
      }
    }

    const fetchConnections = async () => {
      if (!userId) return
      try {
        const res = await fetch(`/api/argyle/connections?userId=${userId}`)
        const data = await res.json()
        setConnections(data.connections || [])
      } catch (error) {
        console.error("[Debug Panel] Error fetching connections:", error)
      }
    }

    fetchHealth()
    fetchConnections()
  }, [isOpen, userId])

  // Only show in development
  if (process.env.NODE_ENV === "production") {
    return null
  }

  const handleRefresh = () => {
    // Trigger re-fetch by toggling isOpen state
    setIsOpen(false)
    setTimeout(() => setIsOpen(true), 0)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Card className="bg-card/95 backdrop-blur-sm border-gold/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-gold flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Debug Panel
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="h-6 w-6 p-0">
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </Button>
          </div>
        </CardHeader>

        {isOpen && (
          <CardContent className="space-y-3 text-xs">
            {/* User Info */}
            <div>
              <p className="text-muted-foreground mb-1">User ID:</p>
              <code className="text-foreground bg-background/50 px-2 py-1 rounded">{userId || "Not logged in"}</code>
            </div>

            {/* Health Status */}
            <div>
              <p className="text-muted-foreground mb-2">Service Health:</p>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span>Argyle:</span>
                  {argyleHealth ? (
                    <Badge variant={argyleHealth.ok ? "default" : "destructive"} className="text-xs">
                      {argyleHealth.ok ? (
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                      ) : (
                        <AlertCircle className="w-3 h-3 mr-1" />
                      )}
                      {argyleHealth.mockMode ? "Mock" : argyleHealth.ok ? "OK" : "Error"}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      Loading...
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span>Plaid:</span>
                  {plaidHealth ? (
                    <Badge variant={plaidHealth.ok ? "default" : "destructive"} className="text-xs">
                      {plaidHealth.ok ? (
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                      ) : (
                        <AlertCircle className="w-3 h-3 mr-1" />
                      )}
                      {plaidHealth.ok ? "OK" : "Error"}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      Loading...
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Connections */}
            <div>
              <p className="text-muted-foreground mb-1">Connected Accounts:</p>
              {connections.length > 0 ? (
                <div className="space-y-1">
                  {connections.map((conn, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span>{conn.platform}</span>
                      <Badge variant="outline" className="text-xs">
                        {conn.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-xs">No connections</p>
              )}
            </div>

            {/* Last API Call */}
            {lastApiCall && (
              <div>
                <p className="text-muted-foreground mb-1">Last API Call:</p>
                <div className="bg-background/50 p-2 rounded space-y-1">
                  <div className="flex items-center justify-between">
                    <code className="text-xs">
                      {lastApiCall.method} {lastApiCall.url}
                    </code>
                    <Badge variant={lastApiCall.ok ? "default" : "destructive"} className="text-xs">
                      {lastApiCall.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{lastApiCall.duration}ms</span>
                    <span>{new Date(lastApiCall.timestamp).toLocaleTimeString()}</span>
                  </div>
                  {lastApiCall.error && <p className="text-xs text-red-500 mt-1">{lastApiCall.error}</p>}
                </div>
              </div>
            )}

            {/* Refresh Button */}
            <Button onClick={handleRefresh} size="sm" variant="outline" className="w-full text-xs bg-transparent">
              Refresh Debug Info
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
