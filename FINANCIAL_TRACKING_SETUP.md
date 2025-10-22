# Financial Tracking System Setup Guide

This document outlines the setup steps for the comprehensive financial tracking system added to Boosted Earnings.

## Files Created

### Backend Routes
- `app/api/plaid/balances/route.ts` - Fetches account balances and saves to DB
- `app/api/plaid/sync/route.ts` - Syncs transactions using Plaid's sync API

### Database Schemas (MongoDB)
- `lib/mongodb-schemas.ts` - Extended with new collections:
  - `plaid_items` - Stores Plaid connection metadata
  - `accounts` - Bank accounts with current balances
  - `transactions` - All transactions with auto-classification
  - `balances_history` - Historical balance snapshots
  - `manual_assets` - User-added assets (cash, property, etc.)
  - `liabilities` - Loans, credit cards, mortgages
  - `tx_overrides` - User corrections to auto-classification

### Helper Functions
- `lib/transaction-classifier.ts` - Auto-classifies transactions:
  - **Platforms**: Uber, Lyft, DoorDash, UberEats
  - **Expense Types**: Gas, Tolls, Parking, Maintenance, Other
  - Supports user overrides via `tx_overrides` table

### UI Components (Not wired to navigation yet)
- `app/dashboard/components/net-worth-card.tsx` - Shows total assets, liabilities, net worth
- `app/dashboard/components/balances-list.tsx` - Lists all connected accounts with balances
- `app/dashboard/components/income-by-platform-chart.tsx` - Grouped bar chart comparing this week vs last week

### Database Setup
- `scripts/create-indexes.ts` - Creates MongoDB indexes for optimal performance

## Environment Variables

No new environment variables required. Uses existing:
- `MONGODB_URI` - MongoDB connection string
- `PLAID_CLIENT_ID` - Plaid client ID
- `PLAID_SECRET` - Plaid secret key
- `PLAID_ENV` - Plaid environment (sandbox/development/production)

## Setup Steps

### 1. Create MongoDB Indexes
Run the index creation script to optimize database queries:

\`\`\`bash
npx tsx scripts/create-indexes.ts
\`\`\`

This creates indexes on:
- User ID + Item ID (unique)
- User ID + Account ID (unique)
- User ID + Transaction ID (unique)
- Date-based queries for transactions
- Platform and expense type queries

### 2. Configure Plaid Webhooks (Optional but Recommended)

To receive real-time updates when transactions are added/modified:

1. Go to Plaid Dashboard → Webhooks
2. Add webhook URL: `https://your-domain.com/api/plaid/webhook`
3. Subscribe to these events:
   - `TRANSACTIONS_SYNC_UPDATES_AVAILABLE`
   - `DEFAULT_UPDATE`

Create the webhook handler at `app/api/plaid/webhook/route.ts`:

\`\`\`typescript
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Verify webhook signature (recommended)
  // const signature = request.headers.get('plaid-verification')
  
  if (body.webhook_type === 'TRANSACTIONS') {
    if (body.webhook_code === 'SYNC_UPDATES_AVAILABLE') {
      // Trigger sync for this item
      const { item_id } = body
      
      // Queue a background job to sync transactions
      // await fetch('/api/plaid/sync', {
      //   method: 'POST',
      //   body: JSON.stringify({ itemId: item_id })
      // })
    }
  }
  
  return NextResponse.json({ received: true })
}
\`\`\`

### 3. Set Up Cron Job for Daily Sync (Optional)

For automatic daily transaction syncing, set up a cron job:

**Option A: Vercel Cron Jobs**

Create `vercel.json`:
\`\`\`json
{
  "crons": [{
    "path": "/api/cron/sync-transactions",
    "schedule": "0 2 * * *"
  }]
}
\`\`\`

Create `app/api/cron/sync-transactions/route.ts`:
\`\`\`typescript
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Sync all users' transactions
  // Implementation depends on your user management
  
  return NextResponse.json({ success: true })
}
\`\`\`

**Option B: External Cron Service**

Use a service like cron-job.org or EasyCron to hit your sync endpoint daily.

### 4. Wire Components to Dashboard (When Ready)

To add the new components to your dashboard page:

\`\`\`tsx
// In app/dashboard/page.tsx
import { NetWorthCard } from "./components/net-worth-card"
import { BalancesList } from "./components/balances-list"
import { IncomeByPlatformChart } from "./components/income-by-platform-chart"

// Add to your dashboard layout:
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  <NetWorthCard />
  <BalancesList />
  <IncomeByPlatformChart />
</div>
\`\`\`

## API Usage Examples

### Fetch Balances
\`\`\`bash
curl -X POST https://your-domain.com/api/plaid/balances \
  -H "Content-Type: application/json" \
  -d '{"userId":"user-123"}'
\`\`\`

### Sync Transactions
\`\`\`bash
curl -X POST https://your-domain.com/api/plaid/sync \
  -H "Content-Type: application/json" \
  -d '{"userId":"user-123"}'
\`\`\`

### Sync Specific Item
\`\`\`bash
curl -X POST https://your-domain.com/api/plaid/sync \
  -H "Content-Type: application/json" \
  -d '{"userId":"user-123","itemId":"item-abc"}'
\`\`\`

## Transaction Classification

The system automatically classifies transactions:

**Income (Platform Detection)**:
- Uber: Matches "uber" (excluding "uber eats")
- Lyft: Matches "lyft"
- DoorDash: Matches "doordash" or "door dash"
- UberEats: Matches "uber eats" or "ubereats"

**Expenses (Type Detection)**:
- Gas: Shell, Chevron, Exxon, BP, etc.
- Tolls: Toll, FasTrak, EZ Pass, etc.
- Parking: Parking, ParkWhiz, SpotHero, etc.
- Maintenance: Auto repair, car wash, oil change, etc.

Users can override classifications via the `tx_overrides` table.

## Next Steps

1. Run the index creation script
2. Test the API routes with mock data
3. Configure Plaid webhooks (optional)
4. Set up cron job for daily sync (optional)
5. Wire the UI components to your dashboard when ready
6. Test with real Plaid sandbox accounts

## Notes

- All routes include mock data fallbacks when Plaid is not configured
- Transaction classification is automatic but can be overridden
- Balance history is recorded every time balances are fetched
- The system supports multiple Plaid items per user
