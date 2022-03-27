<template>
  <TableRow dense class="text-lg text-white tracking-wide">
    <span class="lg:hidden">
      {{ $t('guild.member.address') }}
    </span>
    <div class="lg:col-span-7 text-right lg:text-left">
      <a :href="explorerUrl" target="_blank" class="hover:text-primary-500">
        <div class="flex items-center">
          <span class="break-all">{{ item.address }}</span>
          <v-icon-arrow class="hidden lg:block min-w-3 h-3 w-3 ml-2" />
        </div>
      </a>
    </div>

    <span class="lg:hidden">
      {{ $t('guild.member.since') }}
    </span>
    <div class="lg:col-span-3 text-right">
      <span v-if="!dateToFormat">&mdash;</span>
      <span v-else class="text-white text-opacity-50">{{ dateToFormat }}</span>
    </div>

    <span class="lg:hidden">
      {{ $t('guild.member.percentage') }}
    </span>
    <div class="lg:col-span-2 text-right">
      <span>{{ allocationToFormat }}%</span>
    </div>
  </TableRow>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { format } from 'date-fns'
import { getExplorerUrl, ZERO_IN_BASE } from '@injectivelabs/ui-common'
import { BigNumberInBase } from '@injectivelabs/utils'
import { UiGuildMemberWithPortfolio } from '~/types'
import { NETWORK, UI_DEFAULT_PERCENTAGE_DECIMALS } from '~/app/utils/constants'
import TableRow from '~/components/partials/grid-table/row.vue'

export default Vue.extend({
  components: {
    TableRow
  },

  props: {
    item: {
      type: Object as PropType<UiGuildMemberWithPortfolio>,
      required: true
    },

    portfolioValue: {
      type: Object as PropType<BigNumberInBase>,
      required: true
    }
  },

  computed: {
    allocation(): BigNumberInBase {
      const { portfolioValue, item } = this

      if (
        !portfolioValue ||
        !item ||
        !item.portfolio ||
        !item.portfolio.portfolioValue
      ) {
        return ZERO_IN_BASE
      }

      return item.portfolio.portfolioValue
        .dividedBy(portfolioValue)
        .multipliedBy(100)
    },

    allocationToFormat(): string {
      const { allocation } = this

      return allocation.toFormat(UI_DEFAULT_PERCENTAGE_DECIMALS)
    },

    explorerUrl(): string {
      const { item } = this

      return `${getExplorerUrl(NETWORK)}/account/${item.address}`
    },

    dateToFormat(): string | undefined {
      const { item } = this

      if (!item.since) {
        return undefined
      }

      return format(item.since, 'MMM-dd-yyyy')
    }
  }
})
</script>
