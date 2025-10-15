import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Track up to 2 platforms",
        "Basic earnings dashboard",
        "Weekly reports",
        "Mobile app access",
        "Email support",
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
        "Unlimited platforms",
        "Advanced analytics & insights",
        "Real-time earnings tracking",
        "Peak hour predictions",
        "Tax preparation tools",
        "Priority support",
        "Custom reports",
        "API access",
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
        "Team analytics",
        "Custom integrations",
        "Dedicated account manager",
        "White-label options",
        "SLA guarantee",
        "Training & onboarding",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gold">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground text-balance">
              Choose the plan that fits your needs. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`bg-card/50 backdrop-blur-sm ${
                  plan.highlighted ? "border-gold border-2 glow-gold scale-105" : "border-gold/20 hover:border-gold/50"
                } transition-all`}
              >
                <CardHeader>
                  {plan.highlighted && (
                    <div className="text-center mb-2">
                      <span className="bg-gold text-black text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
                    </div>
                  )}
                  <CardTitle className="text-2xl font-bold text-gold text-center">{plan.name}</CardTitle>
                  <div className="text-center mt-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">/ {plan.period}</span>
                  </div>
                  <p className="text-center text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup">
                    <Button
                      className={`w-full ${
                        plan.highlighted
                          ? "bg-gold hover:bg-gold-dark text-black font-semibold glow-gold"
                          : "border-gold text-gold hover:bg-gold hover:text-black bg-transparent"
                      }`}
                      variant={plan.highlighted ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              All plans include 256-bit SSL encryption and are GDPR compliant
            </p>
            <p className="text-sm text-muted-foreground">
              Questions about pricing?{" "}
              <Link href="/faq" className="text-gold hover:text-gold-dark">
                Check our FAQ
              </Link>{" "}
              or contact our sales team
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
