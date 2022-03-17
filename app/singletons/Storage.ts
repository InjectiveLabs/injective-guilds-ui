import { LocalStorage } from '@injectivelabs/utils'
import { NETWORK } from '~/app/utils/constants'

export const localStorage: LocalStorage = new LocalStorage(
  `inj-guild-v1-${NETWORK}-${process.env.APP_ENV || 'mainnet'}`
)
