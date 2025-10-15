import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Globe } from "lucide-react"

export default function FoundersPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gold-dark/20 bg-gradient-to-b from-black via-black to-black/95">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold leading-tight text-white glow-gold md:text-6xl">Meet Our Founder</h1>
            <p className="text-xl text-gold">Built by a driver who understands your challenges</p>
          </div>
        </div>
      </section>

      {/* Founder Profile Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <Card className="border-gold-dark/30 bg-card/50 backdrop-blur">
              <CardContent className="p-8 md:p-12">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                  {/* Founder Image */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative mb-6 h-80 w-80 overflow-hidden rounded-lg border-2 border-gold">
                      <Image
                        src="/chris-efkarpidis-founder-portrait.jpg"
                        alt="Chris Efkarpidis - Founder"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h2 className="mb-2 text-3xl font-bold text-gold">Chris Efkarpidis</h2>
                    <p className="mb-4 text-lg text-muted-foreground">Founder & CEO</p>

                    {/* Social Links */}
                    <div className="flex space-x-4">
                      <a
                        href="https://www.linkedin.com/in/chris-efkarpidis"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-dark/50 bg-black/50 transition-all hover:border-gold hover:bg-gold/10"
                      >
                        <Linkedin className="h-6 w-6 text-gold" />
                      </a>
                      <a
                        href="https://www.boostedearnings.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-dark/50 bg-black/50 transition-all hover:border-gold hover:bg-gold/10"
                      >
                        <Globe className="h-6 w-6 text-gold" />
                      </a>
                    </div>
                  </div>

                  {/* Founder Bio */}
                  <div className="flex flex-col justify-center">
                    <h3 className="mb-6 text-2xl font-semibold text-gold">The Story Behind Boosted Earnings</h3>

                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Chris Efkarpidis is a rideshare driver who experienced firsthand the challenges of tracking
                        earnings across multiple platforms. After years of manually calculating his true income and
                        struggling to understand where his money was really going, he decided to build a solution.
                      </p>

                      <p>
                        "I was working 60+ hours a week driving for Uber and Lyft, but I had no clear picture of my
                        actual earnings after expenses," Chris recalls. "I'd see the gross numbers in the apps, but when
                        I factored in gas, maintenance, and other costs, I realized I was making far less than I
                        thought."
                      </p>

                      <p>
                        This realization sparked the creation of Boosted Earnings. Chris combined his experience as a
                        driver with his passion for technology to build a platform that gives drivers complete
                        transparency into their earnings.
                      </p>

                      <p>
                        "Every feature in Boosted Earnings solves a real problem I faced as a driver," Chris explains.
                        "This isn't just another app built by people who've never sat behind the wheel. It's designed by
                        someone who lives this life every day."
                      </p>

                      <p className="font-semibold text-gold">
                        Today, Chris continues to drive part-time while building Boosted Earnings, ensuring the platform
                        stays true to the needs of real drivers.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mission Statement */}
                <div className="mt-12 border-t border-gold-dark/30 pt-12">
                  <h3 className="mb-6 text-center text-2xl font-semibold text-gold">Our Mission</h3>
                  <p className="mx-auto max-w-3xl text-center text-lg text-muted-foreground">
                    To empower gig economy workers with the tools and insights they need to maximize their earnings,
                    make informed decisions, and build sustainable careers. We believe every driver deserves complete
                    transparency and control over their financial future.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
