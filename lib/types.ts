// Type definitions for earnings data

export interface EarningsData {
  totalEarnings: number
  hoursWorked: number
  avgHourly: number
  trips: number
  earningsChange?: number
  hoursChange?: number
  avgHourlyChange?: number
  tripsChange?: number
  breakdown?: PlatformBreakdown[]
  dailyData?: DailyEarnings[]
}

export interface PlatformBreakdown {
  platform: string
  earnings: number
  trips: number
}

export interface DailyEarnings {
  date: string
  earnings: number
  hours: number
  name?: string
}

export interface ArgyleAccount {
  accountId: string
  platform: string
  userId: string
  linkToken?: string
}

export interface PlaidAccount {
  accessToken: string
  itemId: string
  userId: string
}
