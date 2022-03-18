import { Network } from '@injectivelabs/networks'

export const METRICS_ENABLED: boolean = process.env.METRICS_ENABLED === 'true'
export const IS_DEVELOPMENT: boolean = process.env.NODE_ENV === 'development'
export const IS_PRODUCTION: boolean = process.env.NODE_ENV === 'production'
export const BASE_URL: string =
  process.env.APP_BASE_URL || 'http://localhost:3000'

export const NETWORK: Network =
  (process.env.APP_NETWORK as Network) || Network.Devnet
