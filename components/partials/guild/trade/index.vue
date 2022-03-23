<template>
  <div>
    <h3 class="tracking-tight font-bold text-2xl text-white">
      {{ $t('guild.trade.title') }}
    </h3>

    <div class="mt-4">
      <TableHeader class="text-sm font-bold p-4" dense>
        <div class="col-span-4">
          <span>{{ $t('guild.trade.market') }}</span>
        </div>
        <div class="col-span-7 text-right grid grid-cols-5 gap-4">
          <span>{{ $t('guild.trade.side') }}</span>
          <span>{{ $t('guild.trade.amount') }}</span>
          <span>{{ $t('guild.trade.price') }}</span>
          <span class="col-span-2">{{ $t('guild.trade.date') }}</span>
        </div>
        <div class="text-right" />
      </TableHeader>

      <TableBody
        class="border border-primary-500 lg:border-none max-h-guildTable"
      >
        <TableRow
          v-for="(item, index) in trades"
          :key="`trade-row-${index}`"
          :item="item"
          :class="{
            'border-t border-primary-500 border-opacity-30': index !== 0
          }"
        />
      </TableBody>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TableHeader from '~/components/partials/grid-table/header.vue'
import TableBody from '~/components/partials/grid-table/body.vue'
import TableRow from '~/components/partials/guild/trade/trade-row.vue'
import { portfolioTrades as mockTrades } from '~/app/data/mock'

export default Vue.extend({
  components: {
    TableHeader,
    TableBody,
    TableRow
  },

  data() {
    return {
      trades: mockTrades
    }
  }
})
</script>
