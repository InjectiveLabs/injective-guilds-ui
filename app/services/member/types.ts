/* eslint-disable camelcase */
import { BigNumberInBase } from '@injectivelabs/utils'
import { UiPortfolio } from '../guild/types'

export interface ApiMember {
  injective_address: string
  is_default_guild_member: boolean
  since: number
  guild_id: string
}

export interface UiMember {
  injectiveAddress: string
  isDefaultGuildMember: boolean
  since: number
  guildId: string
}

export interface UiMemberPortfolio {
  firstSnapshot: UiPortfolio
  lastSnapshot: UiPortfolio
  historicalReturns: BigNumberInBase
}
