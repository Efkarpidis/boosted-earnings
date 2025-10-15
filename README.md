# 🚀 Boosted Earnings - Rideshare Dashboard

A comprehensive full-stack Next.js application designed to help rideshare drivers track, analyze, and maximize their earnings across multiple platforms including Uber, Lyft, DoorDash, and more.

## ✨ Features

- 🚗 **Multi-Platform Integration** - Connect Uber, Lyft, DoorDash, Instacart, and more
- 📊 **Real-Time Analytics** - Interactive charts showing daily earnings, peak hours, and platform breakdowns
- 💰 **Expense Tracking** - Track gas, maintenance, and other expenses with Plaid integration
- 📈 **Profit Calculations** - Automatic net profit and hourly rate calculations
- 🔐 **Secure Authentication** - Firebase Auth with email/password login
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop
- 🎨 **Premium UI** - Sleek black and gold theme with matrix-like dark mode
- 🔔 **Beta Program** - Early access signup with Firestore integration

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI
- **Authentication**: Firebase Auth
- **Database**: 
  - Firebase Firestore (beta signups, submissions)
  - MongoDB Atlas (user data, earnings history)
- **Charts**: Recharts
- **Integrations**: 
  - Argyle API (rideshare platform connections)
  - Plaid (bank account linking)
- **Fonts**: Poppins (Google Fonts)

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- Firebase project with Authentication and Firestore enabled
- MongoDB Atlas account (or local MongoDB instance)
- Argyle developer account (for rideshare integrations)
- Plaid developer account (for bank connections)

## 🚀 Getting Started

### 1. Clone and Install

\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd boosted-earnings

# Install dependencies
npm install
\`\`\`

### 2. Environment Setup

Copy the `.env.example` file to `.env.local`:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Fill in all required environment variables:

#### Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or select existing
3. Enable **Authentication** (Email/Password provider)
4. Enable **Cloud Firestore**
5. Go to Project Settings > General
6. Copy all config values to your `.env.local`

#### MongoDB Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get connection string and add to `MONGODB_URI`

#### Argyle Setup
1. Sign up at [Argyle Console](https://console.argyle.com)
2. Create a new application
3. Copy API Key, Client ID, and Client Secret
4. Set callback URL: `https://yourdomain.com/api/argyle/callback`
5. Enable scopes: `earnings:read`, `employment:read`, `identity:read`

#### Plaid Setup
1. Sign up at [Plaid Dashboard](https://dashboard.plaid.com)
2. Get your Client ID and Secret (start with Sandbox)
3. Set redirect URI: `https://yourdomain.com/api/plaid/callback`
4. Set webhook URL: `https://yourdomain.com/api/plaid/webhook`

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

\`\`\`
boosted-earnings/
├── app/
│   ├── api/                    # API Routes
│   │   ├── argyle/
│   │   │   ├── connect/        # Connect rideshare platforms
│   │   │   └── earnings/       # Fetch earnings data
│   │   ├── plaid/
│   │   │   ├── link/           # Generate Plaid Link token
│   │   │   └── exchange/       # Exchange public token
│   │   └── users/              # User CRUD operations
│   ├── beta-signup/            # Beta tester signup page
│   ├── blog/                   # Blog posts and articles
│   ├── dashboard/              # Protected earnings dashboard
│   ├── faq/                    # Frequently asked questions
│   ├── features/               # Platform features showcase
│   ├── founders/               # Founder profile page
│   ├── invest/                 # Investment inquiry page
│   ├── login/                  # User login page
│   ├── perks/                  # Member perks and benefits
│   ├── pricing/                # Pricing plans
│   ├── signup/                 # User registration page
│   ├── layout.tsx              # Root layout with fonts
│   ├── globals.css             # Global styles and theme
│   └── page.tsx                # Home page
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── tabs.tsx
│   │   └── ...
│   ├── header.tsx              # Global navigation header
│   ├── footer.tsx              # Global footer
│   └── protected-route.tsx     # Auth guard wrapper
├── lib/
│   ├── firebase.ts             # Firebase configuration
│   ├── mongodb.ts              # MongoDB connection
│   ├── auth-context.tsx        # Authentication context
│   ├── location-data.ts        # Country/state/city data
│   └── utils.ts                # Utility functions
├── public/                     # Static assets (images)
├── .env.example                # Environment variables template
├── .env.local                  # Your local environment (gitignored)
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
\`\`\`

## 🔌 API Routes

### Argyle Integration
- `POST /api/argyle/connect` - Connect a rideshare platform account
  - Body: `{ userId, platform, accountId }`
  - Returns: Connection status

- `GET /api/argyle/earnings?userId={id}` - Fetch earnings data
  - Query: `userId` (required)
  - Returns: Earnings history and analytics

### Plaid Integration
- `POST /api/plaid/link` - Generate Plaid Link token
  - Body: `{ userId }`
  - Returns: `{ linkToken }`

- `POST /api/plaid/exchange` - Exchange public token for access token
  - Body: `{ publicToken, userId }`
  - Returns: Account connection status

### User Management
- `GET /api/users?userId={id}` - Get user data
- `POST /api/users` - Create new user
- `PUT /api/users` - Update user data
- `DELETE /api/users?userId={id}` - Delete user

## 📜 Available Scripts

\`\`\`bash
# Development
npm run dev          # Start development server on localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
\`\`\`

## 🏗️ Key Pages and Routes

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Home page with hero and features | No |
| `/beta-signup` | Beta tester registration | No |
| `/login` | User login | No |
| `/signup` | User registration | No |
| `/dashboard` | Earnings dashboard with charts | Yes |
| `/pricing` | Pricing plans (Free, Pro, Enterprise) | No |
| `/features` | Platform features showcase | No |
| `/faq` | Frequently asked questions | No |
| `/perks` | Member benefits and discounts | No |
| `/blog` | Blog articles and tips | No |
| `/founders` | Founder profile and mission | No |
| `/invest` | Investment inquiry form | No |

## 🔍 Quick Health Check

After setup, verify everything is working:

### 1. Environment Variables
\`\`\`bash
# Check if all required vars are set
node -e "console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Firebase configured' : '❌ Firebase missing')"
node -e "console.log(process.env.MONGODB_URI ? '✅ MongoDB configured' : '❌ MongoDB missing')"
\`\`\`

### 2. Firebase Connection
- Visit `/signup` and try creating an account
- Check Firebase Console > Authentication for new user
- Check Firestore for any test submissions

### 3. MongoDB Connection
- Check server logs for "MongoDB connected successfully"
- Visit `/api/users` to test API connection

### 4. UI Components
- Visit `/` - Home page should load with black/gold theme
- Visit `/dashboard` - Should redirect to login (protected route)
- Visit `/beta-signup` - Form should have country/state/city selects

### 5. Charts and Data
- Login and visit `/dashboard`
- Charts should render with gold colors (not blacked out)
- Stat cards should show placeholder data

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Add all environment variables from `.env.local`
4. Deploy!

\`\`\`bash
# Or use Vercel CLI
npm i -g vercel
vercel
\`\`\`

### Environment Variables for Production

Make sure to update these for production:
- `PLAID_ENV=production` (after Plaid approval)
- `NEXT_PUBLIC_APP_URL=https://yourdomain.com`
- Update Firebase, Argyle, and Plaid callback URLs

## 🐛 Troubleshooting

### Charts appear blacked out
- Ensure you're using the gold color scheme (`#EDCA3F`, `#CA9825`)
- Check that chart data has valid numeric values
- Verify Recharts components have proper `fill` and `stroke` props

### Firebase authentication not working
- Verify all `NEXT_PUBLIC_FIREBASE_*` variables are set
- Check Firebase Console > Authentication is enabled
- Ensure Email/Password provider is enabled

### MongoDB connection fails
- Check connection string format
- Verify IP whitelist in MongoDB Atlas
- Ensure database user has read/write permissions

### Argyle/Plaid integration errors
- Verify API keys are correct
- Check callback URLs match your domain
- Ensure required scopes are enabled

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📧 Support

For questions or support, contact: support@boostedearnings.com

---

Built with ❤️ for rideshare drivers everywhere
