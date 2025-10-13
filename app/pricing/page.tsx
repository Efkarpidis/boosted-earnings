import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Free Trial",
      price: "$0",
      period: "14 days",
      description: "Try all premium features risk-free",
      features: [
        "All premium features",
        "Multi-platform tracking",
        "Advanced analytics",
        "Route optimization",
        "Mileage logging",
        "No credit card required",
      ],
      cta: "Start Free Trial",
      highlighted: false,
    },
    {
      name: "Monthly",
      price: "$9.99",
      period: "per month",
      description: "Perfect for trying out the service",
      features: [
        "Real-time income tracking",
        "Multi-platform support",
        "Advanced analytics dashboard",
        "AI route optimization",
        "Automatic mileage logging",
        "Tax preparation tools",
        "Smart notifications",
        "Goal tracking",
        "Priority support",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Annual",
      price: "$99",
      period: "per year",
      description: "Save 17% with annual billing",
      savings: "Save $20/year",
      features: [
        "Everything in Monthly",
        "Advanced forecasting",
        "Custom reports",
        "API access",
        "Early access to new features",
        "Dedicated account manager",
        "Priority support",
        "2 months free",
      ],
      cta: "Get Started",
      highlighted: true,
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="border-b border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-balance text-4xl font-bold md:text-5xl">
              Simple, Transparent <span className="text-primary">Pricing</span>
            </h1>
            <p className="text-pretty text-lg text-muted-foreground">
              Start with a free trial. No credit card required. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`border-border ${plan.highlighted ? "border-primary bg-card shadow-lg shadow-primary/20" : "bg-card"}`}
              >
                <CardHeader>
                  {plan.savings && (
                    <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {plan.savings}
                    </div>
                  )}
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button asChild className="mb-6 w-full" variant={plan.highlighted ? "default" : "outline"}>
                    <Link href="/beta-signup">{plan.cta}</Link>
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="border-y border-border bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-center text-3xl font-bold">Calculate Your ROI</h2>
            <p className="mb-12 text-center text-muted-foreground">
              See how much you could save and earn with Boosted Earnings
            </p>

            <Card className="border-border bg-background">
              <CardContent className="pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-4 font-semibold">Average Driver Benefits</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Increased earnings (30%)</span>
                        <span className="font-semibold text-primary">+$750/mo</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Tax deductions saved</span>
                        <span className="font-semibold text-primary">+$200/mo</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Time saved (5 hrs/mo)</span>
                        <span className="font-semibold text-primary">+$125/mo</span>
                      </li>
                      <li className="flex justify-between border-t border-border pt-3">
                        <span className="font-semibold">Total monthly benefit</span>
                        <span className="font-bold text-primary">$1,075</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-4 font-semibold">Your Investment</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Monthly subscription</span>
                        <span className="font-semibold">$9.99</span>
                      </li>
                      <li className="flex justify-between border-t border-border pt-3">
                        <span className="font-semibold">Net monthly gain</span>
                        <span className="font-bold text-primary">$1,065</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="font-semibold">ROI</span>
                        <span className="font-bold text-primary">10,650%</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold">Pricing FAQs</h2>
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 font-semibold">Can I cancel anytime?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes! You can cancel your subscription at any time. No questions asked, no cancellation fees.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">What payment methods do you accept?</h3>
                <p className="text-sm text-muted-foreground">
                  We accept all major credit cards (Visa, Mastercard, American Express) and PayPal.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Is there a free trial?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes! We offer a 14-day free trial with full access to all premium features. No credit card required.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Do you offer refunds?</h3>
                <p className="text-sm text-muted-foreground">
                  We offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment in full.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Start Your Free Trial Today</h2>
            <p className="mb-8 text-muted-foreground">
              No credit card required. Cancel anytime. Start maximizing your earnings in minutes.
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
