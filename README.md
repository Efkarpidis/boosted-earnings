# Boosted Earnings - Gig Driver Dashboard

A comprehensive full-stack Next.js application for gig economy drivers to track earnings, optimize routes, and maximize income.

## Features

### Marketing Pages
- **Home**: Hero section, features overview, testimonials, and stats
- **Features**: Detailed feature breakdown with comparisons
- **Pricing**: Subscription plans with ROI calculator
- **FAQ**: Comprehensive Q&A with accordion interface
- **Perks**: Exclusive driver benefits and discounts
- **Founders**: Team bios and company story
- **Invest**: Investment opportunity information
- **Beta Signup**: Early access registration form

### Core Application
- **Dashboard**: Real-time earnings tracking with interactive charts
  - Weekly earnings visualization
  - Platform breakdown (Uber, Lyft, DoorDash)
  - Hourly performance analysis
  - Trip volume trends
  - Performance metrics
  - Schedule management
  - Top earning zones

### Blog System
- Article listing with categories
- Individual blog posts with related content
- Newsletter signup

### Authentication & Database
- Firebase authentication (email/password)
- MongoDB for data storage
- Protected routes with middleware
- User profile management
- Earnings data API

### API Integrations
- **Argyle**: Gig platform earnings data (Uber, Lyft, DoorDash, etc.)
- **Plaid**: Bank account verification and income data
- Account connection interface
- Automatic data syncing

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Authentication**: Firebase Auth
- **Database**: MongoDB
- **APIs**: Argyle, Plaid

## Design System

- **Colors**: Black background (#0A0A0A) with gold accents
  - Primary: #EDCA3F (gold)
  - Secondary: #CA9825 (darker gold)
- **Typography**: Geist Sans & Geist Mono
- **Components**: Custom themed shadcn/ui components

## Getting Started

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your Firebase, MongoDB, Argyle, and Plaid credentials

4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

See `.env.example` for required environment variables:
- Firebase configuration
- MongoDB connection string
- Argyle API credentials
- Plaid API credentials

## Project Structure

\`\`\`
app/
├── page.tsx                 # Home page
├── features/               # Features page
├── pricing/                # Pricing page
├── faq/                    # FAQ page
├── perks/                  # Perks page
├── founders/               # Founders page
├── invest/                 # Invest page
├── beta-signup/            # Beta signup form
├── blog/                   # Blog listing & posts
├── dashboard/              # Main dashboard
│   └── connect/           # Account connection
├── login/                  # Login page
├── signup/                 # Signup page
└── api/                    # API routes
    ├── user/              # User management
    ├── earnings/          # Earnings data
    └── integrations/      # Argyle & Plaid

components/
├── navigation.tsx          # Main navigation
├── footer.tsx             # Footer component
└── ui/                    # shadcn/ui components

lib/
├── firebase.ts            # Firebase config
├── mongodb.ts             # MongoDB connection
├── auth-context.tsx       # Auth context provider
├── argyle.ts              # Argyle API client
└── plaid.ts               # Plaid API client
\`\`\`

## Features in Detail

### Dashboard Analytics
- Real-time earnings tracking
- Multi-platform support (Uber, Lyft, DoorDash, etc.)
- Interactive charts and visualizations
- Performance metrics and KPIs
- Schedule optimization
- Top earning zones analysis

### Integrations
- **Argyle**: Connects to gig platforms for automatic earnings sync
- **Plaid**: Bank account verification and transaction data
- Secure OAuth authentication
- Automatic data refresh

### Security
- Firebase authentication
- Protected API routes
- Environment variable management
- Secure token storage

## Deployment

Deploy to Vercel:

\`\`\`bash
vercel
\`\`\`

Make sure to add all environment variables in your Vercel project settings.

## License

MIT
