"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/founders", label: "Founders" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/invest", label: "Invest" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold-dark/20 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-10 w-40">
            <Image src="/logo-dark.png" alt="Boosted Earnings" fill className="object-contain" priority />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="bg-gold text-black hover:bg-gold-dark">
            <Link href="/beta-signup">Join Beta</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-gold text-gold hover:bg-gold hover:text-black bg-transparent"
          >
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="h-6 w-6 text-gold" /> : <Menu className="h-6 w-6 text-gold" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-gold-dark/20 bg-black/95 md:hidden">
          <div className="container mx-auto space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-muted hover:text-gold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="space-y-2 pt-2">
              <Button asChild className="w-full bg-gold text-black hover:bg-gold-dark">
                <Link href="/beta-signup">Join Beta</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-gold text-gold hover:bg-gold hover:text-black bg-transparent"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
