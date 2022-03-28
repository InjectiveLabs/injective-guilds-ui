export class GuildNotFoundException extends Error {}
export class MemberNotFoundException extends Error {}

export const isCustomException = (error: any) =>
  error instanceof GuildNotFoundException ||
  error instanceof MemberNotFoundException
