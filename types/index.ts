import { UiGuild, UiGuildRequirement } from '~/app/services/guild'

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

export type UiGuildToJoinModal =
  | {
      guild: UiGuild
      requirements: UiGuildRequirement[]
    }
  | undefined

export * from './enums'
export * from '~/app/services/guild/types'
export * from '~/app/services/member/types'
