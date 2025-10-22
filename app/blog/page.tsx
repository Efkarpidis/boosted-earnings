import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BlogPage() {
  const posts = [
    {
      title: "10 Tips to Maximize Your Rideshare Earnings in 2024",
      excerpt: "Learn the strategies top drivers use to boost their hourly earnings and work smarter, not harder.",
      author: "Chris Efkarpidis",
      date: "Jan 15, 2024",
      readTime: "5 min read",
      category: "Tips & Tricks",
      image: "/rideshare-driver-tips-blog-post.jpg",
      slug: "maximize-rideshare-earnings-2024",
    },
    {
      title: "Understanding Peak Hours: When to Drive for Maximum Profit",
      excerpt: "Data-driven insights into the best times to drive in major cities across the country.",
      author: "Sarah Johnson",
      date: "Jan 12, 2024",
      readTime: "7 min read",
      category: "Analytics",
      image: "/peak-hours-analytics-blog-post.jpg",
      slug: "understanding-peak-hours",
    },
    {
      title: "Tax Season Guide for Gig Economy Workers",
      excerpt:
        "Everything you need to know about filing taxes as a rideshare driver, including deductions and credits.",
      author: "Michael Chen",
      date: "Jan 10, 2024",
      readTime: "10 min read",
      category: "Finance",
      image: "/tax-guide-for-gig-workers.jpg",
      slug: "tax-season-guide-gig-workers",
    },
    {
      title: "Multi-Platform Strategy: Uber vs Lyft vs DoorDash",
      excerpt:
        "Compare earnings potential across different platforms and learn how to optimize your multi-app strategy.",
      author: "Chris Efkarpidis",
      date: "Jan 8, 2024",
      readTime: "6 min read",
      category: "Strategy",
      image: "/multi-platform-comparison-blog.jpg",
      slug: "multi-platform-strategy",
    },
    {
      title: "The Future of Gig Economy: Trends to Watch in 2024",
      excerpt: "Industry insights and predictions for the rideshare and delivery economy in the coming year.",
      author: "Sarah Johnson",
      date: "Jan 5, 2024",
      readTime: "8 min read",
      category: "Industry News",
      image: "/future-of-gig-economy-2024.jpg",
      slug: "future-gig-economy-2024",
    },
    {
      title: "Vehicle Maintenance Tips for Rideshare Drivers",
      excerpt: "Keep your car in top condition and reduce maintenance costs with these essential tips.",
      author: "Michael Chen",
      date: "Jan 3, 2024",
      readTime: "5 min read",
      category: "Maintenance",
      image: "/vehicle-maintenance-tips-blog.jpg",
      slug: "vehicle-maintenance-tips",
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gold">Blog</h1>
            <p className="text-xl text-muted-foreground text-balance">
              Tips, insights, and strategies to help you succeed in the gig economy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card
                key={post.slug}
                className="bg-card/50 backdrop-blur-sm border-gold/20 hover:border-gold/50 transition-all group"
              >
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gold text-black text-xs font-bold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gold mb-3 group-hover:text-gold-dark transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <Button
                        variant="outline"
                        className="w-full border-gold text-gold hover:bg-gold hover:text-black bg-transparent group"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
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
