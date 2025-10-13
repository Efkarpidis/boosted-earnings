import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, MapPin, Calendar, DollarSign, BarChart3, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Maximize Your <span className="text-primary">Gig Driver</span> Earnings
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
              Track your income, optimize your routes, and boost your earnings with intelligent insights designed for
              Uber, Lyft, and DoorDash drivers.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="text-base">
                <Link href="/beta-signup">Join the Beta</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base bg-transparent">
                <Link href="/features">Explore Features</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-border bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">$2,500+</div>
              <div className="text-sm text-muted-foreground">Average Monthly Boost</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Active Drivers</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-primary">4.9★</div>
              <div className="text-sm text-muted-foreground">App Store Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Built for Gig Economy Drivers</h2>
            <p className="text-pretty text-lg text-muted-foreground">
              Boosted Earnings is the ultimate companion app for rideshare and delivery drivers. We help you track every
              mile, maximize your earnings, and make smarter decisions about when and where to drive.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Income Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically track earnings across all platforms. See your real-time income, tips, and bonuses in one
                  place.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Smart Route Optimization</h3>
                <p className="text-sm text-muted-foreground">
                  Get AI-powered suggestions for the best times and locations to drive based on historical data and
                  demand patterns.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Detailed Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Visualize your performance with charts and insights. Understand your hourly rate, peak hours, and
                  top-earning zones.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Mileage Logging</h3>
                <p className="text-sm text-muted-foreground">
                  Automatic mileage tracking for tax deductions. Never miss a mile with GPS-based logging and
                  IRS-compliant reports.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Earnings Forecasts</h3>
                <p className="text-sm text-muted-foreground">
                  Predict your weekly and monthly earnings based on your driving patterns and market trends.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Secure & Private</h3>
                <p className="text-sm text-muted-foreground">
                  Bank-level encryption keeps your data safe. We never sell your information to third parties.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-card py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">What Drivers Are Saying</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="mb-4 text-primary">★★★★★</div>
                <p className="mb-4 text-sm text-muted-foreground">
                  "Boosted Earnings helped me increase my income by 30% in just two months. The insights are
                  game-changing!"
                </p>
                <div className="font-semibold">Marcus T.</div>
                <div className="text-sm text-muted-foreground">Uber Driver, Los Angeles</div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="mb-4 text-primary">★★★★★</div>
                <p className="mb-4 text-sm text-muted-foreground">
                  "Finally, an app that understands what drivers need. The mileage tracking alone saves me hours during
                  tax season."
                </p>
                <div className="font-semibold">Sarah K.</div>
                <div className="text-sm text-muted-foreground">Lyft Driver, Chicago</div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="mb-4 text-primary">★★★★★</div>
                <p className="mb-4 text-sm text-muted-foreground">
                  "The route optimization feature is incredible. I'm making more money while driving fewer miles."
                </p>
                <div className="font-semibold">James R.</div>
                <div className="text-sm text-muted-foreground">DoorDash Driver, Miami</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Ready to Boost Your Earnings?</h2>
            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              Join thousands of drivers who are already maximizing their income with Boosted Earnings.
            </p>
            <Button asChild size="lg" className="text-base">
              <Link href="/beta-signup">Get Early Access</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
