import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FAQPage() {
  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I sign up for Boosted Earnings?",
          a: 'Simply click the "Join Beta" button and fill out the registration form. You\'ll receive access within 24 hours. No credit card required for the free trial.',
        },
        {
          q: "Which platforms does Boosted Earnings support?",
          a: "We currently support Uber, Lyft, DoorDash, Uber Eats, Grubhub, Instacart, and more. We're constantly adding new platform integrations based on user requests.",
        },
        {
          q: "Do I need to manually enter my earnings?",
          a: "No! Boosted Earnings automatically syncs with your gig platform accounts. Once connected, your earnings, trips, and mileage are tracked automatically.",
        },
        {
          q: "Is there a mobile app?",
          a: "Yes! We have native iOS and Android apps available for download. You can access all features on the go, including real-time tracking and notifications.",
        },
      ],
    },
    {
      category: "Features & Functionality",
      questions: [
        {
          q: "How does the mileage tracking work?",
          a: "Our app uses GPS to automatically track your miles while you're driving. It categorizes trips as business or personal, and generates IRS-compliant mileage logs for tax deductions.",
        },
        {
          q: "What is route optimization?",
          a: "Our AI analyzes historical data, demand patterns, and surge pricing to recommend the best times and locations to drive. This helps you maximize your earnings per hour.",
        },
        {
          q: "Can I track expenses?",
          a: "Yes! You can log expenses like gas, car maintenance, phone bills, and more. The app categorizes them and calculates your net earnings after expenses.",
        },
        {
          q: "How accurate are the earnings forecasts?",
          a: "Our forecasts are based on your historical data, market trends, and seasonal patterns. On average, our predictions are accurate within 10-15% of actual earnings.",
        },
      ],
    },
    {
      category: "Privacy & Security",
      questions: [
        {
          q: "Is my data secure?",
          a: "Absolutely. We use bank-level 256-bit encryption to protect your data. All connections are secured with SSL/TLS, and we never store your gig platform passwords.",
        },
        {
          q: "Do you sell my data to third parties?",
          a: "Never. Your data is yours. We do not sell, rent, or share your personal information with third parties for marketing purposes.",
        },
        {
          q: "How do you connect to my gig platform accounts?",
          a: "We use secure OAuth authentication or read-only API access. This means we can view your earnings data but cannot make changes to your account or access sensitive information.",
        },
        {
          q: "Can I delete my data?",
          a: "Yes. You can request to delete your account and all associated data at any time from the settings page. We'll permanently remove your information within 30 days.",
        },
      ],
    },
    {
      category: "Billing & Subscription",
      questions: [
        {
          q: "How much does Boosted Earnings cost?",
          a: "We offer a 14-day free trial, then $9.99/month or $99/year (save 17%). You can cancel anytime with no cancellation fees.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards (Visa, Mastercard, American Express, Discover) and PayPal.",
        },
        {
          q: "Can I cancel my subscription?",
          a: "Yes, you can cancel anytime from your account settings. Your subscription will remain active until the end of your billing period.",
        },
        {
          q: "Do you offer refunds?",
          a: "We offer a 30-day money-back guarantee. If you're not satisfied with Boosted Earnings, contact support for a full refund.",
        },
      ],
    },
    {
      category: "Tax & Reporting",
      questions: [
        {
          q: "Can Boosted Earnings help with my taxes?",
          a: "Yes! We track all your income, expenses, and mileage throughout the year. You can generate IRS-compliant reports and export data to TurboTax or your accountant.",
        },
        {
          q: "What tax deductions can I track?",
          a: "You can track mileage (standard or actual method), vehicle expenses, phone bills, supplies, and other business-related expenses. Our app helps you maximize your deductions.",
        },
        {
          q: "Do you provide quarterly tax estimates?",
          a: "Yes! Based on your earnings and expenses, we calculate estimated quarterly tax payments to help you avoid penalties and stay on top of your tax obligations.",
        },
        {
          q: "Can I export my data?",
          a: "Absolutely. You can export your earnings, expenses, and mileage data in CSV, PDF, or Excel format at any time.",
        },
      ],
    },
    {
      category: "Support",
      questions: [
        {
          q: "How do I contact support?",
          a: "You can reach our support team via email at support@boostedearnings.com or through the in-app chat. Premium subscribers get priority support with faster response times.",
        },
        {
          q: "What are your support hours?",
          a: "Our support team is available Monday-Friday, 9am-6pm EST. Premium subscribers have access to extended support hours and weekend support.",
        },
        {
          q: "Do you offer training or tutorials?",
          a: "Yes! We have a comprehensive help center with video tutorials, guides, and best practices. We also offer live onboarding sessions for new users.",
        },
        {
          q: "Can I request new features?",
          a: "We love hearing from our users. You can submit feature requests through the app or email us. We regularly implement user-requested features.",
        },
      ],
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="border-b border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-balance text-4xl font-bold md:text-5xl">
              Frequently Asked <span className="text-primary">Questions</span>
            </h1>
            <p className="text-pretty text-lg text-muted-foreground">
              Find answers to common questions about Boosted Earnings. Can't find what you're looking for? Contact our
              support team.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-12">
            {faqs.map((category) => (
              <div key={category.category}>
                <h2 className="mb-6 text-2xl font-bold">{category.category}</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.category}-${index}`}
                      className="rounded-lg border border-border bg-card px-6"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">{faq.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support CTA */}
      <section className="border-t border-border bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Still Have Questions?</h2>
            <p className="mb-8 text-muted-foreground">
              Our support team is here to help. Get in touch and we'll respond within 24 hours.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg">Contact Support</Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/beta-signup">Start Free Trial</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
