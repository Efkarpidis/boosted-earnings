# Argyle Integration Setup Guide

This guide will help you set up Argyle integration for real-time rideshare earnings and trip data.

## Quick Start (Sandbox)

1. **Get Sandbox Credentials**
   - Sign up at https://console.argyle.com/
   - Navigate to Settings → API Keys
   - Copy your Client ID and Secret (sandbox credentials are free)

2. **Configure Environment Variables**
   
   Add these to your `.env.local` file:
   \`\`\`bash
   ARGYLE_CLIENT_ID=your_client_id_here
   ARGYLE_SECRET=your_secret_here
   ARGYLE_ENV=sandbox
   ARGYLE_WEBHOOK_SECRET=your_webhook_secret_here
   ARGYLE_API_BASE=https://api.argyle.com/v2
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   \`\`\`

   Also add them to Vercel:
   - Go to your Vercel project → Settings → Environment Variables
   - Add all variables above
   - Apply to Production, Preview, and Development

3. **Test the Integration**
   
   Use sandbox test credentials to connect platforms:
   - Username: `argyle`
   - Password: `sandbox`

## User Token Flow (New)

**How it works:**
1. User clicks "Connect Your Accounts" on `/connect` page
2. Frontend calls `/api/argyle/user-token` with the user's ID
3. Backend generates a fresh user token via Argyle's API using your Client ID and Secret
4. Frontend receives the user token and initializes Argyle Link with it
5. User completes authentication in Argyle Link modal
6. On success, authorization code is exchanged for access token
7. Data sync begins automatically

**Benefits:**
- No static keys exposed to frontend
- Each user gets their own token
- Tokens are short-lived and secure
- Works seamlessly in mock mode

**Environment Matrix:**

| Mode | Required Env Vars | Link Behavior |
|------|------------------|---------------|
| **Mock** (`ARGYLE_MOCK=1`) | None | Returns deterministic mock token, shows demo UI |
| **Real** (production) | `ARGYLE_CLIENT_ID`, `ARGYLE_SECRET` | Generates real user token via API |

## Webhook Setup

1. **Configure Webhook URL**
   - In Argyle Console, go to Settings → Webhooks
   - Add webhook URL: `https://your-domain.vercel.app/api/argyle/webhook`
   - Select events:
     - `connection.updated`
     - `data.ready`
     - `employment.data.updated`
     - `earnings.created`
     - `earnings.updated`
     - `activities.created`
     - `activities.updated`
     - `balances.updated`

2. **Webhook Security**
   - Copy the webhook secret from Argyle Console
   - Add it to your environment variables as `ARGYLE_WEBHOOK_SECRET`
   - The webhook route will verify signatures automatically

3. **Test Webhook Locally**
   \`\`\`bash
   npx tsx scripts/mock-argyle-webhook.ts
   \`\`\`

## API Testing

### Create User Token (New)

\`\`\`bash
curl -X POST http://localhost:3000/api/argyle/user-token \
  -H "Content-Type: application/json" \
  -d '{"userId":"test-user"}'
\`\`\`

Expected response:
\`\`\`json
{
  "userToken": "user_sandbox_abc123...",
  "mock": false,
  "isMockMode": false
}
\`\`\`

### Sync Trips and Earnings

\`\`\`bash
curl -X POST http://localhost:3000/api/argyle/sync \
  -H "Content-Type: application/json" \
  -d '{"userId":"test-user"}'
\`\`\`

Expected response:
\`\`\`json
{
  "tripsUpserted": 15,
  "earningsUpserted": 3,
  "balancesUpserted": 1,
  "pagesFetched": 2,
  "connectionsSynced": 1,
  "mock": false
}
\`\`\`

### Exchange Authorization Code

\`\`\`bash
curl -X POST http://localhost:3000/api/argyle/exchange \
  -H "Content-Type: application/json" \
  -d '{
    "code":"auth_code_from_argyle_link",
    "userId":"test-user",
    "platform":"Uber"
  }'
\`\`\`

## Daily Cron Setup

Set up automated daily syncs using Vercel Cron:

1. **Add Cron Configuration to vercel.json**
   \`\`\`json
   {
     "crons": [{
       "path": "/api/cron/argyle-daily",
       "schedule": "0 6 * * *"
     }]
   }
   \`\`\`
   This runs daily at 6:00 AM ET.

2. **Optional: Add Cron Secret for Security**
   \`\`\`bash
   CRON_SECRET=your_random_secret_here
   \`\`\`
   Add to Vercel environment variables.

3. **Test Cron Endpoint**
   \`\`\`bash
   curl http://localhost:3000/api/cron/argyle-daily
   \`\`\`

   Expected response:
   \`\`\`json
   {
     "success": true,
     "totalConnections": 5,
     "successCount": 5,
     "errorCount": 0,
     "timestamp": "2025-01-23T06:00:00.000Z"
   }
   \`\`\`

## Manual Backfill

Run historical data backfill for a user:

\`\`\`bash
npx tsx scripts/backfill-argyle.ts --user=test-user-123 --platform=uber --days=365
\`\`\`

Options:
- `--user=<userId>` (required): User ID to backfill
- `--platform=<platform>` (optional): Specific platform (Uber, Lyft, DoorDash, UberEats)
- `--days=<number>` (optional): Number of days to backfill (default: 365)

Example output:
\`\`\`
[Backfill] Starting backfill for user=test-user-123, platform=uber, days=365
[Backfill] Found 1 connection(s)
[Backfill] Processing Uber...
[Backfill] ✓ Uber: trips=245, earnings=52, pages=8
[Backfill] Complete
\`\`\`

## Database Indexes

Run the index creation script to ensure optimal performance:

\`\`\`bash
npx tsx scripts/create-argyle-indexes.ts
\`\`\`

The following indexes are created:
- `argyle_items`: Unique index on `{ userId, itemId }`
- `driver_trips`: Unique index on `{ tripId }`, index on `{ userId, platform, startTime }`
- `driver_earnings`: Unique index on `{ earningId }`, index on `{ userId, platform, startDate }`
- `driver_balances`: Index on `{ userId, platform }`
- `driver_connections`: Unique index on `{ userId, platform }`, index on `{ status }`

Re-running the script is safe and will be a no-op if indexes already exist.

## Environment Validation

The app validates required environment variables on startup:

**Required (always):**
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `MONGODB_URI`

**Required (non-mock mode):**
- `ARGYLE_CLIENT_ID`
- `ARGYLE_SECRET`

**Optional:**
- `ARGYLE_WEBHOOK_SECRET` (webhook signature verification disabled if not set)
- `CRON_SECRET` (cron endpoint authentication)

**Mock Mode:**
Set `ARGYLE_MOCK=1` to use sample data without real Argyle credentials. The app will:
- Return deterministic mock user tokens
- Skip real API calls
- Use sample trip/earnings data
- Allow full UI testing without credentials

## Pricing

- **Sandbox**: Free, unlimited testing
- **Production**: Billed per linked account per month (not per API call)
- Check current pricing at https://argyle.com/pricing

## Troubleshooting

### Mock Data Appearing

If you see mock data instead of real data:
1. Verify `ARGYLE_CLIENT_ID` and `ARGYLE_SECRET` are set in Vercel
2. Check that you're using sandbox credentials from Argyle Console
3. Ensure environment variables are applied to the correct deployment environment
4. Verify `ARGYLE_MOCK` is not set to `1`

### Webhook Not Receiving Events

1. Verify webhook URL is correct in Argyle Console (must be HTTPS in production)
2. Check that `ARGYLE_WEBHOOK_SECRET` matches the secret in Argyle Console
3. Test webhook manually using Argyle Console's webhook testing tool
4. Check server logs for signature verification errors

### No Trips or Earnings Syncing

1. Ensure you've connected at least one platform via Argyle Link
2. Check that the platform has data in sandbox mode
3. Verify MongoDB connection is working (`MONGODB_URI` is set)
4. Check for errors in sync logs: look for `[Argyle Sync]` messages
5. Verify indexes are created: run `npx tsx scripts/create-argyle-indexes.ts`

### 401/403 Errors

1. Verify `ARGYLE_CLIENT_ID` and `ARGYLE_SECRET` are correct
2. Check that credentials match the environment (`sandbox` vs `production`)
3. Ensure credentials haven't expired or been revoked

### Rate Limiting (429 Errors)

The sync engine includes automatic retry with exponential backoff:
- Initial delay: 100ms
- Max delay: 1600ms
- Max attempts: 3

If you're still hitting rate limits:
1. Reduce cron frequency (e.g., daily instead of hourly)
2. Reduce batch size in `/api/cron/argyle-daily` (default: 3 concurrent)
3. Contact Argyle support to increase rate limits

### Invalid Signature Errors

1. Verify `ARGYLE_WEBHOOK_SECRET` matches exactly (no extra spaces)
2. Check that webhook is configured in the correct Argyle environment
3. Test with mock webhook: `npx tsx scripts/mock-argyle-webhook.ts`

### "No Data Yet" in Dashboard

This is normal for new connections:
1. Wait a few minutes for initial sync to complete
2. Manually trigger sync: click "Sync now" button in dashboard
3. Check that webhook events are being received
4. Verify the connected platform has data in sandbox mode

## Support

- Argyle Documentation: https://docs.argyle.com/
- Argyle Support: support@argyle.com
- Sandbox Test Accounts: https://docs.argyle.com/guides/testing
- API Reference: https://docs.argyle.com/api-reference

## Screenshots

### Adding Webhook in Argyle Console

1. Navigate to Settings → Webhooks
2. Click "Add Webhook"
3. Enter your webhook URL: `https://your-domain.vercel.app/api/argyle/webhook`
4. Select all relevant events
5. Copy the webhook secret and add to environment variables

### Adding Environment Variables in Vercel

1. Go to your Vercel project
2. Navigate to Settings → Environment Variables
3. Add each variable with its value
4. Select which environments to apply to (Production, Preview, Development)
5. Click "Save"

### Setting Up Cron in Vercel

1. Add cron configuration to `vercel.json`
2. Deploy your project
3. Navigate to your Vercel project → Cron Jobs
4. Verify the cron job appears and is scheduled correctly
5. Monitor execution logs in the Vercel dashboard
