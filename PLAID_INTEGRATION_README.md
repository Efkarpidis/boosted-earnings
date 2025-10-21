# Plaid Integration Setup Guide

This guide explains how to integrate Plaid's Assets, Auth, Balance, Consumer Report, and Identity products into the Boosted Earnings dashboard.

## Prerequisites

1. **Plaid Account**: Sign up at [https://dashboard.plaid.com/](https://dashboard.plaid.com/)
2. **MongoDB Database**: Set up a MongoDB database (MongoDB Atlas recommended)
3. **Firebase Project**: Already configured in this project

## Environment Variables Setup

### Required Variables

Add these to your `.env.local` file:

\`\`\`bash
# Plaid Configuration
PLAID_CLIENT_ID=your_plaid_client_id_here
PLAID_SECRET=your_plaid_secret_here
PLAID_ENV=sandbox  # Use 'sandbox' for testing, 'development' or 'production' for live

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/boosted-earnings?retryWrites=true&w=majority
\`\`\`

### Getting Plaid Credentials

1. Go to [Plaid Dashboard](https://dashboard.plaid.com/)
2. Sign up or log in
3. Navigate to **Team Settings** → **Keys**
4. Copy your `client_id` and `secret` for the sandbox environment
5. Paste them into your `.env.local` file

### MongoDB Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster
3. Create a database user with read/write permissions
4. Get your connection string from **Connect** → **Connect your application**
5. Replace `<password>` with your database user password
6. Add the connection string to `.env.local`

## Plaid Products Integrated

### 1. **Auth** - Bank Account Authentication
- Verifies bank account and routing numbers
- Used for ACH transfers and direct deposits

### 2. **Balance** - Real-time Account Balances
- Fetches current and available balances
- Updates in real-time when users connect platforms

### 3. **Identity** - Account Owner Information
- Retrieves account holder name, email, phone, address
- Used for identity verification

### 4. **Assets** - Asset Reports
- Generates comprehensive asset reports
- Shows historical account balances and transactions
- Useful for income verification

### 5. **Consumer Report - Base** - Credit and Financial Data
- Provides consumer financial data
- Requires special Plaid approval (may not work in sandbox)

## How It Works

### 1. User Connects Platform

When a user clicks "Connect Uber" (or Lyft, DoorDash, Uber Eats):

\`\`\`typescript
// Dashboard triggers Plaid Link
handleConnectPlatform("Uber")
  ↓
// Creates link token
POST /api/plaid/link
  ↓
// Opens Plaid Link UI
usePlaidLink({ token, onSuccess })
  ↓
// User authenticates with bank
Plaid Link Modal
  ↓
// Returns public token
onSuccess(publicToken)
\`\`\`

### 2. Token Exchange

\`\`\`typescript
// Exchange public token for access token
POST /api/plaid/exchange
  ↓
// Store in MongoDB
plaid_accounts collection
  ↓
// Return access token
{ accessToken, itemId, accountId }
\`\`\`

### 3. Fetch Plaid Data

After successful connection, the app fetches all Plaid products in parallel:

\`\`\`typescript
Promise.all([
  fetchBalance(accessToken),      // GET /api/plaid/balance
  fetchIdentity(accessToken),     // GET /api/plaid/identity
  fetchAssets(accessToken),       // POST /api/plaid/assets
  fetchConsumerReport(accessToken) // POST /api/plaid/consumer-report
])
\`\`\`

### 4. Store in MongoDB

Data is stored in these collections:

- `plaid_accounts` - Access tokens and account IDs
- `bank_balances` - Current and available balances
- `bank_identities` - Account owner information
- `asset_reports` - Asset report tokens and data
- `consumer_reports` - Consumer report tokens and data

## API Routes

### `/api/plaid/link` (POST)
Creates a Plaid Link token for initializing the connection flow.

**Request:**
\`\`\`json
{
  "userId": "firebase_user_id",
  "platform": "Uber"
}
\`\`\`

**Response:**
\`\`\`json
{
  "link_token": "link-sandbox-xxx",
  "expiration": "2024-01-20T12:00:00Z"
}
\`\`\`

### `/api/plaid/exchange` (POST)
Exchanges public token for access token and stores in MongoDB.

**Request:**
\`\`\`json
{
  "publicToken": "public-sandbox-xxx",
  "userId": "firebase_user_id",
  "platform": "Uber"
}
\`\`\`

**Response:**
\`\`\`json
{
  "accessToken": "access-sandbox-xxx",
  "itemId": "item-xxx",
  "accountId": "account-xxx"
}
\`\`\`

### `/api/plaid/balance` (GET)
Fetches real-time account balances.

**Query Params:**
- `accessToken` - Plaid access token
- `userId` - Firebase user ID
- `platform` - Platform name (Uber, Lyft, etc.)

**Response:**
\`\`\`json
{
  "accounts": [
    {
      "account_id": "xxx",
      "balances": {
        "available": 2847.50,
        "current": 2847.50,
        "iso_currency_code": "USD"
      }
    }
  ]
}
\`\`\`

### `/api/plaid/identity` (GET)
Fetches account owner identity information.

**Response:**
\`\`\`json
{
  "accounts": [
    {
      "owners": [
        {
          "names": ["John Driver"],
          "emails": ["driver@example.com"],
          "phone_numbers": ["555-0123"]
        }
      ]
    }
  ]
}
\`\`\`

### `/api/plaid/assets` (POST)
Creates an asset report for income verification.

**Request:**
\`\`\`json
{
  "accessToken": "access-sandbox-xxx",
  "userId": "firebase_user_id",
  "platform": "Uber",
  "daysRequested": 730
}
\`\`\`

**Response:**
\`\`\`json
{
  "asset_report_token": "asset-sandbox-xxx",
  "asset_report_id": "xxx"
}
\`\`\`

### `/api/plaid/consumer-report` (POST)
Creates a consumer report (requires special approval).

**Request:**
\`\`\`json
{
  "accessToken": "access-sandbox-xxx",
  "userId": "firebase_user_id",
  "platform": "Uber"
}
\`\`\`

## Mock Data Fallback

If Plaid credentials are not configured, the app automatically falls back to mock data:

- All API routes check for `PLAID_CLIENT_ID` and `PLAID_SECRET`
- If missing, returns mock data with `mock: true` flag
- Dashboard shows alert banner: "You're viewing sample data"
- Users can still test the UI without real Plaid credentials

## Testing in Sandbox

Plaid provides test credentials for sandbox testing:

**Test Bank Account:**
- Institution: Chase
- Username: `user_good`
- Password: `pass_good`

**Test Credentials:**
- Any username/password combination works in sandbox
- Use institution search to find test banks

## Production Deployment

### 1. Switch to Production Environment

\`\`\`bash
PLAID_ENV=production
PLAID_SECRET=your_production_secret
\`\`\`

### 2. Enable Webhooks

\`\`\`bash
PLAID_WEBHOOK_URL=https://yourdomain.com/api/plaid/webhook
\`\`\`

### 3. Request Production Access

- Go to Plaid Dashboard
- Complete the production access request form
- Wait for approval (usually 1-2 business days)

### 4. Update Products

Ensure you've requested access to all products:
- Auth
- Balance
- Identity
- Assets
- Consumer Report (requires special approval)

## Troubleshooting

### "Failed to create link token"
- Check that `PLAID_CLIENT_ID` and `PLAID_SECRET` are set correctly
- Verify you're using the correct environment (sandbox/development/production)

### "Failed to exchange token"
- Ensure the public token hasn't expired (expires after 30 minutes)
- Check that your Plaid credentials are valid

### MongoDB Connection Error
- Verify `MONGODB_URI` is correct
- Check that your IP address is whitelisted in MongoDB Atlas
- Ensure database user has proper permissions

### Consumer Report Not Working
- Consumer Report requires special Plaid approval
- May not be available in sandbox environment
- Contact Plaid support to enable this product

## Security Best Practices

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Rotate secrets regularly** - Update Plaid secrets every 90 days
3. **Use environment variables** - Never hardcode credentials
4. **Encrypt access tokens** - Consider encrypting tokens in MongoDB
5. **Implement rate limiting** - Prevent API abuse
6. **Monitor webhook events** - Set up alerts for suspicious activity

## Support

- **Plaid Documentation**: [https://plaid.com/docs/](https://plaid.com/docs/)
- **Plaid Support**: [https://dashboard.plaid.com/support](https://dashboard.plaid.com/support)
- **MongoDB Documentation**: [https://docs.mongodb.com/](https://docs.mongodb.com/)

## Next Steps

1. Set up your Plaid account and get credentials
2. Configure MongoDB database
3. Add credentials to `.env.local`
4. Test the connection flow in sandbox
5. Request production access when ready
6. Deploy to Vercel with environment variables configured
