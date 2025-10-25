"use client"

import { useEffect, useRef } from "react"

interface ArgyleLinkProps {
  userToken: string
  onSuccess: (accountId: string, userId: string, linkItemId: string) => void
  onClose: () => void
}

export function ArgyleLink({ userToken, onSuccess, onClose }: ArgyleLinkProps) {
  const linkRef = useRef<any>(null)

  useEffect(() => {
    // Load Argyle Link SDK
    const script = document.createElement("script")
    script.src = "https://plugin.argyle.com/argyle.web.v3.js"
    script.async = true
    script.onload = () => {
      if (typeof window !== "undefined" && (window as any).Argyle) {
        console.log("[Argyle Link] Initializing with userToken:", userToken.substring(0, 20) + "...")

        linkRef.current = (window as any).Argyle.create({
          userToken: userToken,
          onAccountConnected: ({ accountId, userId, linkItemId }: any) => {
            console.log("[Argyle Link] Account connected:", { accountId, userId, linkItemId })
            onSuccess(accountId, userId, linkItemId)
          },
          onAccountRemoved: ({ accountId, userId, linkItemId }: any) => {
            console.log("[Argyle Link] Account removed:", { accountId, userId, linkItemId })
          },
          onClose: () => {
            console.log("[Argyle Link] User closed Link")
            onClose()
          },
          onTokenExpired: (updateToken: (token: string) => void) => {
            console.log("[Argyle Link] Token expired, refreshing...")
            // In production, fetch a new token and call updateToken(newToken)
            onClose()
          },
          onUserCreated: ({ userId, userToken }: any) => {
            console.log("[Argyle Link] User created:", { userId })
          },
          onError: (error: any) => {
            console.error("[Argyle Link] Error:", error)
            onClose()
          },
        })

        console.log("[Argyle Link] Opening modal...")
        linkRef.current.open()
      } else {
        console.error("[Argyle Link] Argyle SDK not loaded")
      }
    }

    script.onerror = () => {
      console.error("[Argyle Link] Failed to load Argyle SDK")
      onClose()
    }

    document.body.appendChild(script)

    return () => {
      if (linkRef.current) {
        linkRef.current.close()
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [userToken, onSuccess, onClose])

  return null
}
