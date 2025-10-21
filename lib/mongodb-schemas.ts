import clientPromise from "./mongodb"

export interface PlaidAccount {
  userId: string
  platform: string // 'Uber', 'Lyft', 'DoorDash', 'Uber Eats'
  accessToken: string
  itemId: string
  accountId: string
  createdAt: Date
  updatedAt: Date
}

export interface BankBalance {
  userId: string
  platform: string
  accountId: string
  available: number
  current: number
  limit: number | null
  currency: string
  lastUpdated: Date
}

export interface BankIdentity {
  userId: string
  platform: string
  accountId: string
  owners: Array<{
    names: string[]
    emails: string[]
    phoneNumbers: string[]
    addresses: Array<{
      street: string
      city: string
      region: string
      postalCode: string
      country: string
    }>
  }>
  lastUpdated: Date
}

export interface AssetReport {
  userId: string
  platform: string
  assetReportId: string
  assetReportToken: string
  reportData: any
  createdAt: Date
}

export interface ConsumerReport {
  userId: string
  platform: string
  reportToken: string
  reportData: any
  createdAt: Date
}

// Helper functions to interact with MongoDB collections
export async function getPlaidAccountsCollection() {
  const client = await clientPromise
  return client.db("boosted-earnings").collection<PlaidAccount>("plaid_accounts")
}

export async function getBankBalancesCollection() {
  const client = await clientPromise
  return client.db("boosted-earnings").collection<BankBalance>("bank_balances")
}

export async function getBankIdentitiesCollection() {
  const client = await clientPromise
  return client.db("boosted-earnings").collection<BankIdentity>("bank_identities")
}

export async function getAssetReportsCollection() {
  const client = await clientPromise
  return client.db("boosted-earnings").collection<AssetReport>("asset_reports")
}

export async function getConsumerReportsCollection() {
  const client = await clientPromise
  return client.db("boosted-earnings").collection<ConsumerReport>("consumer_reports")
}
