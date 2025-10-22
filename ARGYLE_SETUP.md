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
   \`\`\`

   Also add them to Vercel:
   - Go to your Vercel project → Settings → Environment Variables
   - Add all five variables above
   - Apply to Production, Preview, and Development

3. **Test the Integration**
   
   Use sandbox test credentials to connect platforms:
   - Username: `argyle`
   - Password: `sandbox`

## Webhook Setup

1. **Configure Webhook URL**
   - In Argyle Console, go to Settings → Webhooks
   - Add webhook URL: `https://your-domain.vercel.app/api/argyle/webhook`
   - Select events:
     - `earnings.created`
     - `activities.created`
     - `balances.updated`

2. **Webhook Security**
   - Copy the webhook secret from Argyle Console
   - Add it to your environment variables as `ARGYLE_WEBHOOK_SECRET`
   - The webhook route will verify signatures automatically

## API Testing

### Sync Trips and Earnings

\`\`\`bash
curl -X POST https://your-domain.vercel.app/api/argyle/sync \
  -H "Content-Type: application/json" \
  -d '{"userId":"test-user"}'
\`\`\`

Expected response:
\`\`\`json
{
  "itemsSynced": 1,
  "newTrips": 15,
  "updatedTrips": 0,
  "newEarnings": 3,
  "updatedEarnings": 0,
  "mock": false
}
\`\`\`

### Exchange Authorization Code

\`\`\`bash
curl -X POST https://your-domain.vercel.app/api/argyle/exchange \
  -H "Content-Type: application/json" \
  -d '{
    "code":"auth_code_from_argyle_link",
    "userId":"test-user",
    "platform":"Uber"
  }'
\`\`\`

## Optional: Automated Sync (Cron)

You can set up a cron job to sync data hourly. **Do NOT enable this in the initial PR.**

1. **Add Cron Secret**
   \`\`\`bash
   CRON_SECRET=your_random_secret_here
   \`\`\`

2. **Create Cron Route** (example, not included in PR)
   \`\`\`typescript
   // app/api/cron/sync-argyle/route.ts
   export async function GET(request: NextRequest) {
     const authHeader = request.headers.get('authorization')
     if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
     }
     
     // Sync all users
     // ...
   }
   \`\`\`

3. **Configure Vercel Cron**
   - Add to `vercel.json`:
   \`\`\`json
   {
     "crons": [{
       "path": "/api/cron/sync-argyle",
       "schedule": "0 * * * *"
     }]
   }
   \`\`\`

## Database Indexes

The following indexes are automatically created for optimal performance:

- `argyle_items`: Unique index on `{ userId, itemId }`
- `driver_trips`: Unique index on `{ tripId }`, index on `{ userId, platform, startTime }`
- `driver_earnings`: Unique index on `{ earningId }`, index on `{ userId, platform, startDate }`
- `driver_balances`: Index on `{ userId, platform }`

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

### Webhook Not Receiving Events

1. Verify webhook URL is correct in Argyle Console
2. Check that `ARGYLE_WEBHOOK_SECRET` matches the secret in Argyle Console
3. Test webhook manually using Argyle Console's webhook testing tool

### No Trips or Earnings Syncing

1. Ensure you've connected at least one platform via Argyle Link
2. Check that the platform has data in sandbox mode
3. Verify MongoDB connection is working (`MONGODB_URI` is set)

## Support

- Argyle Documentation: https://docs.argyle.com/
- Argyle Support: support@argyle.com
- Sandbox Test Accounts: https://docs.argyle.com/guides/testing
