import { actionTree } from 'typed-vuex'
import { DerivativeTransformer } from '@injectivelabs/ui-common'
import {
  derivativeActionService,
  derivativeService,
  guildActionService,
  spotActionService,
  spotService,
  tokenService
} from '~/app/Services'
import { mapPositionsForClosing } from '~/app/services/derivatives'
import { UiGuild, UiGuildRequirement } from '~/types'

export const state = () => ({
  //
})

export type ExchangeStoreState = ReturnType<typeof state>

export const mutations = {}

export const actions = actionTree(
  { state, mutations },
  {
    async batchCancelSpotOrder(_) {
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
    },

    async depositToTradingAccount(_, requirements: UiGuildRequirement[]) {
      const { subaccount } = this.app.$accessor.account
      const { address, injectiveAddress, isUserWalletConnected } =
        this.app.$accessor.wallet

      if (
        !isUserWalletConnected ||
        !subaccount ||
        !address ||
        !injectiveAddress ||
        requirements.length === 0
      ) {
        return
      }

      await this.app.$accessor.wallet.validate()

      await guildActionService.depositRemainingToTradingAccount({
        injectiveAddress,
        address,
        requirements,
        subaccountId: subaccount.subaccountId
      })
    },

    async batchCancelDerivativeOrder(_) {
      const { subaccount } = this.app.$accessor.account
      const { address, injectiveAddress, isUserWalletConnected } =
        this.app.$accessor.wallet

      if (!isUserWalletConnected || !subaccount) {
        return
      }

      const orders = await derivativeService.fetchOrders({
        subaccountId: subaccount.subaccountId
      })

      if (orders.length === 0) {
        return
      }

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
    },

    async closeAllPosition(_, guild: UiGuild | undefined) {
      const { subaccount } = this.app.$accessor.account
      const { address, injectiveAddress, isUserWalletConnected } =
        this.app.$accessor.wallet

      if (!isUserWalletConnected || !subaccount || !guild) {
        return
      }

      await this.app.$accessor.wallet.validate()

      const derivativeMarkets = await derivativeService.fetchMarkets()
      const derivativeMarketsWithToken =
        await tokenService.getDerivativeMarketsWithToken(derivativeMarkets)
      const uiDerivativeMarkets =
        DerivativeTransformer.derivativeMarketsToUiSpotMarkets(
          derivativeMarketsWithToken
        )
      const positions = await derivativeService.fetchPositions({
        subaccountId: subaccount.subaccountId
      })

      if (positions.length === 0) {
        return
      }

      const formattedPositions = mapPositionsForClosing(
        positions,
        uiDerivativeMarkets
      )

      await derivativeActionService.closeAllPosition({
        address,
        injectiveAddress,
        triggerPrice: '0', // TODO
        positions: formattedPositions,
        feeRecipient: guild.masterAddress,
        subaccountId: subaccount.subaccountId
      })
    }
  }
)
