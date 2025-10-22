import Link from "next/link"
import Image from "next/image"
import { Linkedin, Globe } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black border-t border-gold/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Image src="/dark-logo.png" alt="Boosted Earnings" width={150} height={40} className="h-10 w-auto mb-4" />
            <p className="text-muted-foreground text-sm">
              Designed by a driver, for the driver. Elevate your rideshare experience with intelligent earnings tracking
              and optimization.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link href="/features" className="text-muted-foreground hover:text-gold transition-colors text-sm">
                Features
              </Link>
              <Link href="/pricing" className="text-muted-foreground hover:text-gold transition-colors text-sm">
                Pricing
              </Link>
              <Link href="/blog" className="text-muted-foreground hover:text-gold transition-colors text-sm">
                Blog
              </Link>
              <Link href="/faq" className="text-muted-foreground hover:text-gold transition-colors text-sm">
                FAQ
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-gold font-semibold mb-4">Company</h3>
            <div className="flex flex-col gap-2">
              <Link href="/founders" className="text-muted-foreground hover:text-gold transition-colors text-sm">
                Founders
              </Link>
              <Link href="/invest" className="text-muted-foreground hover:text-gold transition-colors text-sm">
                Invest
              </Link>
              <Link href="/beta-signup" className="text-muted-foreground hover:text-gold transition-colors text-sm">
                Join Beta
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gold/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Boosted Earnings. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-dark transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://boostedearnings.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-dark transition-colors"
            >
              <Globe size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
