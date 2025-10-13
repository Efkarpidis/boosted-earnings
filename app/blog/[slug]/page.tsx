import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real app, this would fetch from a database or CMS
  const post = {
    title: "10 Proven Strategies to Maximize Your Rideshare Earnings in 2025",
    excerpt: "Learn the top strategies used by the highest-earning drivers to boost their income by 40% or more.",
    image: "/rideshare-driver-earnings-dashboard.jpg",
    category: "Earnings Tips",
    date: "January 15, 2025",
    readTime: "8 min read",
    author: "Alex Rivera",
    authorBio: "Former Uber driver and Co-Founder of Boosted Earnings",
    content: `
      <p>As a rideshare driver, maximizing your earnings isn't just about driving more hours—it's about driving smarter. After analyzing data from thousands of drivers and my own 5 years of experience, I've identified the top 10 strategies that consistently help drivers boost their income.</p>

      <h2>1. Master the Art of Multi-Apping</h2>
      <p>Running multiple apps simultaneously (Uber, Lyft, DoorDash) can increase your earnings by 30-40%. The key is learning to manage multiple platforms without overwhelming yourself. Start with two apps and gradually add more as you get comfortable.</p>

      <h2>2. Know Your Peak Hours</h2>
      <p>Data shows that certain hours consistently generate higher earnings. In most cities, these are:</p>
      <ul>
        <li>Morning rush: 7-9 AM</li>
        <li>Lunch: 11:30 AM - 1:30 PM</li>
        <li>Evening rush: 5-7 PM</li>
        <li>Late night: 10 PM - 2 AM (especially weekends)</li>
      </ul>

      <h2>3. Position Yourself Strategically</h2>
      <p>Don't just wait anywhere. Position yourself near high-demand areas like airports, business districts, entertainment venues, and hotels. Use heat maps in your driver app to identify surge zones.</p>

      <h2>4. Track Every Mile</h2>
      <p>Proper mileage tracking can save you thousands in taxes. The standard mileage deduction is 67¢ per mile in 2025. If you drive 30,000 miles per year, that's $20,100 in deductions.</p>

      <h2>5. Optimize Your Acceptance Rate</h2>
      <p>Learn which rides are worth accepting. Consider distance, direction, and potential earnings. Don't be afraid to decline rides that don't make financial sense, but be strategic about maintaining your acceptance rate for platform bonuses.</p>

      <h2>6. Take Advantage of Bonuses and Promotions</h2>
      <p>Platforms regularly offer quest bonuses, streak bonuses, and surge pricing. Plan your driving schedule around these opportunities. A well-timed bonus can add $100-300 to your weekly earnings.</p>

      <h2>7. Maintain Your Vehicle Properly</h2>
      <p>Regular maintenance prevents costly breakdowns and keeps you on the road. Follow a strict maintenance schedule and address issues immediately. A breakdown can cost you days of earnings.</p>

      <h2>8. Provide Excellent Service</h2>
      <p>Higher ratings lead to more ride requests and better opportunities. Keep your car clean, offer amenities like phone chargers and water, and maintain a friendly demeanor. Aim for a 4.9+ rating.</p>

      <h2>9. Use Data to Make Decisions</h2>
      <p>Track your earnings by hour, day, and location. Identify patterns and adjust your strategy accordingly. Tools like Boosted Earnings can help you analyze this data and make informed decisions.</p>

      <h2>10. Set Goals and Track Progress</h2>
      <p>Set specific, measurable goals for daily, weekly, and monthly earnings. Track your progress and adjust your strategy as needed. Having clear goals keeps you motivated and focused.</p>

      <h2>Conclusion</h2>
      <p>Implementing these strategies can significantly boost your earnings. Start with one or two strategies and gradually incorporate more as you become comfortable. Remember, consistency is key—small improvements compound over time.</p>

      <p>Ready to take your earnings to the next level? Try Boosted Earnings free for 14 days and see how our tools can help you implement these strategies effectively.</p>
    `,
  }

  const relatedPosts = [
    {
      slug: "tax-deductions-guide",
      title: "The Ultimate Tax Deduction Guide for Gig Drivers",
      image: "/tax-documents.png",
    },
    {
      slug: "best-times-to-drive",
      title: "Data Analysis: The Best Times to Drive in Major Cities",
      image: "/busy-city-intersection.png",
    },
    {
      slug: "multi-apping-strategy",
      title: "Multi-Apping 101: How to Run Multiple Platforms",
      image: "/smartphone-apps.jpg",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Back Button */}
      <section className="border-b border-border py-6">
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {post.category}
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold md:text-5xl">{post.title}</h1>
            <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10" />
                <div>
                  <div className="font-semibold text-foreground">{post.author}</div>
                  <div className="text-xs">{post.authorBio}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
              <Button variant="ghost" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="mb-12 w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                color: "var(--color-foreground)",
              }}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-y border-border bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold">Ready to Boost Your Earnings?</h2>
            <p className="mb-6 text-muted-foreground">
              Join thousands of drivers using Boosted Earnings to maximize their income.
            </p>
            <Button asChild size="lg">
              <Link href="/beta-signup">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-2xl font-bold">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.slug} className="overflow-hidden border-border bg-card">
                  <img
                    src={relatedPost.image || "/placeholder.svg"}
                    alt={relatedPost.title}
                    className="h-40 w-full object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="mb-2 text-balance text-sm font-semibold">{relatedPost.title}</h3>
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Read More →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
