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

export interface PlaidItem {
  userId: string
  itemId: string
  accessToken: string
  institutionId: string
  institutionName: string
  cursor?: string // For transaction sync
  connectedAt: Date
  lastSynced?: Date
}

export interface Account {
  userId: string
  itemId: string
  accountId: string
  name: string
  officialName?: string
  type: string // 'depository', 'credit', 'loan', 'investment'
  subtype: string // 'checking', 'savings', 'credit card', etc.
  mask?: string // Last 4 digits
  availableBalance?: number
  currentBalance: number
  limit?: number
  currency: string
  createdAt: Date
  updatedAt: Date
}

export interface Transaction {
  userId: string
  accountId: string
  transactionId: string
  amount: number
  date: string
  name: string
  merchantName?: string
  category: string[]
  pending: boolean
  // Custom classification
  platform?: "Uber" | "Lyft" | "DoorDash" | "UberEats"
  expenseType?: "Gas" | "Tolls" | "Parking" | "Maintenance" | "Other"
  isIncome: boolean
  createdAt: Date
  updatedAt: Date
}

export interface BalanceHistory {
  userId: string
  accountId: string
  availableBalance?: number
  currentBalance: number
  limit?: number
  currency: string
  recordedAt: Date
}

export interface ManualAsset {
  userId: string
  assetId: string
  name: string
  type: "cash" | "investment" | "property" | "vehicle" | "other"
  value: number
  currency: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Liability {
  userId: string
  liabilityId: string
  name: string
  type: "loan" | "credit_card" | "mortgage" | "other"
  balance: number
  interestRate?: number
  minimumPayment?: number
  dueDate?: string
  currency: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface TransactionOverride {
  userId: string
  transactionId: string
  platform?: "Uber" | "Lyft" | "DoorDash" | "UberEats"
  expenseType?: "Gas" | "Tolls" | "Parking" | "Maintenance" | "Other"
  notes?: string
  createdAt: Date
}

// Argyle-specific schemas for rideshare data
export interface ArgyleItem {
  userId: string
  itemId: string
  accessToken: string
  platform: "Uber" | "Lyft" | "DoorDash" | "UberEats"
  createdAt: Date
}

export interface DriverTrip {
  userId: string
  platform: "Uber" | "Lyft" | "DoorDash" | "UberEats"
  tripId: string
  startTime: Date
  endTime: Date
  distanceMiles: number
  durationMin: number
  status: string
  earningsTip: number
  earningsBase: number
  city?: string
  createdAt: Date
}

export interface DriverEarning {
  userId: string
  platform: "Uber" | "Lyft" | "DoorDash" | "UberEats"
  earningId: string
  totalAmount: number
  tips: number
  bonuses: number
  startDate: string
  endDate: string
  payoutStatus: string
  updatedAt: Date
}

export interface DriverBalance {
  userId: string
  platform: "Uber" | "Lyft" | "DoorDash" | "UberEats"
  balanceAmount: number
  lastSyncedAt: Date
}

// Collection getters
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

export async function getPlaidItemsCollection() {
  const client = await clientPromise
  return client.db("boosted_earnings").collection<PlaidItem>("plaid_items")
}

export async function getAccountsCollection() {
  const client = await clientPromise
  return client.db("boosted_earnings").collection<Account>("accounts")
}

export async function getTransactionsCollection() {
  const client = await clientPromise
  return client.db("boosted_earnings").collection<Transaction>("transactions")
}

export async function getBalanceHistoryCollection() {
  const client = await clientPromise
  return client.db("boosted_earnings").collection<BalanceHistory>("balance_history")
}

export async function getManualAssetsCollection() {
  const client = await clientPromise
  return client.db("boosted_earnings").collection<ManualAsset>("manual_assets")
}

export async function getLiabilitiesCollection() {
  const client = await clientPromise
  return client.db("boosted_earnings").collection<Liability>("liabilities")
}

export async function getTransactionOverridesCollection() {
  const client = await clientPromise
  return client.db("boosted_earnings").collection<TransactionOverride>("transaction_overrides")
}

// Collection getters for Argyle data
export async function getArgyleItemsCollection() {
  const client = await clientPromise
  return client.db("boosted_earnings").collection<ArgyleItem>("argyle_items")
}

export async function getDriverTripsCollection() {
  const client = await clientPromise
  return client.db("boosted_earnings").collection<DriverTrip>("driver_trips")
}

export async function getDriverEarningsCollection() {
  const client = await clientPromise
  return client.db("boosted_earnings").collection<DriverEarning>("driver_earnings")
}

export async function getDriverBalancesCollection() {
  const client = await clientPromise
  return client.db("boosted_earnings").collection<DriverBalance>("driver_balances")
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

export async function savePlaidItem(item: PlaidItem) {
  const collection = await getPlaidItemsCollection()
  await collection.updateOne({ userId: item.userId, itemId: item.itemId }, { $set: item }, { upsert: true })
}

export async function saveAccount(account: Account) {
  const collection = await getAccountsCollection()
  await collection.updateOne(
    { userId: account.userId, accountId: account.accountId },
    { $set: account },
    { upsert: true },
  )
}

export async function saveTransaction(transaction: Transaction) {
  const collection = await getTransactionsCollection()
  await collection.updateOne(
    { userId: transaction.userId, transactionId: transaction.transactionId },
    { $set: transaction },
    { upsert: true },
  )
}

export async function saveBalanceHistory(balance: BalanceHistory) {
  const collection = await getBalanceHistoryCollection()
  await collection.insertOne(balance)
}

export async function saveManualAsset(asset: ManualAsset) {
  const collection = await getManualAssetsCollection()
  await collection.updateOne({ userId: asset.userId, assetId: asset.assetId }, { $set: asset }, { upsert: true })
}

export async function saveLiability(liability: Liability) {
  const collection = await getLiabilitiesCollection()
  await collection.updateOne(
    { userId: liability.userId, liabilityId: liability.liabilityId },
    { $set: liability },
    { upsert: true },
  )
}

export async function saveTransactionOverride(override: TransactionOverride) {
  const collection = await getTransactionOverridesCollection()
  await collection.updateOne(
    { userId: override.userId, transactionId: override.transactionId },
    { $set: override },
    { upsert: true },
  )
}

// Helper functions for Argyle data
export async function saveArgyleItem(item: ArgyleItem) {
  const collection = await getArgyleItemsCollection()
  await collection.updateOne({ userId: item.userId, itemId: item.itemId }, { $set: item }, { upsert: true })
}

export async function saveDriverTrip(trip: DriverTrip) {
  const collection = await getDriverTripsCollection()
  await collection.updateOne({ tripId: trip.tripId }, { $set: trip }, { upsert: true })
}

export async function saveDriverEarning(earning: DriverEarning) {
  const collection = await getDriverEarningsCollection()
  await collection.updateOne({ earningId: earning.earningId }, { $set: earning }, { upsert: true })
}

export async function saveDriverBalance(balance: DriverBalance) {
  const collection = await getDriverBalancesCollection()
  await collection.updateOne(
    { userId: balance.userId, platform: balance.platform },
    { $set: balance },
    { upsert: true },
  )
}
