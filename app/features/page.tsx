import { Card, CardContent } from "@/components/ui/card"
import {
  DollarSign,
  MapPin,
  BarChart3,
  Calendar,
  TrendingUp,
  Shield,
  Bell,
  FileText,
  Zap,
  Target,
  Clock,
  Smartphone,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FeaturesPage() {
  const features = [
    {
      icon: DollarSign,
      title: "Real-Time Income Tracking",
      description:
        "Automatically sync earnings from Uber, Lyft, DoorDash, and more. See your income, tips, and bonuses updated in real-time across all platforms.",
      benefits: ["Multi-platform integration", "Instant sync", "Tip tracking", "Bonus alerts"],
    },
    {
      icon: MapPin,
      title: "Smart Route Optimization",
      description:
        "AI-powered recommendations for the best times and locations to drive based on historical data, demand patterns, and surge pricing.",
      benefits: ["Heat map visualization", "Demand forecasting", "Surge predictions", "Zone recommendations"],
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics Dashboard",
      description:
        "Visualize your performance with detailed charts and insights. Track hourly rates, peak hours, top-earning zones, and more.",
      benefits: ["Interactive charts", "Custom date ranges", "Performance metrics", "Trend analysis"],
    },
    {
      icon: Calendar,
      title: "Automatic Mileage Logging",
      description:
        "GPS-based mileage tracking for accurate tax deductions. Generate IRS-compliant reports with one click.",
      benefits: ["GPS tracking", "IRS compliance", "Expense categorization", "Tax reports"],
    },
    {
      icon: TrendingUp,
      title: "Earnings Forecasts",
      description:
        "Predict your weekly and monthly earnings based on your driving patterns, market trends, and seasonal data.",
      benefits: ["Weekly projections", "Monthly forecasts", "Goal tracking", "Income planning"],
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your data is protected with 256-bit encryption. We never sell your information to third parties.",
      benefits: ["End-to-end encryption", "Secure data storage", "Privacy first", "GDPR compliant"],
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description:
        "Get alerts for surge pricing, bonus opportunities, and optimal driving times based on your preferences.",
      benefits: ["Surge alerts", "Bonus notifications", "Custom alerts", "Smart timing"],
    },
    {
      icon: FileText,
      title: "Tax Preparation Tools",
      description:
        "Simplify tax season with organized expense tracking, deduction calculations, and exportable reports.",
      benefits: ["Expense tracking", "Deduction calculator", "Quarterly estimates", "Export to TurboTax"],
    },
    {
      icon: Zap,
      title: "Multi-Platform Support",
      description:
        "Connect all your gig economy accounts in one place. Works with Uber, Lyft, DoorDash, Uber Eats, Grubhub, and more.",
      benefits: ["10+ integrations", "One dashboard", "Unified reporting", "Cross-platform insights"],
    },
    {
      icon: Target,
      title: "Goal Setting & Tracking",
      description:
        "Set daily, weekly, or monthly income goals and track your progress with visual indicators and motivational insights.",
      benefits: ["Custom goals", "Progress tracking", "Achievement badges", "Motivation tools"],
    },
    {
      icon: Clock,
      title: "Schedule Optimization",
      description:
        "Analyze your best performing hours and days. Get recommendations for when to drive to maximize your earnings.",
      benefits: ["Time analysis", "Schedule suggestions", "Peak hour insights", "Work-life balance"],
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Access all features on the go with our intuitive mobile app. Available for iOS and Android.",
      benefits: ["Native apps", "Offline mode", "Quick actions", "Widget support"],
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="border-b border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-balance text-4xl font-bold md:text-5xl">
              Everything You Need to <span className="text-primary">Maximize Earnings</span>
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              Powerful tools designed specifically for gig economy drivers. Track income, optimize routes, and boost
              your earnings.
            </p>
            <Button asChild size="lg">
              <Link href="/beta-signup">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="border-border bg-card">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{feature.description}</p>
                    <ul className="space-y-1">
                      {feature.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
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

      {/* Comparison Section */}
      <section className="border-y border-border bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold">How We Compare</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-4 text-left">Feature</th>
                    <th className="pb-4 text-center">Boosted Earnings</th>
                    <th className="pb-4 text-center text-muted-foreground">Solo</th>
                    <th className="pb-4 text-center text-muted-foreground">Gridwise</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-border">
                    <td className="py-4">Multi-platform tracking</td>
                    <td className="py-4 text-center text-primary">✓</td>
                    <td className="py-4 text-center text-primary">✓</td>
                    <td className="py-4 text-center text-primary">✓</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4">AI route optimization</td>
                    <td className="py-4 text-center text-primary">✓</td>
                    <td className="py-4 text-center text-muted-foreground">✗</td>
                    <td className="py-4 text-center text-muted-foreground">Limited</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4">Earnings forecasts</td>
                    <td className="py-4 text-center text-primary">✓</td>
                    <td className="py-4 text-center text-muted-foreground">✗</td>
                    <td className="py-4 text-center text-muted-foreground">✗</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4">Tax preparation tools</td>
                    <td className="py-4 text-center text-primary">✓</td>
                    <td className="py-4 text-center text-primary">✓</td>
                    <td className="py-4 text-center text-muted-foreground">Basic</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4">Real-time surge alerts</td>
                    <td className="py-4 text-center text-primary">✓</td>
                    <td className="py-4 text-center text-muted-foreground">✗</td>
                    <td className="py-4 text-center text-primary">✓</td>
                  </tr>
                  <tr>
                    <td className="py-4">Price</td>
                    <td className="py-4 text-center font-semibold text-primary">$9.99/mo</td>
                    <td className="py-4 text-center text-muted-foreground">$14.99/mo</td>
                    <td className="py-4 text-center text-muted-foreground">Free + Premium</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
            <p className="mb-8 text-muted-foreground">
              Join thousands of drivers who are already maximizing their earnings with Boosted Earnings.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/beta-signup">Start Free Trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
