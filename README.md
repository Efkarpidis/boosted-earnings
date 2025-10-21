# Boosted Earnings - Ride-Share Dashboard

A comprehensive Next.js 15 application for tracking and optimizing rideshare earnings across multiple platforms (Uber, Lyft, DoorDash, Uber Eats).

## Features

- Firebase Authentication (Email Link / Passwordless)
- Plaid Integration for bank account connections (Sandbox mode)
- Real-time earnings tracking and analytics
- Interactive charts with Recharts
- MongoDB data storage
- Responsive design with Tailwind CSS
- Dark theme with gold accents

## Prerequisites

- Node.js 18+ or 20+
- pnpm (recommended) or npm
- MongoDB database
- Firebase project
- Plaid account (for sandbox testing)

## Installation

### 1. Clone the repository

\`\`\`bash
git clone https://github.com/Efkarpidis/boosted-earnings.git
cd boosted-earnings
git checkout v3-final
\`\`\`

### 2. Install dependencies

**IMPORTANT**: Run this command to fix the build failure and synchronize package.json with pnpm-lock.yaml:

\`\`\`bash
pnpm install
\`\`\`

This will regenerate the `pnpm-lock.yaml` file with the correct dependencies including `@plaid/react-plaid-link` and `plaid`.

If you don't have pnpm installed:

\`\`\`bash
npm install -g pnpm
\`\`\`

### 3. Environment Variables

Copy the `.env.local` file and ensure it has the following variables:

\`\`\`bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string

# Plaid Configuration (Sandbox)
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
PLAID_ENV=sandbox
\`\`\`

### 4. Run the development server

\`\`\`bash
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Fixing the Vercel Build Failure

The build failure `ERR_PNPM_OUTDATED_LOCKFILE` occurs when `package.json` has dependencies that don't match `pnpm-lock.yaml`.

**Solution:**

1. Ensure you're using the correct Node.js version (18+ or 20+)
2. Run `pnpm install` to regenerate the lock file
3. Commit both `package.json` and `pnpm-lock.yaml` to git
4. Push to your repository

\`\`\`bash
pnpm install
git add package.json pnpm-lock.yaml
git commit -m "Fix: Synchronize pnpm-lock.yaml with package.json"
git push origin v3-final
\`\`\`

## Plaid Integration

This app uses Plaid in **sandbox mode** for testing bank connections.

### Getting Plaid Credentials

1. Sign up at [https://dashboard.plaid.com/](https://dashboard.plaid.com/)
2. Create a new application
3. Get your `client_id` and `secret` from the Keys section
4. Set `PLAID_ENV=sandbox` in your `.env.local`

### Testing with Plaid Sandbox

When connecting platforms (Uber, Lyft, etc.), you'll see the Plaid Link popup. Use these test credentials:

- **Username**: `user_good`
- **Password**: `pass_good`

The sandbox will return mock data for testing purposes.

## Project Structure

\`\`\`
boosted-earnings/
├── app/
│   ├── api/
│   │   └── plaid/          # Plaid API routes
│   │       ├── link/       # Create link token
│   │       ├── exchange/   # Exchange public token
│   │       ├── balance/    # Fetch account balance
│   │       ├── identity/   # Fetch identity data
│   │       ├── assets/     # Create asset report
│   │       └── consumer-report/ # Fetch consumer report
│   ├── dashboard/          # Main dashboard page
│   ├── beta-signup/        # Beta signup form
│   ├── founders/           # Founders page
│   ├── invest/             # Investment page
│   ├── login/              # Login page
│   ├── signup/             # Signup page (passwordless)
│   └── verify/             # Email verification page
├── components/
│   ├── auth/               # Authentication components
│   ├── dashboard/          # Dashboard charts
│   └── ui/                 # UI components (shadcn)
├── lib/
│   ├── firebase.ts         # Firebase configuration
│   ├── mongodb.ts          # MongoDB connection
│   ├── mongodb-schemas.ts  # MongoDB schemas
│   ├── plaid.ts            # Plaid client
│   └── location-data.ts    # Country/state/city data
└── public/                 # Static assets
\`\`\`

## API Routes

### Plaid Integration

- `POST /api/plaid/link` - Create Plaid Link token
- `POST /api/plaid/exchange` - Exchange public token for access token
- `POST /api/plaid/balance` - Fetch account balance
- `POST /api/plaid/identity` - Fetch identity information
- `POST /api/plaid/assets` - Create asset report
- `POST /api/plaid/consumer-report` - Fetch consumer report

## Technologies

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI)
- **Authentication**: Firebase Auth (Email Link)
- **Database**: MongoDB
- **Bank Integration**: Plaid (Sandbox)
- **Charts**: Recharts
- **Language**: TypeScript

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

Make sure to add all environment variables from `.env.local` to your Vercel project settings.

## Troubleshooting

### Build fails with ERR_PNPM_OUTDATED_LOCKFILE

Run `pnpm install` to regenerate the lock file and commit both `package.json` and `pnpm-lock.yaml`.

### Plaid Link doesn't open

Ensure `PLAID_CLIENT_ID` and `PLAID_SECRET` are set in your environment variables. The app will use mock data if credentials are missing.

### Firebase authentication errors

Check that all Firebase environment variables are correctly set and that your Firebase project has Email Link authentication enabled.

### MongoDB connection errors

Verify your `MONGODB_URI` is correct and that your IP address is whitelisted in MongoDB Atlas.

## License

MIT

## Support

For issues or questions, please open an issue on GitHub or contact support.
