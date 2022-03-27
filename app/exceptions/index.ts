export class GuildNotFoundException extends Error {}
export class MemberNotFoundException extends Error {}
export class CannotJoinGuildException extends Error {}
export class CannotLeaveGuildException extends Error {}

export const isCustomException = (error: any) =>
  error instanceof GuildNotFoundException ||
  error instanceof MemberNotFoundException ||
  error instanceof CannotJoinGuildException ||
  error instanceof CannotLeaveGuildException
