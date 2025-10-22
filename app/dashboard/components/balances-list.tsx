"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { Wallet, CreditCard, TrendingUp } from "lucide-react"

interface Account {
  accountId: string
  name: string
  type: string
  subtype: string
  mask?: string
  availableBalance?: number
  currentBalance: number
  limit?: number
  currency: string
}

export function BalancesList() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBalances()
  }, [])

  const fetchBalances = async () => {
    try {
      // TODO: Replace with actual user ID from auth
      const userId = "current-user-id"

      const response = await fetch("/api/plaid/balances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })

      const data = await response.json()
      setAccounts(data.accounts || [])
    } catch (error) {
      console.error("Error fetching balances:", error)
    } finally {
      setLoading(false)
    }
  }

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "credit":
        return <CreditCard className="h-4 w-4" />
      case "investment":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Wallet className="h-4 w-4" />
    }
  }

  const getAccountColor = (type: string) => {
    switch (type) {
      case "credit":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "investment":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      default:
        return "bg-gold/10 text-gold border-gold/20"
    }
  }

  if (loading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
        <CardHeader>
          <CardTitle className="text-gold">Account Balances</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (accounts.length === 0) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
        <CardHeader>
          <CardTitle className="text-gold">Account Balances</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">No accounts connected yet. Connect your bank to see balances.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
      <CardHeader>
        <CardTitle className="text-gold">Account Balances</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {accounts.map((account) => (
            <div
              key={account.accountId}
              className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/30 hover:bg-card/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={`${getAccountColor(account.type)}`}>
                  {getAccountIcon(account.type)}
                  <span className="ml-1 capitalize">{account.subtype}</span>
                </Badge>
                <div>
                  <div className="font-medium text-foreground">
                    {account.name} {account.mask && `••${account.mask}`}
                  </div>
                  {account.availableBalance !== undefined && (
                    <div className="text-xs text-muted-foreground">
                      Available: ${account.availableBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-foreground">
                  ${account.currentBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </div>
                {account.limit && (
                  <div className="text-xs text-muted-foreground">
                    Limit: ${account.limit.toLocaleString("en-US", { minimumFractionDigits: 0 })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
