export interface GuildAsset {
  card: string
  banner: string
  thumbnail: string
  story: string
  strategy: string
}

export const guildImageMappings = {
  '623e5d4817b0efe585f733d1': {
    card: '/guilds/one/card.png',
    banner: '/guilds/one/banner.png',
    thumbnail: '/guilds/one/thumbnail.png',
    story:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    strategy:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  '623e5d62d8c259bac38565d6': {
    card: '/guilds/two/card.png',
    banner: '/guilds/two/banner.png',
    thumbnail: '/guilds/two/thumbnail.png',
    story:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    strategy:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  '623ed3bd37f7e9a55c984aad': {
    card: '/guilds/three/card.png',
    banner: '/guilds/three/banner.png',
    thumbnail: '/guilds/three/thumbnail.png',
    story:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    strategy:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  default: {
    card: '/guilds/four/card.png',
    banner: '/guilds/four/banner.png',
    thumbnail: '/guilds/four/thumbnail.png',
    story: 'Coming soon',
    strategy: 'Coming soon'
  }
} as Record<string, GuildAsset>

export const authzMessageTypes = [
  '/injective.exchange.v1beta1.MsgCreateSpotLimitOrder',
  '/injective.exchange.v1beta1.MsgCreateSpotMarketOrder',
  '/injective.exchange.v1beta1.MsgCancelSpotOrder',
  '/injective.exchange.v1beta1.MsgBatchUpdateOrders',
  '/injective.exchange.v1beta1.MsgBatchCancelSpotOrders',
  '/injective.exchange.v1beta1.MsgDeposit',
  '/injective.exchange.v1beta1.MsgWithdraw',
  '/injective.exchange.v1beta1.MsgCreateDerivativeLimitOrder',
  '/injective.exchange.v1beta1.MsgCreateDerivativeMarketOrder',
  '/injective.exchange.v1beta1.MsgCancelDerivativeOrder',
  '/injective.exchange.v1beta1.MsgBatchUpdateOrders',
  '/injective.exchange.v1beta1.MsgBatchCancelDerivativeOrders',
  '/injective.exchange.v1beta1.MsgDeposit',
  '/injective.exchange.v1beta1.MsgWithdraw'
]
