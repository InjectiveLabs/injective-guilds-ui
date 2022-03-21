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
  holdings: BigNumberInBase,
  earnings: BigNumberInBase,
  apy: number
}

export * from './enums'
