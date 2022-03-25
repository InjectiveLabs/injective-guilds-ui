import { getUrlEndpointForNetwork } from '@injectivelabs/networks'
import {
  BankService,
  DerivativeService,
  ServiceOptions,
  SubaccountService,
  SpotService,
  TokenCoinGeckoService,
  TokenService
} from '@injectivelabs/ui-common'
import {
  CHAIN_ID,
  NETWORK,
  METRICS_ENABLED,
  APP_EXCHANGE_API_ENDPOINT,
  APP_SENTRY_GRPC_ENDPOINT
} from './utils/constants'
import { GuildService } from './services/guild/service'
import { MemberService } from './services/member/service'
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
export const guildService = new GuildService('https://devnet.api.injective.dev')
export const memberService = new MemberService(
  'https://devnet.api.injective.dev'
)
export const spotService = new SpotService(commonServiceOptions)
export const subaccountService = new SubaccountService(commonServiceOptions)
export const tokenService = new TokenService(commonServiceOptions)
