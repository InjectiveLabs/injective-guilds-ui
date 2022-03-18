import { getUrlEndpointForNetwork } from '@injectivelabs/networks'
import { GasService, ServiceOptions } from '@injectivelabs/ui-common'
import {
  CHAIN_ID,
  NETWORK,
  METRICS_ENABLED,
  APP_EXCHANGE_API_ENDPOINT,
  APP_SENTRY_GRPC_ENDPOINT
} from './utils/constants'
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

export const gasService = new GasService(commonServiceOptions)
