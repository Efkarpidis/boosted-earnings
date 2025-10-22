import clientPromise from "./mongodb"

export interface PlaidAccount {
  userId: string
  platform: string // 'Uber', 'Lyft', 'DoorDash', 'Uber Eats'
  accessToken: string
  itemId: string
  accountId: string
  connectedAt: Date
  lastSynced?: Date
}

export interface BankBalance {
  userId: string
  platform: string
  accountId: string
  available: number
  current: number
  limit?: number
  currency: string
  lastUpdated: Date
}

export interface BankIdentity {
  userId: string
  platform: string
  accountId: string
  owners: Array<{
    names: string[]
    emails: Array<{ data: string; primary: boolean }>
    phoneNumbers: Array<{ data: string; primary: boolean }>
    addresses: Array<{
      data: {
        street: string
        city: string
        region: string
        postal_code: string
        country: string
      }
      primary: boolean
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

export async function getPlaidAccountsCollection() {
  const client = await clientPromise
  return client.db("boosted_earnings").collection<PlaidAccount>("plaid_accounts")
}

export async function getBankBalancesCollection() {
  const client = await clientPromise
  return client.db("boosted_earnings").collection<BankBalance>("bank_balances")
}

export async function getBankIdentitiesCollection() {
  const client = await clientPromise
  return client.db("boosted_earnings").collection<BankIdentity>("bank_identities")
}

export async function getAssetReportsCollection() {
  const client = await clientPromise
  return client.db("boosted_earnings").collection<AssetReport>("asset_reports")
}

export async function getConsumerReportsCollection() {
  const client = await clientPromise
  return client.db("boosted_earnings").collection<ConsumerReport>("consumer_reports")
}

// Helper functions to save data
export async function savePlaidAccount(account: PlaidAccount) {
  const collection = await getPlaidAccountsCollection()
  await collection.updateOne(
    { userId: account.userId, platform: account.platform },
    { $set: account },
    { upsert: true },
  )
}

export async function saveBankBalance(balance: BankBalance) {
  const collection = await getBankBalancesCollection()
  await collection.updateOne(
    { userId: balance.userId, platform: balance.platform, accountId: balance.accountId },
    { $set: balance },
    { upsert: true },
  )
}

export async function saveBankIdentity(identity: BankIdentity) {
  const collection = await getBankIdentitiesCollection()
  await collection.updateOne(
    { userId: identity.userId, platform: identity.platform, accountId: identity.accountId },
    { $set: identity },
    { upsert: true },
  )
}

export async function saveAssetReport(report: AssetReport) {
  const collection = await getAssetReportsCollection()
  await collection.insertOne(report)
}

export async function saveConsumerReport(report: ConsumerReport) {
  const collection = await getConsumerReportsCollection()
  await collection.insertOne(report)
}
