import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Basic earnings tracking",
        "Up to 2 platform connections",
        "Weekly reports",
        "Basic expense tracking",
        "Mobile app access",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      description: "For serious drivers",
      features: [
        "Everything in Free",
        "Unlimited platform connections",
        "Real-time earnings sync",
        "Advanced analytics & insights",
        "Daily & custom reports",
        "Expense categorization",
        "Tax preparation tools",
        "Priority support",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For fleets and teams",
      features: [
        "Everything in Pro",
        "Multi-driver management",
        "Fleet analytics dashboard",
        "Custom integrations",
        "Dedicated account manager",
        "API access",
        "White-label options",
        "Custom reporting",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gold-dark/20 bg-gradient-to-b from-black via-black to-black/95">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold leading-tight text-white glow-gold md:text-6xl">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gold">Choose the plan that fits your needs</p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`border-gold-dark/30 bg-card/50 backdrop-blur transition-all hover:border-gold ${
                  plan.highlighted ? "scale-105 border-gold shadow-lg shadow-gold/20" : ""
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="mb-2 text-2xl font-bold text-gold">{plan.name}</div>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      {plan.price !== "Custom" && <span className="text-muted-foreground"> / {plan.period}</span>}
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="mb-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`w-full ${
                      plan.highlighted
                        ? "bg-gold text-black hover:bg-gold-dark"
                        : "border-gold bg-transparent text-gold hover:bg-gold hover:text-black"
                    }`}
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    <Link href="/beta-signup">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">All plans include a 14-day free trial. No credit card required.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
