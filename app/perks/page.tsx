import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Gift, Percent, Star, Award, Zap, Users } from "lucide-react"

export default function PerksPage() {
  const perks = [
    {
      icon: Gift,
      title: "Beta Tester Rewards",
      description:
        "Join our beta program and receive exclusive lifetime discounts, early access to new features, and special recognition in our community.",
    },
    {
      icon: Percent,
      title: "Partner Discounts",
      description:
        "Save money with exclusive discounts from our partners including gas stations, car maintenance services, insurance providers, and more.",
    },
    {
      icon: Star,
      title: "Referral Program",
      description:
        "Earn rewards by referring other drivers. Get $10 credit for each friend who signs up, and they get a discount too!",
    },
    {
      icon: Award,
      title: "Achievement Badges",
      description:
        "Unlock special badges and achievements as you hit earnings milestones. Show off your success and compete with other drivers.",
    },
    {
      icon: Zap,
      title: "Priority Features",
      description:
        "Pro members get early access to new features, priority customer support, and the ability to request custom features.",
    },
    {
      icon: Users,
      title: "Community Access",
      description:
        "Join our exclusive driver community to share tips, strategies, and connect with other successful rideshare drivers.",
    },
  ]

  const partnerDeals = [
    {
      partner: "Shell Gas Stations",
      discount: "5% off all fuel purchases",
      description: "Save on every fill-up with our Shell partnership",
    },
    {
      partner: "Jiffy Lube",
      discount: "$10 off oil changes",
      description: "Keep your car running smoothly with discounted maintenance",
    },
    {
      partner: "Geico Insurance",
      discount: "15% off rideshare insurance",
      description: "Protect yourself with specialized rideshare coverage",
    },
    {
      partner: "Car Wash Nation",
      discount: "Unlimited washes for $19.99/month",
      description: "Keep your car clean and professional-looking",
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
              Member Perks & Benefits
            </h1>
            <p className="text-xl text-gold">More than just a dashboard - exclusive benefits for our members</p>
          </div>
        </div>
      </section>

      {/* Perks Grid */}
      <section className="border-b border-gold-dark/20 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-gold glow-gold">Exclusive Member Benefits</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {perks.map((perk) => {
              const Icon = perk.icon
              return (
                <Card
                  key={perk.title}
                  className="border-gold-dark/30 bg-card/50 backdrop-blur transition-all hover:border-gold hover:shadow-lg hover:shadow-gold/20"
                >
                  <CardContent className="p-6">
                    <Icon className="mb-4 h-12 w-12 text-gold" />
                    <h3 className="mb-2 text-xl font-semibold text-white">{perk.title}</h3>
                    <p className="text-muted-foreground">{perk.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Partner Deals */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-gold glow-gold">Partner Deals</h2>
          <div className="mx-auto max-w-4xl space-y-6">
            {partnerDeals.map((deal) => (
              <Card key={deal.partner} className="border-gold-dark/30 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="mb-1 text-xl font-semibold text-gold">{deal.partner}</h3>
                      <p className="mb-2 text-lg font-medium text-white">{deal.discount}</p>
                      <p className="text-sm text-muted-foreground">{deal.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="inline-block rounded-full bg-gold px-4 py-2 text-sm font-semibold text-black">
                        Active Deal
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-center text-muted-foreground">
            More partner deals coming soon! We're constantly negotiating new discounts for our members.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
