import { getUrlEndpointForNetwork } from '@injectivelabs/networks'
import {
  BankService,
  DerivativeActionService,
  DerivativeService,
  ServiceOptions,
  SpotActionService,
  SpotService,
  SubaccountService,
  TokenCoinGeckoService,
  TokenService
} from '@injectivelabs/ui-common'
import {
  CHAIN_ID,
  IS_DEVNET,
  METRICS_ENABLED,
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
  metricsEnabled: METRICS_ENABLED || false,
  metricsRegion: app.regionForMetrics
} as ServiceOptions

const guildServiceEndpoint = IS_DEVNET
  ? 'https://devnet.api.injective.dev'
  : 'https://testnet.guilds.injective.dev/'

const coinGeckoOptions = {
  apiKey: process.env.APP_COINGECKO_KEY as string,
  baseUrl: process.env.APP_COINGECKO_KEY
    ? 'https://pro-api.coingecko.com/api/v3'
    : 'https://api.coingecko.com/api/v3'
}

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

export const derivativeActionService = new DerivativeActionService(
  commonServiceOptions,
  web3Strategy
)
export const spotActionService = new SpotActionService(
  commonServiceOptions,
  web3Strategy
)
export const guildActionService = new GuildActionService(
  commonServiceOptions,
  web3Strategy
)
