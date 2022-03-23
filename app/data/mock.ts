import { BigNumberInBase } from '@injectivelabs/utils'
import { TradeDirection } from '@injectivelabs/ts-types'
import { MyGuild, UIMember, UIPortfolioAsset, UITrade } from '~/types'

export const portfolioChartData = [
  {
    name: 'Portfolio value',
    type: 'area',
    data: [
      [1640151572879, 15837.153643128937],
      [1640280712005, 15836.849912503916],
      [1640410427048, 16267.511445202452],
      [1640540013559, 18001.090759664177],
      [1640669624595, 18331.29785997139],
      [1640799191568, 16888.52359855367],
      [1640928879598, 16292.561157677857],
      [1641058408747, 16370.1410952674],
      [1641188011906, 16815.94916988127],
      [1641317606592, 16390.980469951683],
      [1641447296917, 14525.756160508032],
      [1641576840988, 13636.143836206034],
      [1641706470970, 13297.132542476023],
      [1641836014440, 12895.320605811025],
      [1641965812393, 14334.605129818177],
      [1642095432958, 13159.690325319374],
      [1642225122890, 12834.802127990024],
      [1642353638693, 14265.110993410544],
      [1642483319038, 12313.50627569739],
      [1642612899841, 11771.20624184499],
      [1642742350762, 10934.649344294976],
      [1642871545965, 8423.727198193132],
      [1643001663935, 7950.170714136812],
      [1643131314975, 7778.603297456965],
      [1643263391468, 7764.4464384341445],
      [1643392918258, 8559.724863091795],
      [1643522727052, 8110.225195720642],
      [1643652438115, 7971.4235660414315],
      [1643782008627, 8204.660537282532],
      [1643911616246, 7784.2797331407],
      [1644041242059, 8916.414466926462],
      [1644170588041, 9121.99785588157],
      [1644300150984, 9549.76851735174],
      [1644429641706, 8925.95633835644],
      [1644570770837, 8754.960628131108],
      [1644703420082, 13675.641566165714],
      [1644832864371, 11403.962105252014],
      [1644962571522, 11779.537098223875],
      [1645092292473, 11440.426049070871],
      [1645221922518, 10565.573417564965],
      [1645351347174, 13001.756710465565],
      [1645477319043, 9760.850015004886],
      [1645607001560, 11079.946480429724],
      [1645736657732, 10002.0736248989],
      [1645866383702, 10871.155143409225]
    ]
  }
]

export const myGuilds = [
  {
    name: 'schneider',
    holdings: new BigNumberInBase('1388783'),
    earnings: new BigNumberInBase('400'),
    apy: 5.06
  },
  {
    name: 'schneider',
    holdings: new BigNumberInBase('1388783'),
    earnings: new BigNumberInBase('400'),
    apy: 5.06
  }
] as MyGuild[]

export const guildMaster = {
  address: 'inj1zevxz8gk07cdzetn99845yg7a2raznsse7pxwa'
}

export const portfolioAssets = [
  {
    allocation: '33.06%',
    pnl: new BigNumberInBase('0'),
    value: new BigNumberInBase('0'),
    token: {
      denom: 'peggy0xdAC17F958D2ee523a2206206994597C13D831ec7',
      logo: '/vendor/@injectivelabs/token-metadata/usdt.svg',
      symbol: 'USDT',
      name: 'USDT',
      decimals: 6,
      address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      coinGeckoId: 'tether'
    }
  },
  {
    allocation: '33.06%',
    pnl: new BigNumberInBase('0'),
    value: new BigNumberInBase('0'),
    token: {
      denom: 'inj',
      logo: '/vendor/@injectivelabs/token-metadata/injective-v3.svg',
      symbol: 'INJ',
      name: 'Injective',
      decimals: 18,
      address: '0xe28b3b32b6c345a34ff64674606124dd5aceca30',
      coinGeckoId: 'injective-protocol'
    }
  },
  {
    allocation: '33.06%',
    pnl: new BigNumberInBase('0'),
    value: new BigNumberInBase('0'),
    token: {
      denom: 'peggy0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      logo: '/vendor/@injectivelabs/token-metadata/ethereum.svg',
      symbol: 'wETH',
      name: 'Wrapped Ethereum',
      decimals: 18,
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      coinGeckoId: 'ethereum'
    }
  }
] as UIPortfolioAsset[]

export const portfolioMember = {
  address: 'inj1zevxz8gk07cdzetn99845yg7a2raznsse7pxwa',
  since: 1644300150984,
  percentage: '33.06%'
} as UIMember

export const portfolioTrades = [
  {
    market: 'wETH/USDT Perp',
    amount: new BigNumberInBase('5'),
    price: new BigNumberInBase('2700'),
    side: TradeDirection.Long,
    date: 1644300150984,
    token: {
      denom: 'peggy0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      logo: '/vendor/@injectivelabs/token-metadata/ethereum.svg',
      symbol: 'wETH',
      name: 'Wrapped Ethereum',
      decimals: 18,
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      coinGeckoId: 'ethereum'
    }
  },
  {
    market: 'INJ/USDT Perp',
    amount: new BigNumberInBase('50'),
    price: new BigNumberInBase('5.54'),
    side: TradeDirection.Long,
    date: 1645607001560,
    token: {
      denom: 'inj',
      logo: '/vendor/@injectivelabs/token-metadata/injective-v3.svg',
      symbol: 'INJ',
      name: 'Injective',
      decimals: 18,
      address: '0xe28b3b32b6c345a34ff64674606124dd5aceca30',
      coinGeckoId: 'injective-protocol'
    }
  }
] as UITrade[]
