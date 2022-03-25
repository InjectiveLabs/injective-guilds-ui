<template>
  <div>
    <h3 class="tracking-tight font-bold text-2xl text-white">
      {{ $t('guild.portfolio.title') }}
    </h3>

    <div class="mt-4">
      <TableHeader class="text-sm font-bold p-4" dense>
        <div class="col-span-4">
          <span>{{ $t('guild.portfolio.asset') }}</span>
        </div>
        <div class="col-span-4">
          <div class="flex items-center justify-end">
            <span>{{ $t('guild.portfolio.unrealizedPNL') }}</span>
            <v-icon-info-tooltip
              class="ml-2"
              :tooltip="$t('guild.portfolio.unrealizedPNLTooltip')"
            />
          </div>
        </div>
        <div class="col-span-2 text-right">
          <span>{{ $t('guild.portfolio.value') }}</span>
        </div>
        <div class="col-span-2 text-right">
          <span>{{ $t('guild.portfolio.allocation') }}</span>
        </div>
      </TableHeader>

      <TableBody
        class="border border-primary-500 lg:border-none max-h-guildTable"
      >
        <TableRow
          v-for="(item, index) in balances"
          :key="`asset-row-${index}`"
          :item="item"
          :class="{
            'border-t border-primary-500 border-opacity-30': index !== 0
          }"
          v-bind="$attrs"
        />
      </TableBody>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TableHeader from '~/components/partials/grid-table/header.vue'
import TableBody from '~/components/partials/grid-table/body.vue'
import TableRow from '~/components/partials/guild/portfolio/portfolio-row.vue'
import { portfolioAssets as mockAssets } from '~/app/data/mock'
import { UiGuild, UiPortfolioBalanceWithToken } from '~/types'

export default Vue.extend({
  components: {
    TableHeader,
    TableBody,
    TableRow
  },

  data() {
    return {
      assets: mockAssets
    }
  },

  computed: {
    guild(): UiGuild | undefined {
      return this.$accessor.guild.guild
    },

    balances(): UiPortfolioBalanceWithToken[] {
      const { guild } = this

      if (!guild || !guild.portfolio || !guild.portfolio.balances) {
        return []
      }

      return guild.portfolio.balances
    }
  }
})
</script>
