import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import {
  TrendingUp,
  BarChart3,
  Shield,
  DollarSign,
  Zap,
  Users,
  Bell,
  FileText,
  Calendar,
  Target,
  Map,
  Smartphone,
} from "lucide-react"

export default function FeaturesPage() {
  const features = [
    {
      icon: TrendingUp,
      title: "Real-Time Earnings Tracking",
      description:
        "Monitor your earnings across all platforms in real-time. See exactly how much you're making as you work.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Get detailed insights into your earnings patterns, peak hours, and performance metrics with beautiful visualizations.",
    },
    {
      icon: DollarSign,
      title: "Multi-Platform Support",
      description: "Connect Uber, Lyft, DoorDash, Uber Eats, and more. All your earnings in one unified dashboard.",
    },
    {
      icon: Target,
      title: "Goal Setting & Tracking",
      description:
        "Set daily, weekly, or monthly earning goals and track your progress with visual indicators and notifications.",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description:
        "Get alerts for peak hours, surge pricing, and earning opportunities in your area. Never miss a high-earning moment.",
    },
    {
      icon: Map,
      title: "Heat Maps & Zones",
      description: "Visualize high-demand areas and optimize your routes to maximize earnings and reduce dead miles.",
    },
    {
      icon: FileText,
      title: "Tax Preparation Tools",
      description:
        "Automatically track deductible expenses, mileage, and generate tax reports. Make tax season stress-free.",
    },
    {
      icon: Calendar,
      title: "Schedule Optimization",
      description:
        "AI-powered recommendations on when and where to drive based on historical data and market conditions.",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your data is encrypted with 256-bit SSL. We never share your information with third parties.",
    },
    {
      icon: Users,
      title: "Driver Community",
      description: "Connect with thousands of drivers, share tips, and learn from the best in the community.",
    },
    {
      icon: Smartphone,
      title: "Mobile & Desktop Apps",
      description:
        "Access your dashboard anywhere with native iOS, Android, and web applications. Sync across all devices.",
    },
    {
      icon: Zap,
      title: "Instant Sync",
      description: "Automatic data synchronization across all your connected platforms. No manual entry required.",
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gold">Powerful Features</h1>
            <p className="text-xl text-muted-foreground text-balance">
              Everything you need to track, analyze, and optimize your rideshare earnings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.title}
                  className="bg-card/50 backdrop-blur-sm border-gold/20 hover:border-gold/50 transition-all hover:glow-gold group"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mb-4 bg-gold/10 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                      <Icon className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-16 text-center">
            <p className="text-xl text-muted-foreground mb-8">Ready to experience all these features and more?</p>
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
