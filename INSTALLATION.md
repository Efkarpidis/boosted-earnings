# Installation Instructions

## Quick Start

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

This will install all required packages including:
- `@plaid/react-plaid-link` - Plaid Link React component
- `plaid` - Plaid Node.js library
- `mongodb` - MongoDB driver
- `firebase` - Firebase SDK
- `recharts` - Chart library

### 2. Environment Variables

The `.env.local` file is already configured with:
- Firebase credentials
- Plaid sandbox credentials
- MongoDB URI placeholder

**No additional configuration needed for testing!**

### 3. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Test Plaid Integration

1. Navigate to `/dashboard`
2. Click "Connect Uber" (or any platform)
3. Use Plaid sandbox credentials:
   - Username: `user_good`
   - Password: `pass_good`
   - MFA: `1234`
4. Select any test account
5. View real sandbox data in charts

## Environment Variables Reference

\`\`\`bash
# Firebase (Already configured)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBxW3pamDlxlO5lTq6PLBPfJ8hwNJhrujc
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=boosted-earnings-d6bb4.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=boosted-earnings-d6bb4
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=boosted-earnings-d6bb4.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=67082748819
NEXT_PUBLIC_FIREBASE_APP_ID=1:67082748819:web:d9c4c6cadbd14e8c451e66
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-WEPFJJ8W93

# MongoDB (Configure with your connection string)
MONGODB_URI=your_mongodb_connection_string

# Plaid Sandbox (Already configured)
PLAID_CLIENT_ID=66c751e8c0d0bc00193ec41b
PLAID_SECRET=9e79d533d1f825888fb514f9a9f868
PLAID_ENV=sandbox
\`\`\`

## Deployment

### Deploy to Vercel

\`\`\`bash
npm run build
vercel deploy
\`\`\`

Add environment variables in Vercel dashboard:
- Settings > Environment Variables
- Add all variables from `.env.local`

## Troubleshooting

### Missing Dependencies
\`\`\`bash
npm install @plaid/react-plaid-link plaid
\`\`\`

### MongoDB Connection Error
Update `MONGODB_URI` in `.env.local` with your MongoDB connection string.

### Plaid API Error
Verify credentials in Plaid dashboard: https://dashboard.plaid.com/

## Support

- GitHub: https://github.com/Efkarpidis/boosted-earnings
- Branch: v3-final
