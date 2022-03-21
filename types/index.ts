import { BigNumberInBase } from '@injectivelabs/utils'

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
  isFull: boolean
  isJoinable: boolean
  isJoined: boolean
  isQualified: boolean
}

export * from './enums'
