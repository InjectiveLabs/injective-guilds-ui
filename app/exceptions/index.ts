export class GuildNotFoundException extends Error {}
export class MemberNotFoundException extends Error {}
export class AddressRestrictedAccessException extends Error {}
export class GeoRestrictedAccessException extends Error {}

export const isCustomException = (error: any) =>
  error instanceof GuildNotFoundException ||
  error instanceof MemberNotFoundException

export const isAccountRestrictedException = (error: any) =>
  error instanceof AddressRestrictedAccessException ||
  error instanceof GeoRestrictedAccessException
