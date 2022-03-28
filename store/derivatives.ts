import { actionTree } from 'typed-vuex'
import {
  DerivativeTransformer,
  UiDerivativeMarketWithToken
} from '@injectivelabs/ui-common'
import {
  derivativeActionService,
  derivativeService,
  tokenService
} from '~/app/Services'

const initialStateFactory = () => ({
  markets: [] as UiDerivativeMarketWithToken[]
})

const initialState = initialStateFactory()

export const state = () => ({
  markets: initialState.markets as UiDerivativeMarketWithToken[]
})

export type DerivativeStoreState = ReturnType<typeof state>

export const mutations = {
  setMarkets(
    state: DerivativeStoreState,
    markets: UiDerivativeMarketWithToken[]
  ) {
    state.markets = markets
  },

  reset(state: DerivativeStoreState) {
    const initialState = initialStateFactory()

    state.markets = initialState.markets
  }
}

export const actions = actionTree(
  { state, mutations },
  {
    async fetchMarkets({ commit }) {
      const markets = await derivativeService.fetchMarkets()
      const marketsWithToken = await tokenService.getDerivativeMarketsWithToken(
        markets
      )
      const uiMarkets =
        DerivativeTransformer.derivativeMarketsToUiSpotMarkets(marketsWithToken)

      commit('setMarkets', uiMarkets)
    },

    async batchCancelOrder(_) {
      const { subaccount } = this.app.$accessor.account
      const { address, injectiveAddress, isUserWalletConnected } =
        this.app.$accessor.wallet

      if (!isUserWalletConnected || !subaccount) {
        return
      }

      const orders = await derivativeService.fetchOrders({
        subaccountId: subaccount.subaccountId
      })

      await this.app.$accessor.wallet.validate()

      await derivativeActionService.batchCancelOrders({
        injectiveAddress,
        address,
        orders: orders.map((o) => ({
          orderHash: o.orderHash,
          subaccountId: o.subaccountId,
          marketId: o.marketId
        }))
      })
    }
  }
)
