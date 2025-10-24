"use client"

import { useEffect, useRef } from "react"

interface ArgyleLinkProps {
  userToken: string
  onSuccess: (code: string, metadata: any) => void
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
        linkRef.current = (window as any).Argyle.create({
          userToken: userToken,
          onAccountConnected: ({ accountId, userId, linkItemId }: any) => {
            console.log("[Argyle Link] Account connected:", { accountId, userId, linkItemId })
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
          onSuccess: ({ code, metadata }: any) => {
            console.log("[Argyle Link] Success:", { code, metadata })
            onSuccess(code, metadata)
          },
        })

        linkRef.current.open()
      }
    }
    document.body.appendChild(script)

    return () => {
      if (linkRef.current) {
        linkRef.current.close()
      }
      document.body.removeChild(script)
    }
  }, [userToken, onSuccess, onClose])

  return null
}
