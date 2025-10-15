import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

export default function FAQPage() {
  const faqs = [
    {
      question: "How does Boosted Earnings work?",
      answer:
        "Boosted Earnings connects to your rideshare and delivery platform accounts through secure API integrations. Once connected, we automatically sync your earnings data and provide real-time analytics, expense tracking, and insights to help you maximize your income.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use bank-level encryption (256-bit SSL) to protect your data. We never store your platform login credentials - we use secure OAuth connections. Your financial data is encrypted both in transit and at rest, and we're fully compliant with industry security standards.",
    },
    {
      question: "Which platforms do you support?",
      answer:
        "We currently support Uber, Lyft, DoorDash, Uber Eats, Grubhub, Instacart, and more. We're constantly adding new platforms based on user demand. If there's a platform you'd like us to support, let us know!",
    },
    {
      question: "Do I need to manually enter my earnings?",
      answer:
        "No! Once you connect your platforms, all earnings data syncs automatically. You'll never need to manually enter trip or delivery information. However, you can manually add expenses like gas and maintenance.",
    },
    {
      question: "How much does it cost?",
      answer:
        "We offer a free plan with basic features, and our Pro plan is $9.99/month with advanced analytics, unlimited platform connections, and tax tools. All plans include a 14-day free trial with no credit card required.",
    },
    {
      question: "Can I track expenses?",
      answer:
        "Yes! You can track all your driving-related expenses including gas, maintenance, insurance, car washes, and more. Our expense tracking helps you calculate your true net profit and prepare for tax season.",
    },
    {
      question: "Does Boosted Earnings help with taxes?",
      answer:
        "Yes! Our Pro plan includes tax preparation tools that generate tax-ready reports with mileage tracking, expense categorization, and deduction calculations. We help you maximize your deductions and make tax time easier.",
    },
    {
      question: "Is there a mobile app?",
      answer:
        "Yes! We have native iOS and Android apps so you can track your earnings on the go. The mobile app syncs seamlessly with the web dashboard.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Absolutely. There are no long-term contracts or cancellation fees. You can cancel your subscription at any time from your account settings, and you'll retain access until the end of your billing period.",
    },
    {
      question: "What if I drive for multiple platforms?",
      answer:
        "Perfect! Boosted Earnings is designed for multi-platform drivers. You can connect unlimited platforms on our Pro plan and see all your earnings in one unified dashboard. We'll even show you which platforms are most profitable for you.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply sign up for a free account, connect your rideshare/delivery platforms, and start tracking! The entire setup process takes less than 5 minutes. Join our beta program to get early access and exclusive benefits.",
    },
    {
      question: "Do you offer support?",
      answer:
        "Yes! We offer email support for all users, and Pro plan subscribers get priority support with faster response times. We're here to help you succeed.",
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
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gold">Everything you need to know about Boosted Earnings</p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Card className="border-gold-dark/30 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-gold-dark/30">
                      <AccordionTrigger className="text-left text-gold hover:text-gold-dark">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
