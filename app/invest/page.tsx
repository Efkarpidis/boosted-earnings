import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, Target } from "lucide-react"

export default function InvestPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="border-b border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-balance text-4xl font-bold md:text-5xl">
              Invest in the Future of <span className="text-primary">Gig Economy</span>
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              Join us in empowering millions of gig workers to maximize their earnings and build better financial
              futures.
            </p>
            <Button size="lg" className="text-base">
              Request Investment Information
            </Button>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold">The Opportunity</h2>
            <p className="text-muted-foreground">
              The gig economy is exploding, and workers need better tools to succeed.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border bg-card text-center">
              <CardContent className="pt-6">
                <div className="mb-4 text-4xl font-bold text-primary">$455B</div>
                <div className="text-sm text-muted-foreground">Global Gig Economy Market Size</div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card text-center">
              <CardContent className="pt-6">
                <div className="mb-4 text-4xl font-bold text-primary">59M</div>
                <div className="text-sm text-muted-foreground">Gig Workers in the US</div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card text-center">
              <CardContent className="pt-6">
                <div className="mb-4 text-4xl font-bold text-primary">36%</div>
                <div className="text-sm text-muted-foreground">Annual Market Growth Rate</div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card text-center">
              <CardContent className="pt-6">
                <div className="mb-4 text-4xl font-bold text-primary">$1.5T</div>
                <div className="text-sm text-muted-foreground">Projected Market by 2027</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Invest */}
      <section className="border-y border-border bg-card py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Invest in Boosted Earnings?</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-border bg-background">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Proven Traction</h3>
                <p className="text-sm text-muted-foreground">
                  50,000+ active users with 40% month-over-month growth. Our users see an average income increase of 30%
                  within the first 3 months.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-background">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Experienced Team</h3>
                <p className="text-sm text-muted-foreground">
                  Founded by former drivers and tech leaders from Google, Tesla, and DoorDash. We understand both the
                  market and the technology.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-background">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Multiple Revenue Streams</h3>
                <p className="text-sm text-muted-foreground">
                  Subscription model with premium features, B2B partnerships with gig platforms, and data insights for
                  market research firms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-background">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Clear Path to Scale</h3>
                <p className="text-sm text-muted-foreground">
                  Expanding from rideshare to all gig economy sectors: delivery, freelancing, and task-based work. TAM
                  of 59M+ workers in the US alone.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Funding Round */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold">Current Funding Round</h2>
            <Card className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="mb-2 text-sm text-muted-foreground">Round Type</div>
                    <div className="text-xl font-semibold">Series A</div>
                  </div>
                  <div>
                    <div className="mb-2 text-sm text-muted-foreground">Target Raise</div>
                    <div className="text-xl font-semibold text-primary">$10M</div>
                  </div>
                  <div>
                    <div className="mb-2 text-sm text-muted-foreground">Valuation</div>
                    <div className="text-xl font-semibold">$50M</div>
                  </div>
                  <div>
                    <div className="mb-2 text-sm text-muted-foreground">Use of Funds</div>
                    <div className="text-xl font-semibold">Product & Growth</div>
                  </div>
                </div>

                <div className="mt-6 border-t border-border pt-6">
                  <h3 className="mb-4 font-semibold">Use of Funds Breakdown</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 40% - Product development and AI/ML capabilities</li>
                    <li>• 30% - Marketing and user acquisition</li>
                    <li>• 20% - Team expansion (engineering, data science)</li>
                    <li>• 10% - Operations and infrastructure</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Interested in Learning More?</h2>
            <p className="mb-8 text-muted-foreground">
              Contact our investor relations team to receive our pitch deck, financial projections, and additional
              information.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg">Request Pitch Deck</Button>
              <Button size="lg" variant="outline">
                Schedule a Call
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
