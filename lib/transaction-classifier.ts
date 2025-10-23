import { type Transaction, getTransactionOverridesCollection } from "./mongodb-schemas"

// Platform detection patterns
const PLATFORM_PATTERNS = {
  Uber: [/uber(?!.*eats)/i, /uber\s+trip/i, /uber\s+ride/i],
  Lyft: [/lyft/i],
  DoorDash: [/doordash/i, /door\s+dash/i],
  UberEats: [/uber\s*eats/i, /ubereats/i],
}

// Expense type detection patterns
const EXPENSE_PATTERNS = {
  Gas: [
    /shell/i,
    /chevron/i,
    /exxon/i,
    /mobil/i,
    /bp\s/i,
    /arco/i,
    /valero/i,
    /76\s/i,
    /gas\s+station/i,
    /fuel/i,
    /gasoline/i,
  ],
  Tolls: [/toll/i, /fastrak/i, /ez\s*pass/i, /sunpass/i, /ipass/i, /bridge\s+authority/i],
  Parking: [/parking/i, /park\s+&/i, /parkwhiz/i, /spothero/i, /parkopedia/i],
  Maintenance: [
    /auto\s+repair/i,
    /car\s+wash/i,
    /oil\s+change/i,
    /tire/i,
    /brake/i,
    /mechanic/i,
    /jiffy\s+lube/i,
    /pep\s+boys/i,
    /autozone/i,
    /o'reilly/i,
  ],
}

/**
 * Classifies a transaction into platform and expense type
 * Checks for user overrides first, then applies pattern matching
 */
export async function classifyTransaction(
  transaction: Transaction,
  userId: string,
): Promise<{
  platform?: "Uber" | "Lyft" | "DoorDash" | "UberEats"
  expenseType?: "Gas" | "Tolls" | "Parking" | "Maintenance" | "Other"
  isIncome: boolean
}> {
  // Check for user override first
  const overridesCollection = await getTransactionOverridesCollection()
  const override = await overridesCollection.findOne({
    userId,
    transactionId: transaction.transactionId,
  })

  if (override) {
    return {
      platform: override.platform,
      expenseType: override.expenseType,
      isIncome: transaction.amount > 0,
    }
  }

  // Auto-classify based on patterns
  const searchText = `${transaction.name} ${transaction.merchantName || ""}`.toLowerCase()

  // Detect platform (income)
  let platform: "Uber" | "Lyft" | "DoorDash" | "UberEats" | undefined
  for (const [platformName, patterns] of Object.entries(PLATFORM_PATTERNS)) {
    if (patterns.some((pattern) => pattern.test(searchText))) {
      platform = platformName as "Uber" | "Lyft" | "DoorDash" | "UberEats"
      break
    }
  }

  // Detect expense type (expenses)
  let expenseType: "Gas" | "Tolls" | "Parking" | "Maintenance" | "Other" | undefined
  if (transaction.amount < 0) {
    // Only classify expenses
    for (const [type, patterns] of Object.entries(EXPENSE_PATTERNS)) {
      if (patterns.some((pattern) => pattern.test(searchText))) {
        expenseType = type as "Gas" | "Tolls" | "Parking" | "Maintenance"
        break
      }
    }
    if (!expenseType) {
      expenseType = "Other"
    }
  }

  return {
    platform,
    expenseType,
    isIncome: transaction.amount > 0,
  }
}

/**
 * Batch classify multiple transactions
 */
export async function classifyTransactions(transactions: Transaction[], userId: string) {
  const classified = await Promise.all(
    transactions.map(async (tx) => {
      const classification = await classifyTransaction(tx, userId)
      return {
        ...tx,
        ...classification,
      }
    }),
  )
  return classified
}

/**
 * Get income by platform for a date range
 */
export async function getIncomeByPlatform(
  userId: string,
  startDate: Date,
  endDate: Date,
): Promise<Record<string, number>> {
  const { getTransactionsCollection } = await import("./mongodb-schemas")
  const collection = await getTransactionsCollection()

  const transactions = await collection
    .find({
      userId,
      date: {
        $gte: startDate.toISOString().split("T")[0],
        $lte: endDate.toISOString().split("T")[0],
      },
      isIncome: true,
      platform: { $exists: true, $ne: null },
    })
    .toArray()

  const incomeByPlatform: Record<string, number> = {}
  for (const tx of transactions) {
    if (tx.platform) {
      incomeByPlatform[tx.platform] = (incomeByPlatform[tx.platform] || 0) + tx.amount
    }
  }

  return incomeByPlatform
}

/**
 * Get expenses by type for a date range
 */
export async function getExpensesByType(
  userId: string,
  startDate: Date,
  endDate: Date,
): Promise<Record<string, number>> {
  const { getTransactionsCollection } = await import("./mongodb-schemas")
  const collection = await getTransactionsCollection()

  const transactions = await collection
    .find({
      userId,
      date: {
        $gte: startDate.toISOString().split("T")[0],
        $lte: endDate.toISOString().split("T")[0],
      },
      isIncome: false,
      expenseType: { $exists: true, $ne: null },
    })
    .toArray()

  const expensesByType: Record<string, number> = {}
  for (const tx of transactions) {
    if (tx.expenseType) {
      expensesByType[tx.expenseType] = (expensesByType[tx.expenseType] || 0) + Math.abs(tx.amount)
    }
  }

  return expensesByType
}
