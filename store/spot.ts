import { actionTree } from 'typed-vuex'
import { spotActionService, spotService } from '~/app/Services'

export const state = () => ({})

export const mutations = {}

export const actions = actionTree(
  { state, mutations },
  {
    async batchCancelOrder(_) {
      const { subaccount } = this.app.$accessor.account
      const { address, injectiveAddress, isUserWalletConnected } =
        this.app.$accessor.wallet

      if (
        !isUserWalletConnected ||
        !subaccount ||
        !address ||
        !injectiveAddress
      ) {
        return
      }

      const orders = await spotService.fetchOrders({
        subaccountId: subaccount.subaccountId
      })

      if (orders.length === 0) {
        return
      }

      await this.app.$accessor.wallet.validate()

      await spotActionService.batchCancelOrders({
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
