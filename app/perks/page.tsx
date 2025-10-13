import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Percent,
  Shield,
  Zap,
  Gift,
  TrendingUp,
  Users,
  Car,
  Smartphone,
  CreditCard,
  Fuel,
  Wrench,
  Coffee,
} from "lucide-react"

export default function PerksPage() {
  const perks = [
    {
      icon: Percent,
      title: "Exclusive Discounts",
      description: "Save on gas, car maintenance, insurance, and more",
      benefits: [
        "Up to 25¢/gallon off at Shell, BP, and Chevron",
        "15% off oil changes at Jiffy Lube",
        "20% off car washes nationwide",
        "10% off at AutoZone and O'Reilly Auto Parts",
      ],
    },
    {
      icon: Shield,
      title: "Insurance Benefits",
      description: "Special rates on rideshare insurance",
      benefits: [
        "Exclusive rates with top insurers",
        "Rideshare-specific coverage",
        "Instant quotes and comparison",
        "Save up to $500/year on premiums",
      ],
    },
    {
      icon: Zap,
      title: "Earnings Guarantees",
      description: "Protect your income with our guarantee program",
      benefits: [
        "Minimum earnings guarantee",
        "Surge protection alerts",
        "Bonus opportunity notifications",
        "Peak hour recommendations",
      ],
    },
    {
      icon: Gift,
      title: "Rewards Program",
      description: "Earn points for every mile driven",
      benefits: ["1 point per mile driven", "Redeem for gift cards", "Cash back options", "Exclusive partner offers"],
    },
    {
      icon: TrendingUp,
      title: "Premium Analytics",
      description: "Advanced insights to boost your earnings",
      benefits: [
        "Predictive earnings forecasts",
        "Custom performance reports",
        "Competitor benchmarking",
        "Market trend analysis",
      ],
    },
    {
      icon: Users,
      title: "Community Access",
      description: "Join our exclusive driver community",
      benefits: [
        "Private Facebook group",
        "Monthly webinars with experts",
        "Networking events",
        "Tips from top earners",
      ],
    },
    {
      icon: Car,
      title: "Vehicle Perks",
      description: "Special deals on vehicle-related services",
      benefits: [
        "Discounted car rentals",
        "Free vehicle inspections",
        "Tire rotation discounts",
        "Detailing service deals",
      ],
    },
    {
      icon: Smartphone,
      title: "Tech Discounts",
      description: "Save on phones, accessories, and more",
      benefits: [
        "20% off phone mounts and chargers",
        "Discounted dash cams",
        "Free phone insurance trial",
        "Data plan discounts",
      ],
    },
    {
      icon: CreditCard,
      title: "Financial Services",
      description: "Access to financial tools and services",
      benefits: [
        "No-fee business checking",
        "Early direct deposit",
        "Tax preparation discounts",
        "Accounting software deals",
      ],
    },
    {
      icon: Fuel,
      title: "Fuel Rewards",
      description: "Save money every time you fill up",
      benefits: [
        "Automatic fuel tracking",
        "Best price finder",
        "Loyalty program integration",
        "Cash back on fuel purchases",
      ],
    },
    {
      icon: Wrench,
      title: "Maintenance Plans",
      description: "Keep your vehicle in top shape",
      benefits: [
        "Discounted maintenance packages",
        "Free inspection reminders",
        "Priority service booking",
        "Extended warranty options",
      ],
    },
    {
      icon: Coffee,
      title: "Lifestyle Benefits",
      description: "Perks for your everyday life",
      benefits: [
        "10% off at Starbucks",
        "Gym membership discounts",
        "Meal delivery service deals",
        "Entertainment subscriptions",
      ],
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="border-b border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-balance text-4xl font-bold md:text-5xl">
              Exclusive <span className="text-primary">Driver Perks</span>
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              Save thousands every year with exclusive discounts, rewards, and benefits designed specifically for gig
              drivers.
            </p>
            <Button asChild size="lg">
              <Link href="/beta-signup">Unlock All Perks</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Savings Calculator */}
      <section className="border-b border-border bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-2xl font-bold">Average Annual Savings</h2>
            <div className="grid gap-6 md:grid-cols-4">
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-primary">$1,200</div>
                <div className="text-sm text-muted-foreground">Fuel Discounts</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-primary">$800</div>
                <div className="text-sm text-muted-foreground">Maintenance Savings</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-primary">$500</div>
                <div className="text-sm text-muted-foreground">Insurance Savings</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-primary">$2,500+</div>
                <div className="text-sm text-muted-foreground">Total Savings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perks Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {perks.map((perk) => {
              const Icon = perk.icon
              return (
                <Card key={perk.title} className="border-border bg-card">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{perk.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{perk.description}</p>
                    <ul className="space-y-2">
                      {perk.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Partners */}
      <section className="border-y border-border bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold">Our Partners</h2>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {["Shell", "BP", "Jiffy Lube", "AutoZone", "Starbucks", "Geico", "T-Mobile", "Costco"].map((partner) => (
                <div
                  key={partner}
                  className="flex items-center justify-center rounded-lg border border-border bg-background p-6"
                >
                  <span className="text-lg font-semibold text-muted-foreground">{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold">How to Access Your Perks</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h3 className="mb-2 font-semibold">Sign Up</h3>
                <p className="text-sm text-muted-foreground">
                  Create your Boosted Earnings account and verify your driver status
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h3 className="mb-2 font-semibold">Browse Perks</h3>
                <p className="text-sm text-muted-foreground">
                  Explore available discounts and benefits in your dashboard
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <h3 className="mb-2 font-semibold">Start Saving</h3>
                <p className="text-sm text-muted-foreground">Activate offers and start saving on every purchase</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Start Saving?</h2>
            <p className="mb-8 text-muted-foreground">
              Join Boosted Earnings today and unlock exclusive perks worth thousands of dollars per year.
            </p>
            <Button asChild size="lg">
              <Link href="/beta-signup">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
