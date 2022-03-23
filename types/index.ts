import { Token } from '@injectivelabs/ui-common'
import { BigNumberInBase } from '@injectivelabs/utils'
import { TradeDirection } from '@injectivelabs/ts-types'
import { GuildStatus } from './enums'

export interface DOMEvent<T extends EventTarget> extends Event {
  target: T
  charCode?: number
}

export interface GeoLocation {
  continent: string
  country: string
}

export interface MyGuild {
  name: string
  holdings: BigNumberInBase
  earnings: BigNumberInBase
  apy: number
}
interface Currency {
  symbol: string
  logo: string
  name: string
}

export interface UIGuildCard {
  name: string
  image: string
  memberAmount: BigNumberInBase
  apy: number
  totalAssetsAmount: BigNumberInBase
  assets: Array<Currency>
  status: GuildStatus
  additionalInfo?: string
}

export interface UIPortfolioAsset {
  allocation: string
  pnl: BigNumberInBase
  value: BigNumberInBase
  token: Token
}

export interface UIMember {
  address: string
  since: number
  percentage: string
}

export interface UITrade {
  market: string
  amount: BigNumberInBase
  price: BigNumberInBase
  side: TradeDirection
  date: number
  token: Token
}

export * from './enums'
