import { getUrlEndpointForNetwork } from '@injectivelabs/networks'
import {
  BankService,
  DerivativeActionService,
  DerivativeService,
  MetricsProvider,
  ServiceOptions,
  SpotActionService,
  SpotService,
  SubaccountService,
  TokenCoinGeckoService,
  TokenService,
  TxProvider
} from '@injectivelabs/ui-common'
import { TxProviderBaseOptions } from '@injectivelabs/ui-common/dist/providers/TxProvider'
import {
  CHAIN_ID,
  IS_TESTNET,
  IS_DEVNET,
  NETWORK,
  APP_EXCHANGE_API_ENDPOINT,
  APP_SENTRY_GRPC_ENDPOINT
} from './utils/constants'
import { GuildActionService, GuildService } from './services/guild'
import { MemberService } from './services/member'
import { web3Strategy } from './web3'
import { app } from '~/app/singletons/App'

const endpoints = getUrlEndpointForNetwork(NETWORK)
const commonServiceOptions = {
  chainId: CHAIN_ID,
  network: NETWORK,
  endpoints: {
    ...endpoints,
    exchangeApiEndpoint: APP_EXCHANGE_API_ENDPOINT || endpoints.exchangeApi,
    sentryGrpcApiEndpoint: APP_SENTRY_GRPC_ENDPOINT || endpoints.sentryGrpcApi
  },
  metricsProvider: new MetricsProvider({
    region: app.regionForMetrics,
    appEnv: process.env.APP_ENV,
    nodeEnv: process.env.NODE_ENV
  })
} as ServiceOptions

const guildServiceEndpoint = IS_DEVNET
  ? 'https://devnet.guilds.injective.dev'
  : IS_TESTNET
  ? 'https://testnet.guilds.injective.dev'
  : 'https://staging.guilds.injective.network'

const coinGeckoOptions = {
  apiKey: process.env.APP_COINGECKO_KEY as string,
  baseUrl: process.env.APP_COINGECKO_KEY
    ? 'https://pro-api.coingecko.com/api/v3'
    : 'https://api.coingecko.com/api/v3'
}

const txProvider = new TxProvider({
  ...commonServiceOptions,
  web3Strategy
} as TxProviderBaseOptions)

export const tokenCoinGeckoService = new TokenCoinGeckoService(
  commonServiceOptions,
  coinGeckoOptions
)

export const bankService = new BankService(commonServiceOptions)
export const derivativeService = new DerivativeService(commonServiceOptions)
export const guildService = new GuildService(guildServiceEndpoint)
export const memberService = new MemberService(guildServiceEndpoint)
export const spotService = new SpotService(commonServiceOptions)
export const subaccountService = new SubaccountService(commonServiceOptions)
export const tokenService = new TokenService(commonServiceOptions)

export const derivativeActionService = new DerivativeActionService({
  options: commonServiceOptions,
  txProvider
})

export const spotActionService = new SpotActionService({
  options: commonServiceOptions,
  txProvider
})

export const guildActionService = new GuildActionService({
  options: commonServiceOptions,
  txProvider
})
