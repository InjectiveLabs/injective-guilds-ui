import { Token } from '@injectivelabs/ui-common'
import { BigNumberInBase } from '@injectivelabs/utils'
import { TradeDirection } from '@injectivelabs/ts-types'

export interface ApiResponse<T> {
  data: T
}

export interface DOMEvent<T extends EventTarget> extends Event {
  target: T
  charCode?: number
}

export interface GeoLocation {
  continent: string
  country: string
}

// Todo: remove UiTrade
export interface UITrade {
  market: string
  amount: BigNumberInBase
  price: BigNumberInBase
  side: TradeDirection
  date: number
  token: Token
}

export * from './enums'
export * from '~/app/services/guild/types'
export * from '~/app/services/member/types'
