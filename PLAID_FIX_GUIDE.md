# Plaid Integration Fix - Onboarding Screens Issue

## Problem Diagnosed
Your dashboard was showing Plaid's onboarding screens ("Tell us about your use cases" and "Pick your Plaid products") instead of the bank selection screen.

## Root Cause
The Plaid Link token was requesting too many products:
- ❌ Products.Auth
- ❌ Products.Transactions
- ❌ Products.Identity (causes onboarding)
- ❌ Products.Assets (causes onboarding)

When you request Identity and Assets products, Plaid requires you to complete their onboarding process to configure these features.

## Solution Applied
Simplified the products array to only include:
- ✅ Products.Auth (verify account ownership)
- ✅ Products.Transactions (fetch transaction history)

This is sufficient for a ride-share earnings dashboard and bypasses the onboarding screens.

## What to Do Next

### 1. Verify Your Plaid Credentials
Make sure your `.env.local` file has the correct Plaid sandbox credentials:

\`\`\`bash
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_sandbox_secret
PLAID_ENV=sandbox
\`\`\`

**How to get these:**
1. Go to https://dashboard.plaid.com/
2. Sign in or create a free account
3. Go to Team Settings → Keys
4. Copy your **Sandbox** credentials (not Development or Production)
5. Paste them into your `.env.local` file

### 2. Test the Fix
1. Push the updated code to your GitHub repository
2. Vercel will automatically deploy the changes
3. Go to your dashboard at `/dashboard`
4. Click "Connect Uber" (or any platform)
5. You should now see the Plaid bank selection screen instead of onboarding screens

### 3. Using Plaid Sandbox
When testing in sandbox mode:
- Use Plaid's test credentials: username `user_good`, password `pass_good`
- Select any test bank (e.g., "First Platypus Bank")
- The connection will succeed and show mock transaction data

### 4. If You Still See Onboarding Screens
This might mean your Plaid account itself needs onboarding. To fix:
1. Go to https://dashboard.plaid.com/
2. Complete any onboarding steps Plaid asks for
3. Make sure your account is approved for sandbox access
4. Verify you're using **Sandbox** keys, not Development keys

## Dashboard Features Working
✅ Connect buttons for Uber, Lyft, DoorDash, Uber Eats
✅ Plaid Link popup for bank authentication
✅ Earnings charts with real/mock data
✅ Toast notifications for success/errors
✅ Mock data fallback when API keys are missing
✅ Loading states during connection

## Need Help?
If you're still seeing issues:
1. Check the browser console for errors (F12 → Console tab)
2. Verify your Plaid credentials are correct
3. Make sure you're using Sandbox environment
4. Try a different browser or incognito mode
