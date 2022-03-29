import {
  BigNumberInBase,
  BigNumberInWei,
  derivativePriceToChainPrice,
  derivativeQuantityToChainQuantityToFixed
} from '@injectivelabs/utils'
import {
  UiDerivativeMarketWithToken,
  UiPosition,
  DerivativeOrderSide
} from '@injectivelabs/ui-common'
import { TradeDirection } from '@injectivelabs/ts-types'

export const getRoundedLiquidationPrice = (
  position: UiPosition,
  market: UiDerivativeMarketWithToken
) => {
  const minTickPrice = derivativePriceToChainPrice({
    value: new BigNumberInBase(1).shiftedBy(-market.priceDecimals),
    quoteDecimals: market.quoteToken.decimals
  })
  const liquidationPrice = new BigNumberInWei(position.liquidationPrice)
  const liquidationPriceRoundedToMinTickPrice = new BigNumberInBase(
    liquidationPrice.dividedBy(minTickPrice).toFixed(0)
  ).multipliedBy(minTickPrice)

  return liquidationPriceRoundedToMinTickPrice.lte(0)
    ? minTickPrice
    : liquidationPriceRoundedToMinTickPrice
}

export const mapPositionsForClosing = (
  positions: UiPosition[],
  markets: UiDerivativeMarketWithToken[]
) => {
  return positions
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
    .filter((p) => p !== undefined) as {
    orderType: DerivativeOrderSide
    marketId: string
    price: string
    quantity: string
  }[]
}
