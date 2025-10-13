import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Twitter } from "lucide-react"

export default function FoundersPage() {
  const founders = [
    {
      name: "Alex Rivera",
      role: "Co-Founder & CEO",
      bio: "Former Uber driver turned entrepreneur. Alex spent 5 years driving full-time and saw firsthand the challenges drivers face. With a background in software engineering, he built Boosted Earnings to help drivers maximize their income.",
      image: "/male-ceo-headshot.png",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Maya Chen",
      role: "Co-Founder & CTO",
      bio: "Data scientist with 10+ years at Google and Tesla. Maya specializes in machine learning and predictive analytics. She leads our engineering team in building intelligent features that help drivers make data-driven decisions.",
      image: "/female-cto-headshot.png",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Jordan Williams",
      role: "Co-Founder & COO",
      bio: "Operations expert with experience scaling startups from 0 to millions of users. Jordan previously led operations at DoorDash and brings deep knowledge of the gig economy to Boosted Earnings.",
      image: "/coo-headshot.png",
      linkedin: "#",
      twitter: "#",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="border-b border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-balance text-4xl font-bold md:text-5xl">Meet the Founders</h1>
            <p className="text-pretty text-lg text-muted-foreground">
              We're a team of former drivers, engineers, and operators on a mission to empower gig economy workers.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Boosted Earnings was born from a simple frustration: as rideshare drivers, we were working hard but had
                no clear visibility into our true earnings, expenses, or how to optimize our time on the road.
              </p>
              <p>
                After countless hours tracking spreadsheets and trying different apps that fell short, we decided to
                build the solution ourselves. We combined our expertise in software engineering, data science, and
                operations to create a platform that truly understands what drivers need.
              </p>
              <p>
                Today, Boosted Earnings helps over 50,000 drivers across the country maximize their income, save time,
                and make smarter decisions about their work. We're just getting started.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="border-y border-border bg-card py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Leadership Team</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {founders.map((founder) => (
              <Card key={founder.name} className="border-border bg-background">
                <CardContent className="pt-6">
                  <img
                    src={founder.image || "/placeholder.svg"}
                    alt={founder.name}
                    className="mb-4 h-48 w-full rounded-lg object-cover"
                  />
                  <h3 className="mb-1 text-xl font-semibold">{founder.name}</h3>
                  <div className="mb-3 text-sm text-primary">{founder.role}</div>
                  <p className="mb-4 text-sm text-muted-foreground">{founder.bio}</p>
                  <div className="flex gap-3">
                    <a href={founder.linkedin} className="text-muted-foreground hover:text-primary">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href={founder.twitter} className="text-muted-foreground hover:text-primary">
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold">Our Values</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-primary">Driver-First</h3>
                <p className="text-sm text-muted-foreground">
                  Every decision we make starts with asking: "How does this help drivers earn more?"
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-primary">Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  We believe in clear pricing, honest communication, and no hidden fees.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-primary">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  We're constantly pushing the boundaries of what's possible with data and technology.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-primary">Community</h3>
                <p className="text-sm text-muted-foreground">
                  We're building more than an app—we're building a community of empowered drivers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
