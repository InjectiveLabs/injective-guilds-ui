export interface GuildAsset {
  card: string
  banner: string
  thumbnail: string
  story: string
  strategy: string
}

export const guildImageMappings = {
  'the kuja': {
    card: '/guilds/one/card.jpg',
    banner: '/guilds/one/banner.jpg',
    thumbnail: '/guilds/one/thumbnail.png',
    story:
      'Famous for viewing strength and courage as true beauty, The Kuja is a guild for the brave. Previously content being isolated in its planet since The Great War, the Kuja is now active again and has set its sight to be the best Trading Guild. The reason behind its motive remains unknown.',
    strategy:
      'Active medium risk market making. Aiming to find balance between making profit from trading and earning rewards.'
  },
  'hades raiders': {
    card: '/guilds/two/card.jpg',
    banner: '/guilds/two/banner.jpg',
    thumbnail: '/guilds/two/thumbnail.png',
    story:
      'Agile, cunning and deadly, Hades Raiders will do anything to win. They are very good at disguise and have a wide network of spies, giving them the edge to learn about information before most people and nothing comes as a surprise to them. Followed The Kuja into the Tradingverse, it is anyone’s guess what they are scheming now.',
    strategy:
      'Active low risk market making. Diversify asset allocation between BTC/USDT and INJ/USDT market. Aiming to earn rewards while maintaining a small open position all the time. At any given time, orders will be on both buy and sell sides. If there is a sudden change in market condition, the open orders will be immediately updated.'
  },
  ethixx: {
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
  '/injective.exchange.v1beta1.MsgBatchCancelSpotOrders',
  '/injective.exchange.v1beta1.MsgCreateDerivativeLimitOrder',
  '/injective.exchange.v1beta1.MsgCreateDerivativeMarketOrder',
  '/injective.exchange.v1beta1.MsgCancelDerivativeOrder',
  '/injective.exchange.v1beta1.MsgBatchUpdateOrders',
  '/injective.exchange.v1beta1.MsgBatchCancelDerivativeOrders',
  '/injective.exchange.v1beta1.MsgDeposit',
  '/injective.exchange.v1beta1.MsgWithdraw'
]
