import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge, Gift, Percent, Star, Trophy, Zap } from "lucide-react"

export default function PerksPage() {
  const perks = [
    {
      icon: Gift,
      title: "Beta Tester Lifetime Discount",
      description:
        "Join our beta program and get 50% off for life when we launch. Lock in this exclusive rate forever.",
      badge: "Beta Only",
    },
    {
      icon: Percent,
      title: "Partner Discounts",
      description:
        "Save on gas, car maintenance, insurance, and more with exclusive discounts from our partner network.",
      badge: "All Users",
    },
    {
      icon: Star,
      title: "Priority Feature Requests",
      description:
        "Pro users get priority when requesting new features. Your feedback directly shapes our product roadmap.",
      badge: "Pro Plan",
    },
    {
      icon: Trophy,
      title: "Driver Rewards Program",
      description:
        "Earn points for consistent usage and high earnings. Redeem for gift cards, premium features, and more.",
      badge: "Coming Soon",
    },
    {
      icon: Zap,
      title: "Early Access to New Features",
      description: "Be the first to try new features and tools before they're released to the general public.",
      badge: "Pro Plan",
    },
    {
      icon: Badge,
      title: "Exclusive Community Access",
      description:
        "Join our private Discord community with top-earning drivers. Share strategies and network with the best.",
      badge: "Pro Plan",
    },
  ]

  const partnerDiscounts = [
    {
      name: "Shell Gas Stations",
      discount: "10¢ off per gallon",
      description: "Save on every fill-up at participating Shell locations nationwide.",
    },
    {
      name: "Jiffy Lube",
      discount: "20% off oil changes",
      description: "Keep your vehicle running smoothly with discounted maintenance services.",
    },
    {
      name: "Geico Insurance",
      discount: "15% off rideshare coverage",
      description: "Special rates on commercial auto insurance for rideshare drivers.",
    },
    {
      name: "Costco Wholesale",
      discount: "$20 off membership",
      description: "Save on bulk purchases and additional gas discounts at Costco fuel stations.",
    },
    {
      name: "TurboTax",
      discount: "25% off tax filing",
      description: "Simplified tax filing with special pricing for gig economy workers.",
    },
    {
      name: "AAA Membership",
      discount: "$25 off annual membership",
      description: "Roadside assistance, travel discounts, and more at a reduced rate.",
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gold">Member Perks</h1>
            <p className="text-xl text-muted-foreground text-balance">
              Exclusive benefits and discounts designed to help you save money and earn more
            </p>
          </div>

          {/* Main Perks */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {perks.map((perk) => {
              const Icon = perk.icon
              return (
                <Card
                  key={perk.title}
                  className="bg-card/50 backdrop-blur-sm border-gold/20 hover:border-gold/50 transition-all hover:glow-gold"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-gold" />
                      </div>
                      <span className="bg-gold/20 text-gold text-xs font-bold px-3 py-1 rounded-full">
                        {perk.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gold">{perk.title}</h3>
                    <p className="text-muted-foreground">{perk.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Partner Discounts */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-gold text-center mb-12">Partner Discounts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {partnerDiscounts.map((partner) => (
                <Card
                  key={partner.name}
                  className="bg-card/50 backdrop-blur-sm border-gold/20 hover:border-gold/50 transition-all"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gold">{partner.name}</h3>
                      <span className="bg-gold text-black text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap">
                        {partner.discount}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{partner.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Card className="bg-gold/10 border-gold/30 max-w-3xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gold mb-4">Unlock All Perks Today</h3>
                <p className="text-foreground mb-6">
                  Join Boosted Earnings Pro to access all partner discounts and exclusive benefits. Start saving
                  hundreds of dollars per month on expenses.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/beta-signup">
                    <button className="bg-gold hover:bg-gold-dark text-black font-semibold px-8 py-4 rounded-lg glow-gold transition-all">
                      Join Beta Program
                    </button>
                  </a>
                  <a href="/pricing">
                    <button className="border-2 border-gold text-gold hover:bg-gold hover:text-black font-semibold px-8 py-4 rounded-lg transition-all">
                      View Pricing
                    </button>
                  </a>
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
