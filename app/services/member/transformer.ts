import { ApiProfile, UiProfile } from './types'

export const ApiProfileToUiProfile = (apiProfile: ApiProfile): UiProfile => {
  return {
    injectiveAddress: apiProfile.injective_address,
    isDefaultGuildMember: apiProfile.is_default_guild_member,
    since: apiProfile.since,
    guildId: apiProfile.guild_id
  }
}

export class MemberTransformer {
  static ApiProfileToUiProfile = ApiProfileToUiProfile
}
