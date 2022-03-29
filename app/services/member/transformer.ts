import { ApiMember, UiMember } from './types'

export const ApiMemberToUiMember = (apiMember: ApiMember): UiMember => {
  return {
    injectiveAddress: apiMember.injective_address,
    isDefaultGuildMember: apiMember.is_default_guild_member,
    since: apiMember.since,
    guildId: apiMember.guild_id
  }
}

export class MemberTransformer {
  static ApiMemberToUiMember = ApiMemberToUiMember
}
