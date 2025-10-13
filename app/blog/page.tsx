import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"

export default function BlogPage() {
  const featuredPost = {
    slug: "maximize-earnings-2025",
    title: "10 Proven Strategies to Maximize Your Rideshare Earnings in 2025",
    excerpt:
      "Learn the top strategies used by the highest-earning drivers to boost their income by 40% or more. From optimal driving times to platform-specific tips.",
    image: "/rideshare-driver-earnings-dashboard.jpg",
    category: "Earnings Tips",
    date: "January 15, 2025",
    readTime: "8 min read",
    author: "Alex Rivera",
  }

  const posts = [
    {
      slug: "tax-deductions-guide",
      title: "The Ultimate Tax Deduction Guide for Gig Drivers",
      excerpt:
        "Maximize your tax savings with this comprehensive guide to deductions. Learn what you can write off and how to track everything properly.",
      image: "/tax-documents-calculator.png",
      category: "Taxes",
      date: "January 12, 2025",
      readTime: "10 min read",
      author: "Maya Chen",
    },
    {
      slug: "best-times-to-drive",
      title: "Data Analysis: The Best Times to Drive in Major Cities",
      excerpt:
        "We analyzed millions of trips to find the optimal driving times in the top 20 US cities. See when you should be on the road.",
      image: "/city-traffic-heatmap.jpg",
      category: "Earnings Tips",
      date: "January 10, 2025",
      readTime: "6 min read",
      author: "Jordan Williams",
    },
    {
      slug: "vehicle-maintenance-schedule",
      title: "Essential Vehicle Maintenance Schedule for Rideshare Drivers",
      excerpt:
        "Keep your car running smoothly and avoid costly repairs with this maintenance schedule designed specifically for high-mileage drivers.",
      image: "/car-maintenance-mechanic.jpg",
      category: "Vehicle Care",
      date: "January 8, 2025",
      readTime: "7 min read",
      author: "Alex Rivera",
    },
    {
      slug: "multi-apping-strategy",
      title: "Multi-Apping 101: How to Run Multiple Platforms Simultaneously",
      excerpt:
        "Learn the art of multi-apping to maximize your earnings. Tips for juggling Uber, Lyft, and DoorDash without getting overwhelmed.",
      image: "/smartphone-multiple-apps.jpg",
      category: "Earnings Tips",
      date: "January 5, 2025",
      readTime: "9 min read",
      author: "Maya Chen",
    },
    {
      slug: "quarterly-tax-payments",
      title: "How to Calculate and Pay Quarterly Taxes as a Gig Worker",
      excerpt:
        "Avoid penalties and stay compliant with this step-by-step guide to quarterly tax payments for independent contractors.",
      image: "/tax-forms-payment.jpg",
      category: "Taxes",
      date: "January 3, 2025",
      readTime: "8 min read",
      author: "Jordan Williams",
    },
    {
      slug: "customer-ratings-tips",
      title: "5-Star Service: How to Maintain Perfect Customer Ratings",
      excerpt:
        "Your rating affects your earnings. Learn the secrets to consistently delivering 5-star service and keeping customers happy.",
      image: "/5-star-rating-customer-service.jpg",
      category: "Driver Tips",
      date: "December 30, 2024",
      readTime: "5 min read",
      author: "Alex Rivera",
    },
  ]

  const categories = ["All", "Earnings Tips", "Taxes", "Vehicle Care", "Driver Tips", "Market Insights"]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="border-b border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-balance text-4xl font-bold md:text-5xl">
              The <span className="text-primary">Boosted Earnings</span> Blog
            </h1>
            <p className="text-pretty text-lg text-muted-foreground">
              Expert tips, strategies, and insights to help you maximize your gig economy earnings.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border bg-card py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-4 text-sm font-semibold text-primary">Featured Article</div>
          <Card className="overflow-hidden border-border bg-card">
            <div className="grid md:grid-cols-2">
              <img
                src={featuredPost.image || "/placeholder.svg"}
                alt={featuredPost.title}
                className="h-full w-full object-cover"
              />
              <CardContent className="flex flex-col justify-center p-8">
                <div className="mb-3 inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {featuredPost.category}
                </div>
                <h2 className="mb-4 text-balance text-2xl font-bold md:text-3xl">{featuredPost.title}</h2>
                <p className="mb-6 text-muted-foreground">{featuredPost.excerpt}</p>
                <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <Button asChild>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="border-t border-border py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-3xl font-bold">Recent Articles</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.slug} className="overflow-hidden border-border bg-card transition-all hover:shadow-lg">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="h-48 w-full object-cover" />
                <CardContent className="p-6">
                  <div className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {post.category}
                  </div>
                  <h3 className="mb-3 text-balance text-xl font-semibold">{post.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{post.excerpt}</p>
                  <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
                  >
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="border-t border-border bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Never Miss an Update</h2>
            <p className="mb-8 text-muted-foreground">
              Subscribe to our newsletter for weekly tips, strategies, and insights delivered to your inbox.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-80"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
