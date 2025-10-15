import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"

export default function BlogPage() {
  const posts = [
    {
      title: "10 Tips to Maximize Your Rideshare Earnings in 2024",
      excerpt:
        "Learn the strategies that top drivers use to boost their income, from peak hour optimization to multi-platform strategies.",
      image: "/blog-rideshare-tips.jpg",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Tips & Tricks",
    },
    {
      title: "Understanding Your True Hourly Rate as a Rideshare Driver",
      excerpt:
        "Most drivers don't calculate their real earnings. Here's how to factor in all expenses and understand your actual profit.",
      image: "/blog-hourly-rate.jpg",
      date: "March 10, 2024",
      readTime: "7 min read",
      category: "Finance",
    },
    {
      title: "Tax Deductions Every Rideshare Driver Should Know",
      excerpt:
        "Maximize your tax savings with these essential deductions. From mileage to phone bills, we cover everything you can write off.",
      image: "/blog-tax-deductions.jpg",
      date: "March 5, 2024",
      readTime: "6 min read",
      category: "Taxes",
    },
    {
      title: "The Best Times to Drive: Data-Driven Insights",
      excerpt:
        "We analyzed millions of trips to identify the most profitable hours and days for rideshare drivers in major cities.",
      image: "/blog-best-times.jpg",
      date: "February 28, 2024",
      readTime: "8 min read",
      category: "Analytics",
    },
    {
      title: "Multi-Platform Strategy: Uber vs Lyft vs DoorDash",
      excerpt:
        "Should you drive for multiple platforms? We break down the pros, cons, and strategies for maximizing earnings across apps.",
      image: "/blog-multi-platform.jpg",
      date: "February 20, 2024",
      readTime: "6 min read",
      category: "Strategy",
    },
    {
      title: "Essential Car Maintenance Tips for Rideshare Drivers",
      excerpt:
        "Keep your car running smoothly and avoid costly repairs with these maintenance tips specifically for high-mileage drivers.",
      image: "/blog-car-maintenance.jpg",
      date: "February 15, 2024",
      readTime: "5 min read",
      category: "Maintenance",
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
              Boosted Earnings Blog
            </h1>
            <p className="text-xl text-gold">Tips, strategies, and insights for rideshare drivers</p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card
                key={post.title}
                className="border-gold-dark/30 bg-card/50 backdrop-blur transition-all hover:border-gold hover:shadow-lg hover:shadow-gold/20"
              >
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  <div className="absolute right-4 top-4">
                    <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-black">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{post.title}</h3>
                  <p className="mb-4 text-muted-foreground">{post.excerpt}</p>
                  <Button
                    asChild
                    variant="ghost"
                    className="group p-0 text-gold hover:bg-transparent hover:text-gold-dark"
                  >
                    <Link href="#" className="flex items-center gap-2">
                      Read More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
