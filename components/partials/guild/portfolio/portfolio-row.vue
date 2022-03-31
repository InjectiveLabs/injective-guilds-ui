<template>
  <TableRow dense class="text-lg text-white tracking-wide">
    <span class="lg:hidden">
      {{ $t('guild.portfolio.asset') }}
    </span>
    <div class="lg:col-span-4">
      <div class="flex items-center justify-end lg:justify-start">
        <div v-if="item.token.logo" class="w-6 h-6">
          <img
            :src="item.token.logo"
            :alt="item.token.name"
            class="min-w-full h-auto rounded-full"
          />
        </div>
        <div class="ml-3">
          <span class="text-gray-200 font-bold">
            {{ item.token.symbol }}
          </span>
        </div>
      </div>
    </div>

    <span class="lg:hidden">
      {{ $t('guild.portfolio.unrealizedPNL') }}
    </span>
    <div class="lg:col-span-4 text-right">
      <span v-if="item.unrealizedPnl.eq(0)">&mdash;</span>
      <span v-else>
        <span v-if="item.unrealizedPnl.gt(0)">+</span>
        <span>{{ pnlToFormat }}</span>
      </span>
    </div>

    <span class="lg:hidden">
      {{ $t('guild.portfolio.value') }}
    </span>
    <div class="lg:col-span-2 text-right">
      <span>${{ valueToFormat }}</span>
    </div>

    <span class="lg:hidden">
      {{ $t('guild.portfolio.allocation') }}
    </span>
    <div class="lg:col-span-2 text-right">
      <span>{{ allocationToFormat }}%</span>
    </div>
  </TableRow>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { BigNumberInBase } from '@injectivelabs/utils'
import { BIG_NUMBER_ROUND_DOWN_MODE } from '@injectivelabs/ui-common'
import { UiPortfolioBalanceWithToken } from '~/types'
import TableRow from '~/components/partials/grid-table/row.vue'
import {
  UI_DEFAULT_PERCENTAGE_DECIMALS,
  UI_DEFAULT_ASSET_DECIMALS,
  UI_DEFAULT_FIAT_DECIMALS
} from '~/app/utils/constants'

export default Vue.extend({
  components: {
    TableRow
  },

  props: {
    item: {
      type: Object as PropType<UiPortfolioBalanceWithToken>,
      required: true
    },

    portfolioValue: {
      type: Object as PropType<BigNumberInBase>,
      required: true
    }
  },

  computed: {
    pnlToFormat(): String {
      const { item } = this

      return item.unrealizedPnl.toFormat(
        UI_DEFAULT_ASSET_DECIMALS,
        BigNumberInBase.ROUND_DOWN
      )
    },

    valueToFormat(): string {
      const { item } = this

      return item.totalValueInUsd.toFormat(
        UI_DEFAULT_FIAT_DECIMALS,
        BigNumberInBase.ROUND_DOWN
      )
    },

    allocation(): BigNumberInBase {
      const { item, portfolioValue } = this

      return item.totalValueInUsd.dividedBy(portfolioValue).multipliedBy(100)
    },

    allocationToFormat(): string {
      const { allocation } = this

      if (allocation.isNaN()) {
        return '0.00'
      }

      if (allocation.lt('0.01')) {
        return '< 0.01'
      }

      return allocation.toFormat(
        UI_DEFAULT_PERCENTAGE_DECIMALS,
        BIG_NUMBER_ROUND_DOWN_MODE
      )
    }
  }
})
</script>
