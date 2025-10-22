# Plaid Sandbox Integration Guide

## Overview

This document describes the Plaid sandbox integration for the Boosted Earnings ride-share dashboard. The integration allows drivers to connect their bank accounts via Plaid Link and fetch earnings data from platforms like Uber, Lyft, DoorDash, and Uber Eats.

## Features Implemented

### 1. Plaid Link Integration
- **React Component**: Uses `@plaid/react-plaid-link` for the Plaid Link popup
- **Sandbox Mode**: Configured to work with Plaid sandbox environment
- **Platform Support**: Uber, Lyft, DoorDash, Uber Eats

### 2. API Routes Created

#### `/api/plaid/link` (POST)
- Creates a Plaid Link token for initializing the Plaid Link UI
- Returns link token with 4-hour expiration
- Supports sandbox mode with mock data fallback

#### `/api/plaid/exchange` (POST)
- Exchanges public token for access token after user completes Plaid Link
- Stores account information in MongoDB
- Returns access token, item ID, and account ID

#### `/api/plaid/balance` (POST)
- Fetches account balance data from Plaid
- Stores balance in MongoDB `bank_balances` collection
- Returns available, current, and limit balances

#### `/api/plaid/identity` (POST)
- Fetches identity information (name, email, phone, address)
- Stores in MongoDB `bank_identities` collection
- Returns owner information

#### `/api/plaid/assets` (POST)
- Creates and retrieves asset reports
- Stores in MongoDB `asset_reports` collection
- Returns total assets and account details

#### `/api/plaid/consumer-report` (POST)
- Fetches consumer credit report data (requires special Plaid access)
- Stores in MongoDB `consumer_reports` collection
- Falls back to mock data if not available

### 3. MongoDB Schemas

Created comprehensive TypeScript interfaces and helper functions in `lib/mongodb-schemas.ts`:

- `PlaidAccount`: Stores connected platform accounts
- `BankBalance`: Stores account balance data
- `BankIdentity`: Stores identity verification data
- `AssetReport`: Stores asset report data
- `ConsumerReport`: Stores consumer credit report data

### 4. Dashboard Updates

Enhanced `app/dashboard/page.tsx` with:
- Plaid Link popup integration
- Real-time data fetching from all Plaid endpoints
- Loading states for each platform connection
- Toast notifications for success/error states
- Alert banners for mock data and errors
- Automatic chart updates with real data

### 5. Chart Components

Updated chart components to accept real data:
- `EarningsChart`: Displays daily earnings trends
- `PlatformBreakdown`: Shows earnings by platform
- `WeeklyComparison`: Compares weekly performance

All charts fall back to mock data when real data is unavailable.

## Installation

### 1. Install Dependencies

\`\`\`bash
npm install @plaid/react-plaid-link plaid
\`\`\`

Or if using the existing package.json:

\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment Variables

The `.env.local` file already contains Plaid sandbox credentials:

\`\`\`bash
PLAID_CLIENT_ID=66c751e8c0d0bc00193ec41b
PLAID_SECRET=9e79d533d1f825888fb514f9a9f868
PLAID_ENV=sandbox
\`\`\`

### 3. MongoDB Setup

Ensure MongoDB is connected via the `MONGODB_URI` environment variable. The integration will automatically create the following collections:

- `plaid_accounts`
- `bank_balances`
- `bank_identities`
- `asset_reports`
- `consumer_reports`

## Usage

### Testing in Sandbox Mode

1. **Start the development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

2. **Navigate to the dashboard**: `/dashboard`

3. **Click "Connect Uber" (or any platform)**:
   - Plaid Link popup will appear
   - Use Plaid sandbox test credentials:
     - Username: `user_good`
     - Password: `pass_good`
     - MFA: `1234`

4. **Select a test bank account**:
   - Choose any account from the list
   - Click "Continue"

5. **View real sandbox data**:
   - Balance data will be fetched and displayed
   - Charts will update with real data
   - Identity and asset information will be stored in MongoDB

### Sandbox Test Credentials

Plaid provides several test credentials for different scenarios:

| Username | Password | Description |
|----------|----------|-------------|
| `user_good` | `pass_good` | Successful authentication |
| `user_custom` | `pass_good` | Custom test account |
| `user_bad` | `pass_good` | Invalid credentials error |

MFA Code: `1234` (for all test accounts)

## API Flow

\`\`\`
1. User clicks "Connect Uber"
   ↓
2. Dashboard calls /api/plaid/link
   ↓
3. Plaid Link popup opens with link_token
   ↓
4. User authenticates with bank (sandbox)
   ↓
5. Plaid returns public_token
   ↓
6. Dashboard calls /api/plaid/exchange
   ↓
7. Exchange returns access_token
   ↓
8. Dashboard calls all data endpoints in parallel:
   - /api/plaid/balance
   - /api/plaid/identity
   - /api/plaid/assets
   - /api/plaid/consumer-report
   ↓
9. Data stored in MongoDB
   ↓
10. Charts updated with real data
\`\`\`

## Mock Data Fallback

If Plaid credentials are not configured or API calls fail, the system automatically falls back to mock data:

- Alert banner displays: "You're viewing sample data in Plaid sandbox mode"
- All API routes return mock data with `mock: true` flag
- Dashboard continues to function normally
- Charts display sample data

## Error Handling

The integration includes comprehensive error handling:

- **Toast Notifications**: User-friendly messages for success/error states
- **Alert Banners**: Persistent warnings for mock data or configuration issues
- **Loading States**: Visual feedback during API calls
- **Graceful Degradation**: Falls back to mock data on errors

## Security Considerations

1. **Access Tokens**: Stored securely in MongoDB, never exposed to client
2. **Environment Variables**: Sensitive credentials in `.env.local` (not committed)
3. **Sandbox Mode**: Safe testing environment, no real financial data
4. **User Authentication**: Protected routes require Firebase authentication

## Production Deployment

To move from sandbox to production:

1. **Get Production Credentials**:
   - Apply for Plaid production access
   - Obtain production `PLAID_CLIENT_ID` and `PLAID_SECRET`

2. **Update Environment Variables**:
   \`\`\`bash
   PLAID_ENV=production
   PLAID_CLIENT_ID=your_production_client_id
   PLAID_SECRET=your_production_secret
   \`\`\`

3. **Configure Webhooks**:
   - Set up webhook endpoint: `/api/plaid/webhook`
   - Register webhook URL in Plaid dashboard

4. **Test Thoroughly**:
   - Test with real bank accounts
   - Verify data accuracy
   - Monitor error rates

## Troubleshooting

### Issue: "Plaid credentials not configured"
**Solution**: Verify `PLAID_CLIENT_ID` and `PLAID_SECRET` are set in `.env.local`

### Issue: "Failed to create link token"
**Solution**: Check Plaid dashboard for API status and credential validity

### Issue: "MongoDB connection error"
**Solution**: Verify `MONGODB_URI` is correctly configured

### Issue: Charts not updating
**Solution**: Check browser console for API errors and verify data structure

## Files Modified/Created

### New Files
- `lib/plaid.ts` - Plaid client initialization
- `lib/mongodb-schemas.ts` - MongoDB schemas and helper functions
- `app/api/plaid/balance/route.ts` - Balance endpoint
- `app/api/plaid/identity/route.ts` - Identity endpoint
- `app/api/plaid/assets/route.ts` - Assets endpoint
- `app/api/plaid/consumer-report/route.ts` - Consumer report endpoint
- `PLAID_INTEGRATION.md` - This documentation

### Updated Files
- `app/dashboard/page.tsx` - Added Plaid Link integration
- `app/api/plaid/link/route.ts` - Enhanced with plaid-node library
- `app/api/plaid/exchange/route.ts` - Added MongoDB storage
- `package.json` - Added `@plaid/react-plaid-link` dependency

## Next Steps

1. **Test all platform connections** (Uber, Lyft, DoorDash, Uber Eats)
2. **Verify MongoDB data storage** for all collections
3. **Test error scenarios** (invalid credentials, network errors)
4. **Implement webhook handler** for real-time updates
5. **Add data refresh functionality** to update stale data
6. **Implement data visualization** for historical trends

## Support

For issues or questions:
- Plaid Documentation: https://plaid.com/docs/
- Plaid Support: https://dashboard.plaid.com/support
- MongoDB Documentation: https://docs.mongodb.com/
