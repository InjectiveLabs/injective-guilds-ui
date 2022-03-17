import type { Plugin } from '@nuxt/types'
import merge from 'deepmerge'
import { localStorage } from '~/app/singletons/Storage'
import { AppState } from '~/types/enums'

const mutationsToPersist = [
  'wallet/reset',
  'wallet/logout',
  'wallet/setAddress',
  'wallet/setWallet',
  'wallet/setWalletOptions',
  'wallet/setInjectiveAddress',
  'wallet/setAddressConfirmation'
]

const actionsThatSetAppStateToBusy = [] as String[]

const store: Plugin = ({ store, app }) => {
  const localState = localStorage.get('state') as any

  // Replace Local State
  store.replaceState(merge(store.state, localState))

  // Subscribe to Changes
  store.subscribe(({ type }) => {
    if (mutationsToPersist.includes(type)) {
      const stateToPersist = {
        wallet: {
          wallet: app.$accessor.wallet.wallet,
          walletOptions: app.$accessor.wallet.walletOptions,
          addresses: app.$accessor.wallet.addresses,
          address: app.$accessor.wallet.address,
          injectiveAddress: app.$accessor.wallet.injectiveAddress,
          addressConfirmation: app.$accessor.wallet.addressConfirmation
        }
      }

      localStorage.set('state', stateToPersist)
    }
  })

  store.subscribeAction({
    after: ({ type }: { type: string }) => {
      if (actionsThatSetAppStateToBusy.includes(type)) {
        app.$accessor.app.setAppState(AppState.Idle)
      }
    },

    error: ({ type }: { type: string }) => {
      if (actionsThatSetAppStateToBusy.includes(type)) {
        app.$accessor.app.setAppState(AppState.Idle)
      }
    }
  })
}

export default store
