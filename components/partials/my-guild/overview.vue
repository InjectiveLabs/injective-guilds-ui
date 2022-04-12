<template>
  <v-card transparent>
    <div>
      <div class="flex items-start justify-between">
        <span class="text-sm font-bold uppercase tracking-widest mt-1">
          {{ $t('myGuild.myHoldings') }}
        </span>
        <span class="text-3.5xl font-bold">
          ${{ portfolioBalanceInUsdToString }}
        </span>
      </div>

      <div class="flex items-center justify-between mt-3 text-sm tracking-wide">
        <span>
          {{ $t('myGuild.balance') }}
        </span>
        <span class="text-white">${{ totalBalanceInUsdToString }}</span>
      </div>

      <div class="flex items-center justify-between mt-3 text-sm tracking-wide">
        <span>
          {{ $t('myGuild.unrealisedPnL') }}
        </span>
        <span class="text-white">${{ totalUnrealizedPnlInUsdToFormat }}</span>
      </div>

      <div class="flex items-center justify-between mt-3 text-sm tracking-wide">
        <span>
          {{ $t('myGuild.openPositionMargin') }}
        </span>
        <span class="text-white">${{ totalMarginHoldInUsdToFormat }}</span>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ZERO_IN_BASE } from '@injectivelabs/ui-common'
import { BigNumberInBase } from '@injectivelabs/utils'
import { UI_DEFAULT_FIAT_DECIMALS } from '~/app/utils/constants'
import { UiMonthlyPortfolio } from '~/types'

export default Vue.extend({
  props: {
    portfolio: {
      type: Object as PropType<UiMonthlyPortfolio>,
      required: true
    }
  },

  computed: {
    portfolioBalanceInUsdToString(): string {
      const { portfolio } = this

      if (!portfolio || !portfolio.portfolioValue) {
        return '0.00'
      }

      return portfolio.portfolioValue.toFormat(UI_DEFAULT_FIAT_DECIMALS)
    },

    totalBalanceInUsd(): BigNumberInBase {
      const { portfolio } = this

      if (!portfolio || !portfolio.balances) {
        return ZERO_IN_BASE
      }

      return portfolio.balances.reduce((total, balance) => {
        const assetBalanceInUsd = balance.totalBalance.times(balance.priceUsd)

        return total.plus(assetBalanceInUsd)
      }, ZERO_IN_BASE)
    },

    totalBalanceInUsdToString(): string {
      const { totalBalanceInUsd } = this

      return totalBalanceInUsd.toFormat(UI_DEFAULT_FIAT_DECIMALS)
    },

    totalUnrealizedPnlInUsd(): BigNumberInBase {
      const { portfolio } = this

      if (!portfolio || !portfolio.balances) {
        return ZERO_IN_BASE
      }

      return portfolio.balances.reduce((total, balance) => {
        const pnlInUsd = balance.unrealizedPnl.times(balance.priceUsd)

        return total.plus(pnlInUsd)
      }, ZERO_IN_BASE)
    },

    totalUnrealizedPnlInUsdToFormat(): string {
      const { totalUnrealizedPnlInUsd } = this

      return totalUnrealizedPnlInUsd.toFormat(UI_DEFAULT_FIAT_DECIMALS)
    },

    totalMarginHoldInUsd(): BigNumberInBase {
      const { portfolio } = this

      if (!portfolio || !portfolio.balances) {
        return ZERO_IN_BASE
      }

      return portfolio.balances.reduce((total, balance) => {
        const marginHoldInUsd = balance.marginHold.times(balance.priceUsd)

        return total.plus(marginHoldInUsd)
      }, ZERO_IN_BASE)
    },

    totalMarginHoldInUsdToFormat(): string {
      const { totalMarginHoldInUsd } = this

      return totalMarginHoldInUsd.toFormat(UI_DEFAULT_FIAT_DECIMALS)
    }
  }
})
</script>
