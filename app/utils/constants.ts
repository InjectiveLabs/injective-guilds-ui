import { Network } from '@injectivelabs/networks'
import { ChainId } from '@injectivelabs/ts-types'

export const METRICS_ENABLED: boolean = process.env.METRICS_ENABLED === 'true'
export const IS_DEVELOPMENT: boolean = process.env.NODE_ENV === 'development'
export const IS_PRODUCTION: boolean = process.env.NODE_ENV === 'production'
export const BASE_URL: string =
  process.env.APP_BASE_URL || 'http://localhost:3000'

export const GEO_IP_RESTRICTIONS_ENABLED: boolean =
  process.env.GEO_IP_RESTRICTIONS_ENABLED === 'true'
export const VPN_PROXY_VALIDATION_PERIOD = 2 /* 2 days */

export const NETWORK: Network =
  (process.env.APP_NETWORK as Network) || Network.Devnet
export const IS_DEVNET = NETWORK === Network.Devnet
export const IS_TESTNET = [
  Network.Testnet,
  Network.TestnetK8s,
  Network.Devnet,
  Network.Local
].includes(NETWORK)

export const CHAIN_ID: ChainId = process.env.APP_CHAIN_ID
  ? parseInt(process.env.APP_CHAIN_ID.toString())
  : parseInt((IS_TESTNET ? ChainId.Kovan : ChainId.Mainnet).toString())

export const APP_EXCHANGE_API_ENDPOINT: string =
  process.env.APP_EXCHANGE_API_ENDPOINT || ''
export const APP_SENTRY_GRPC_ENDPOINT: string =
  process.env.APP_SENTRY_GRPC_ENDPOINT || ''

export const UI_DEFAULT_FIAT_DECIMALS = 2
export const UI_DEFAULT_ASSET_DECIMALS = 3
