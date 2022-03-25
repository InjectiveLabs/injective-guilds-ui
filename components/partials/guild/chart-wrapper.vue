<template>
  <div>
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-bold uppercase tracking-widest mt-1">
          {{ $t('guild.portfolioValue') }}
        </p>
        <p class="text-3.5xl my-2 font-bold tracking-widest">
          ${{ portfolioValueToFormat }}
        </p>
        <p v-if="portfolios.length > 0" class="text-xs">
          {{ latestSnapShotDateToFormat }}
        </p>
      </div>
      <div>
        <v-date-filter-item
          v-for="(item, index) in intervals"
          :key="`date-filter-item-${index}`"
          :active="item === interval"
          :item="item"
          @click="handleDateFilterUpdate"
        />
      </div>
    </div>

    <v-chart
      :series="portfoliosChartData"
      v-bind="{ xMin: minDate, xMax: latestSnapShotDate }"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { format, subDays, subMonths } from 'date-fns'
import { BigNumberInBase } from '@injectivelabs/utils'
import VChart from '~/components/partials/guild/chart.vue'
import VDateFilterItem from '~/components/partials/guild/date-filter-item.vue'
import { ChartInterval, UiPortfolio, UIGuildChartData } from '~/types'
import { UI_DEFAULT_FIAT_DECIMALS } from '~/app/utils/constants'

export default Vue.extend({
  components: {
    VChart,
    VDateFilterItem
  },

  props: {
    portfolioValue: {
      type: Object as PropType<BigNumberInBase>,
      required: true
    }
  },

  data() {
    return {
      intervals: Object.values(ChartInterval),
      interval: ChartInterval.All
    }
  },

  computed: {
    portfolios(): UiPortfolio[] {
      return this.$accessor.guild.portfolios
    },

    portfoliosChartData(): UIGuildChartData[] {
      const { portfolios } = this

      const data = portfolios.map(({ updatedAt, portfolioValue }) => {
        return [
          updatedAt,
          Number(portfolioValue.toFormat(UI_DEFAULT_FIAT_DECIMALS))
        ]
      })

      return [
        {
          name: 'Portfolio value',
          type: 'area',
          data
        }
      ]
    },

    portfolioValueToFormat(): string {
      const { portfolioValue } = this

      return portfolioValue.toFormat(UI_DEFAULT_FIAT_DECIMALS)
    },

    firstSnapShotDate(): Date {
      const { portfolios } = this

      if (portfolios.length === 0) {
        return new Date()
      }

      return new Date(portfolios[portfolios.length - 1].updatedAt)
    },

    latestSnapShotDate(): Date {
      const { portfolios } = this

      if (portfolios.length === 0) {
        return new Date()
      }

      return new Date(portfolios[0].updatedAt)
    },

    latestSnapShotDateToFormat(): string {
      const { latestSnapShotDate } = this

      if (!latestSnapShotDate) {
        return ''
      }

      return format(latestSnapShotDate, "MMM-dd-yyyy HH:mm:ss 'UTC'xxx")
    },

    minDate(): Date {
      const {
        interval,
        firstSnapShotDate: minDate,
        latestSnapShotDate: maxDate
      } = this

      switch (interval) {
        case ChartInterval.Day:
          return subDays(maxDate, 1)
        case ChartInterval.Week:
          return subDays(maxDate, 7)
        case ChartInterval.Month:
          return subMonths(maxDate, 1)
        case ChartInterval.All:
          return minDate
        default:
          return subDays(maxDate, 7)
      }
    }
  },

  methods: {
    handleDateFilterUpdate(interval: ChartInterval) {
      this.interval = interval
    }
  }
})
</script>
