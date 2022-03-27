import { actionTree } from 'typed-vuex'
import { UiDerivativeMarketWithToken } from '@injectivelabs/ui-common'
import { derivativeQuantityToChainQuantityToFixed } from '@injectivelabs/utils'
import { TradeDirection } from '@injectivelabs/ts-types'
import { DerivativeOrderSide } from '@injectivelabs/derivatives-consumer'
import { derivativeActionService, derivativeService } from '~/app/Services'
import { getRoundedLiquidationPrice } from '~/app/services/derivatives'

export const state = () => ({})

export type PositionStoreState = ReturnType<typeof state>

export const mutations = {}

export const actions = actionTree(
  { state, mutations },
  {
    async closeAllPosition(_) {
      const { subaccount } = this.app.$accessor.account
      const { markets } = this.app.$accessor.derivatives
      const { isUserWalletConnected } = this.app.$accessor.wallet

      if (!isUserWalletConnected || !subaccount) {
        return
      }

      // await this.app.$accessor.app.queue()
      await this.app.$accessor.wallet.validate()

      const positions = await derivativeService.fetchPositions({
        subaccountId: subaccount.subaccountId
      })

      const formattedPositions = positions
        .map((position) => {
          const market = markets.find(
            (m: UiDerivativeMarketWithToken) => m.marketId === position.marketId
          )

          if (!market) {
            return undefined
          }

          const orderType =
            position.direction === TradeDirection.Long
              ? DerivativeOrderSide.Sell
              : DerivativeOrderSide.Buy
          const liquidationPrice = getRoundedLiquidationPrice(position, market)

          return {
            orderType,
            marketId: market.marketId,
            price: liquidationPrice.toFixed(),
            quantity: derivativeQuantityToChainQuantityToFixed({
              value: position.quantity
            })
          } as {
            orderType: DerivativeOrderSide
            marketId: string
            price: string
            quantity: string
          }
        })
        .filter((p) => p !== undefined) as []

      console.log(formattedPositions)

      // await derivativeActionService.closeAllPosition({
      //   address,
      //   injectiveAddress,
      //   triggerPrice: '0', // TODO
      //   positions: formattedPositions,
      //   feeRecipient: FEE_RECIPIENT,
      //   subaccountId: subaccount.subaccountId
      // })
    }
  }
)