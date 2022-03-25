import { BigNumberInBase } from '@injectivelabs/utils'
import { TradeDirection } from '@injectivelabs/ts-types'
import { MyGuild, UIPortfolioAsset, UITrade } from '~/types'

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
