"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

export default function FAQPage() {
  const faqs = [
    {
      question: "How does Boosted Earnings work?",
      answer:
        "Boosted Earnings connects to your rideshare and delivery platform accounts through secure APIs (Argyle and Plaid). Once connected, we automatically track your earnings, hours worked, and trips across all platforms in real-time. Our dashboard provides comprehensive analytics and insights to help you optimize your earnings.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use bank-level 256-bit SSL encryption to protect your data. We never store your platform login credentials - we use secure OAuth connections. Your data is encrypted both in transit and at rest, and we never share your information with third parties.",
    },
    {
      question: "Which platforms do you support?",
      answer:
        "We currently support Uber, Lyft, DoorDash, Uber Eats, Grubhub, and Instacart. We're constantly adding new platforms based on user demand. If there's a platform you'd like us to support, let us know!",
    },
    {
      question: "How much does it cost?",
      answer:
        "We offer a free plan that includes basic features and tracking for up to 2 platforms. Our Pro plan is $9.99/month and includes unlimited platforms, advanced analytics, tax tools, and priority support. All plans include a 14-day free trial.",
    },
    {
      question: "Can I track multiple platforms at once?",
      answer:
        "Yes! That's one of our core features. You can connect and track earnings from multiple platforms simultaneously. Our dashboard shows you a unified view of all your earnings, making it easy to see which platforms are most profitable.",
    },
    {
      question: "Do you offer a mobile app?",
      answer:
        "Yes, we have native iOS and Android apps that sync with your web dashboard. You can track your earnings, view analytics, and receive notifications on the go. All your data syncs automatically across all devices.",
    },
    {
      question: "How do the tax preparation tools work?",
      answer:
        "Our tax tools automatically track your earnings, deductible expenses, and mileage throughout the year. At tax time, you can generate comprehensive reports that include all the information you need for filing. We also provide guidance on common deductions for gig workers.",
    },
    {
      question: "What are peak hour predictions?",
      answer:
        "Using historical data and machine learning, we analyze patterns in your market to predict when demand will be highest. You'll receive notifications about upcoming peak hours and surge pricing opportunities, helping you maximize your earnings.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time with no penalties or fees. If you cancel, you'll continue to have access to Pro features until the end of your billing period. You can also downgrade to our free plan if you prefer.",
    },
    {
      question: "Do you offer support?",
      answer:
        "Yes! Free plan users get email support with responses within 24-48 hours. Pro plan users get priority support with faster response times. Enterprise customers get dedicated account managers and phone support.",
    },
    {
      question: "How accurate is the earnings tracking?",
      answer:
        "Our earnings tracking is highly accurate as we pull data directly from your platform accounts through official APIs. The data you see in Boosted Earnings matches what you see in your platform apps. We update earnings in real-time as you complete trips.",
    },
    {
      question: "What if I have issues connecting my accounts?",
      answer:
        "If you experience any issues connecting your accounts, our support team is here to help. Most connection issues are resolved quickly by re-authenticating or checking your platform account settings. We provide step-by-step guides for each platform.",
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gold">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground text-balance">
              Find answers to common questions about Boosted Earnings
            </p>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-gold/20">
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-gold/20">
                    <AccordionTrigger className="text-left text-gold hover:text-gold-dark">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <a href="mailto:support@boostedearnings.com" className="text-gold hover:text-gold-dark font-semibold">
              Contact our support team
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
