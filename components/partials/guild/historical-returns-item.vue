<template>
  <div>
    <p class="uppercase tracking-widest text-sm font-bold">
      {{ dateToFormat }}
    </p>
    <p class="leading-6 text-lg tracking-wider text-white text-opacity-80 mt-3">
      {{ historicalReturnsToFormat }}%
    </p>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { format } from 'date-fns'
import { BigNumberInBase } from '@injectivelabs/utils'
import { ZERO_IN_BASE } from '@injectivelabs/ui-common'
import { UiMonthlyPortfolio } from '~/types'
import { UI_DEFAULT_PERCENTAGE_DECIMALS } from '~/app/utils/constants'

export default Vue.extend({
  props: {
    monthlyPortfolio: {
      type: Object as PropType<UiMonthlyPortfolio>,
      required: true
    }
  },

  computed: {
    dateToFormat(): string {
      const { monthlyPortfolio } = this

      if (!monthlyPortfolio || !monthlyPortfolio.date) {
        return ''
      }

      return format(monthlyPortfolio.date, 'MMM')
    },

    historicalReturns(): BigNumberInBase {
      const { monthlyPortfolio } = this

      if (
        !monthlyPortfolio ||
        !monthlyPortfolio.returns ||
        !monthlyPortfolio.returns.isFinite()
      ) {
        return ZERO_IN_BASE
      }

      return monthlyPortfolio.returns
    },

    historicalReturnsToFormat(): string {
      const { historicalReturns } = this

      return historicalReturns.toFormat(UI_DEFAULT_PERCENTAGE_DECIMALS)
    }
  }
})
</script>
