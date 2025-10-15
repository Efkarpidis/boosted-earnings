import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Globe } from "lucide-react"
import Image from "next/image"

export default function FoundersPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center text-gold">Meet the Founder</h1>
          <p className="text-xl text-muted-foreground mb-16 text-center text-balance">
            The story behind Boosted Earnings
          </p>

          <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="md:col-span-1">
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden border-2 border-gold/30 mb-4">
                    <Image src="/professional-headshot-of-founder-chris-efkarpidis.jpg" alt="Chris Efkarpidis" fill className="object-cover" />
                  </div>
                  <h2 className="text-2xl font-bold text-gold mb-2">Chris Efkarpidis</h2>
                  <p className="text-muted-foreground mb-4">Founder & CEO</p>
                  <div className="flex gap-4">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:text-gold-dark transition-colors"
                    >
                      <Linkedin size={24} />
                    </a>
                    <a
                      href="https://boostedearnings.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold hover:text-gold-dark transition-colors"
                    >
                      <Globe size={24} />
                    </a>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-2xl font-semibold mb-4 text-gold">The Journey</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Chris Efkarpidis is a seasoned rideshare driver and entrepreneur who spent years navigating the
                      complexities of the gig economy. After countless hours behind the wheel, he recognized a critical
                      gap in the tools available to drivers.
                    </p>
                    <p>
                      "I was juggling multiple apps, trying to track my earnings across different platforms, and
                      struggling to understand when and where I was making the most money," Chris recalls. "I knew there
                      had to be a better way."
                    </p>
                    <p>
                      That realization sparked the creation of Boosted Earnings. Drawing from his firsthand experience
                      and deep understanding of driver needs, Chris built a platform that addresses the real challenges
                      faced by gig economy workers every day.
                    </p>
                    <p>
                      With a background in technology and a passion for helping fellow drivers succeed, Chris has
                      assembled a team dedicated to creating the most comprehensive earnings tracking and optimization
                      platform in the industry.
                    </p>
                  </div>

                  <div className="mt-8 p-6 bg-gold/10 rounded-lg border border-gold/30">
                    <h4 className="text-xl font-semibold mb-3 text-gold">Mission Statement</h4>
                    <p className="text-foreground italic">
                      "Our mission is to empower gig economy workers with the tools and insights they need to maximize
                      their earnings and take control of their financial future. Every driver deserves access to
                      professional-grade analytics and optimization tools."
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
