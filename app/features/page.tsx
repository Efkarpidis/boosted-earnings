import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import {
  TrendingUp,
  BarChart3,
  Shield,
  Zap,
  DollarSign,
  Clock,
  FileText,
  Bell,
  Smartphone,
  Link2,
  PieChart,
  Target,
} from "lucide-react"

export default function FeaturesPage() {
  const features = [
    {
      icon: TrendingUp,
      title: "Real-Time Earnings Tracking",
      description:
        "Monitor your earnings across all platforms in real-time. See exactly how much you're making as you drive.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Get deep insights into your performance with comprehensive charts, graphs, and data visualization tools.",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description:
        "Your data is encrypted and protected with the same security standards used by major financial institutions.",
    },
    {
      icon: Zap,
      title: "Multi-Platform Support",
      description: "Connect Uber, Lyft, DoorDash, Uber Eats, Grubhub, and more - all in one unified dashboard.",
    },
    {
      icon: DollarSign,
      title: "Expense Tracking",
      description: "Track gas, maintenance, insurance, and other expenses to calculate your true profit margins.",
    },
    {
      icon: Clock,
      title: "Peak Hours Analysis",
      description:
        "Identify the most profitable times to drive with detailed hourly earnings breakdowns and recommendations.",
    },
    {
      icon: FileText,
      title: "Tax Preparation Tools",
      description:
        "Generate tax-ready reports with mileage tracking, expense categorization, and deduction calculations.",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description:
        "Get alerts for earnings milestones, expense reminders, and optimal driving times based on your patterns.",
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      description:
        "Access your dashboard on the go with our native iOS and Android apps. Track earnings anywhere, anytime.",
    },
    {
      icon: Link2,
      title: "Automatic Data Sync",
      description: "Connect once and your earnings data syncs automatically. No manual entry required.",
    },
    {
      icon: PieChart,
      title: "Platform Comparison",
      description: "Compare earnings across different platforms to identify which ones are most profitable for you.",
    },
    {
      icon: Target,
      title: "Goal Setting & Tracking",
      description: "Set daily, weekly, or monthly earnings goals and track your progress with visual indicators.",
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
              Powerful Features for Drivers
            </h1>
            <p className="text-xl text-gold">Everything you need to maximize your rideshare earnings</p>
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
                <Card
                  key={feature.title}
                  className="border-gold-dark/30 bg-card/50 backdrop-blur transition-all hover:border-gold hover:shadow-lg hover:shadow-gold/20"
                >
                  <CardContent className="p-6">
                    <Icon className="mb-4 h-12 w-12 text-gold" />
                    <h3 className="mb-2 text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
