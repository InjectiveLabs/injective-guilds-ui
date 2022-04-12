<template>
  <div>
    <div class="flex items-start justify-between">
      <div
        class="flex items-center mt-1"
        :class="{ 'cursor-pointer': historicalMonthlyPortfolios.length > 0 }"
        @click="toggleHistoricalReturnsList"
      >
        <span class="text-sm font-bold uppercase tracking-widest">
          <slot />
        </span>
        <v-icon-chevron
          v-if="historicalMonthlyPortfolios.length > 0"
          class="w-3 h-3 ml-2 transition transform"
          :class="{ 'rotate-180': isExpanded }"
        />
      </div>
      <span class="text-3.5xl font-bold">{{ historicalReturnsToFormat }}%</span>
    </div>
    <transition v-if="historicalMonthlyPortfolios.length > 0" name="fade-up">
      <div
        v-show="isExpanded"
        class="grid grid-cols-3 gap-3 xs:grid-cols-4 mt-4 lg:gap-1"
      >
        <v-historical-returns-item
          v-for="(monthlyPortfolio, index) in historicalMonthlyPortfolios"
          :key="`historical-return-item-${index}`"
          :monthly-portfolio="monthlyPortfolio"
        />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { BigNumberInBase } from '@injectivelabs/utils'
import { ZERO_IN_BASE } from '@injectivelabs/ui-common'
import { UiMonthlyPortfolio } from '~/types'
import { UI_DEFAULT_PERCENTAGE_DECIMALS } from '~/app/utils/constants'
import VHistoricalReturnsItem from '~/components/partials/guild/historical-returns-item.vue'

export default Vue.extend({
  components: {
    VHistoricalReturnsItem
  },

  props: {
    monthlyPortfolios: {
      type: Array as PropType<UiMonthlyPortfolio[]>,
      required: true
    }
  },

  data() {
    return {
      isExpanded: false
    }
  },

  computed: {
    historicalMonthlyPortfolios(): UiMonthlyPortfolio[] {
      const { monthlyPortfolios } = this

      if (monthlyPortfolios.length <= 1) {
        return []
      }

      return monthlyPortfolios.slice(1)
    },

    historicalReturns(): BigNumberInBase {
      const { monthlyPortfolios } = this

      if (monthlyPortfolios.length === 0) {
        return ZERO_IN_BASE
      }

      const [lastSnapshot] = monthlyPortfolios

      if (!lastSnapshot.returns.isFinite()) {
        return ZERO_IN_BASE
      }

      return lastSnapshot.returns
    },

    historicalReturnsToFormat(): string {
      const { historicalReturns } = this

      return historicalReturns.toFormat(UI_DEFAULT_PERCENTAGE_DECIMALS)
    }
  },

  methods: {
    toggleHistoricalReturnsList() {
      this.isExpanded = !this.isExpanded
    }
  }
})
</script>
