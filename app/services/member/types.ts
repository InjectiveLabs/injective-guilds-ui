/* eslint-disable camelcase */
import { BigNumberInBase } from '@injectivelabs/utils'
import { UiPortfolio } from '../guild/types'
export interface ApiProfile {
  injective_address: string
  is_default_guild_member: boolean
  since: number
  guild_id: string
}

export interface UiProfile {
  injectiveAddress: string
  isDefaultGuildMember: boolean
  since: number
  guildId: string
}

export interface UIProfilePortfolio {
  firstSnapshot: UiPortfolio
  lastSnapshot: UiPortfolio
  historicalReturns: BigNumberInBase
}
