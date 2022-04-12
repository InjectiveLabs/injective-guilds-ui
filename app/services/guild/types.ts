import { Token } from '@injectivelabs/ui-common'
import { BigNumberInBase } from '@injectivelabs/utils'

/* eslint-disable camelcase */
export interface ApiPortfolioBalance {
  available_balance: string
  denom: string
  margin_hold: string
  price_usd: number
  total_balance: string
  unrealized_pnl: string
}

export interface ApiPortfolio {
  balances: ApiPortfolioBalance[]
  guild_id?: string
  updated_at: number
}

export interface ApiMonthlyPortfolio {
  time: number
  begin_snapshot: ApiPortfolio
  end_snapshot: ApiPortfolio
}

export interface ApiRequirements {
  denom: string
  min_amount_usd: number
  min_amount: number
}

export interface UiPortfolioBalance {
  availableBalance: BigNumberInBase
  denom: string
  marginHold: BigNumberInBase
  priceUsd: number
  totalBalance: BigNumberInBase
  unrealizedPnl: BigNumberInBase
  totalValue: BigNumberInBase
  totalValueInUsd: BigNumberInBase
}

export interface UiPortfolioBalanceWithToken extends UiPortfolioBalance {
  token: Token
}

export interface ApiGuild {
  id: string
  capacity: number
  derivative_quote_requirement: string
  description: string
  master_address: string
  member_count: number
  name: string
  spot_base_requirement: string
  spot_quote_requirement: string
  staking_requirement: string
  current_portfolio: ApiPortfolio
  default_member_address: string
  requirements: ApiRequirements[]
}

export interface ApiMarket {
  market_id: string
  is_perpetual: boolean
}

export interface UiMonthlyPortfolio {
  portfolioValue: BigNumberInBase
  balances: UiPortfolioBalanceWithToken[]
  returns: BigNumberInBase
  date: number
}

export interface UiPortfolio {
  portfolioValue: BigNumberInBase
  balances: UiPortfolioBalanceWithToken[]
  updatedAt: number
}
export interface UiPortfolioWithoutDate
  extends Omit<UiPortfolio, 'updatedAt'> {}

export interface ApiGuildMember {
  guild_id: string
  injective_address: string
  is_default_guild_member: boolean
  since: number
}

export interface UiGuildMember {
  guildId: string
  address: string
  since: number
}

export interface UiGuildMemberWithPortfolio extends UiGuildMember {
  portfolio: UiPortfolio
}
export interface UiGuildRequirement {
  denom: string
  minAmountInUsd: number
  minAmount: number
  outstandingAmountInBase: BigNumberInBase
  token: Token
}

export interface UiGuild {
  id: string
  capacity: number
  description: string
  masterAddress: string
  defaultMemberAddress: string
  memberCount: number
  name: string
  portfolio: UiPortfolio
  requirements: UiGuildRequirement[]
}

export interface UiGuildMarket {
  token: Token
  ticker: string
}

export interface UiGuildWithMeta extends UiGuild {
  monthlyPortfolios: UiMonthlyPortfolio[]
  markets: UiGuildMarket[]
}

export interface UiGuildWithReturns extends UiGuildWithMeta {
  returns: BigNumberInBase
}

export interface UIGuildChartData {
  name: string
  type: string
  data: number[][]
}

export enum GuildMetrics {
  Grant = 'MsgGrant',
  Revoke = 'MsgRevoke'
}
