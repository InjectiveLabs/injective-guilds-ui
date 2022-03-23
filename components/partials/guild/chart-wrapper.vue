<template>
  <div>
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-bold uppercase tracking-widest mt-1">
          {{ $t('guild.portfolioValue') }}
        </p>
        <p class="text-3.5xl my-2 font-bold tracking-widest">$1,388,783</p>
        <p class="text-xs">Jan 20, 2022</p>
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
      :series="portfolioChartData"
      v-bind="{ xMin: minDate, xMax: maxDate }"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { subDays, subMonths } from 'date-fns'
import VChart from '~/components/partials/guild/chart.vue'
import VDateFilterItem from '~/components/partials/guild/date-filter-item.vue'
import { portfolioChartData } from '~/app/data/mock'
import { ChartInterval } from '~/types'

export default Vue.extend({
  components: {
    VChart,
    VDateFilterItem
  },

  data() {
    return {
      portfolioChartData,
      intervals: Object.values(ChartInterval),
      interval: ChartInterval.All
    }
  },

  computed: {
    maxDate(): Date {
      // todo, remove hardcoded value after syncing with API

      return new Date(1645866383702)
    },

    minDate(): Date {
      const { interval, maxDate } = this

      // todo, remove hardcoded value after syncing with API
      const minDate = new Date(1640151572879)

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
