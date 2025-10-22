"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push("/")
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gold/20">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/dark-logo.png" alt="Boosted Earnings" width={150} height={40} className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-gold transition-colors">
              Home
            </Link>
            <Link href="/features" className="text-foreground hover:text-gold transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-foreground hover:text-gold transition-colors">
              Pricing
            </Link>
            <Link href="/blog" className="text-foreground hover:text-gold transition-colors">
              Blog
            </Link>
            <Link href="/founders" className="text-foreground hover:text-gold transition-colors">
              Founders
            </Link>
            <Link href="/invest" className="text-foreground hover:text-gold transition-colors">
              Invest
            </Link>
            <Link href="/faq" className="text-foreground hover:text-gold transition-colors">
              FAQ
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button className="bg-gold hover:bg-gold-dark text-black font-semibold glow-gold">Dashboard</Button>
                </Link>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="border-gold text-gold hover:bg-gold hover:text-black bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/beta-signup">
                  <Button className="bg-gold hover:bg-gold-dark text-black font-semibold glow-gold">Join Beta</Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="border-gold text-gold hover:bg-gold hover:text-black bg-transparent"
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gold" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-gold/20 pt-4">
            <Link href="/" className="text-foreground hover:text-gold transition-colors">
              Home
            </Link>
            <Link href="/features" className="text-foreground hover:text-gold transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-foreground hover:text-gold transition-colors">
              Pricing
            </Link>
            <Link href="/blog" className="text-foreground hover:text-gold transition-colors">
              Blog
            </Link>
            <Link href="/founders" className="text-foreground hover:text-gold transition-colors">
              Founders
            </Link>
            <Link href="/invest" className="text-foreground hover:text-gold transition-colors">
              Invest
            </Link>
            <Link href="/faq" className="text-foreground hover:text-gold transition-colors">
              FAQ
            </Link>
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button className="w-full bg-gold hover:bg-gold-dark text-black font-semibold">Dashboard</Button>
                </Link>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full border-gold text-gold hover:bg-gold hover:text-black bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/beta-signup">
                  <Button className="w-full bg-gold hover:bg-gold-dark text-black font-semibold">Join Beta</Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="w-full border-gold text-gold hover:bg-gold hover:text-black bg-transparent"
                  >
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
