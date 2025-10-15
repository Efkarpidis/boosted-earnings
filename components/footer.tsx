import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-gold-dark/20 bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gold">Boosted Earnings</h3>
            <p className="text-sm text-muted-foreground">
              Designed by a driver, for the driver. Elevate your rideshare experience.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-gold">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-gold">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-gold">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-gold">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/perks" className="text-muted-foreground hover:text-gold">
                  Perks
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-gold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/founders" className="text-muted-foreground hover:text-gold">
                  Founders
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-gold">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/invest" className="text-muted-foreground hover:text-gold">
                  Invest
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-gold">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-gold">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-gold">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-gold">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-gold">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-gold">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gold-dark/20 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Boosted Earnings. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
