<template>
  <TableRow dense class="text-lg text-white tracking-wide">
    <span class="lg:hidden">
      {{ $t('guild.trade.market') }}
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
          <span class="text-gray-200 font-bold uppercase">
            {{ item.market }}
          </span>
        </div>
        <div class="lg:hidden ml-3 text-primary-500">
          <v-icon-arrow-circle class="w-6 h-6" />
        </div>
      </div>
    </div>
    <div class="col-span-2 lg:col-span-7 grid grid-cols-2 lg:grid-cols-5 gap-4">
      <span class="lg:hidden">{{ $t('guild.trade.side') }}</span>
      <span
        class="capitalize text-right"
        :class="[
          [TradeDirection.Long, TradeDirection.Buy].includes(item.side)
            ? 'text-primary-500'
            : 'text-accent-500'
        ]"
      >
        {{ item.side }}
      </span>
      <span class="lg:hidden">{{ $t('guild.trade.amount') }}</span>
      <span class="text-right">{{ amountToFormat }}</span>
      <span class="lg:hidden">{{ $t('guild.trade.price') }}</span>
      <span class="text-right">{{ priceToFormat }}</span>
      <span class="lg:hidden">{{ $t('guild.trade.date') }}</span>
      <span class="lg:col-span-2 text-right">
        <span v-if="!dateToFormat">&mdash;</span>
        <span v-else class="text-white text-opacity-50">
          {{ dateToFormat }}
        </span>
      </span>
    </div>
    <div
      class="hidden lg:block col-span-1 text-right text-primary-500 ml-auto cursor-pointer"
    >
      <v-icon-arrow-circle class="w-6 h-6" />
    </div>
  </TableRow>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { format } from 'date-fns'
import { TradeDirection } from '@injectivelabs/ts-types'
import { ZERO_IN_BASE } from '@injectivelabs/ui-common'
import { BigNumberInBase } from '@injectivelabs/utils'
import { UITrade } from '~/types'
import TableRow from '~/components/partials/grid-table/row.vue'
import {
  UI_DEFAULT_ASSET_DECIMALS,
  UI_DEFAULT_FIAT_DECIMALS
} from '~/app/utils/constants'

export default Vue.extend({
  components: {
    TableRow
  },

  props: {
    item: {
      type: Object as PropType<UITrade>,
      required: true
    }
  },

  data() {
    return {
      TradeDirection
    }
  },

  computed: {
    amountToFormat(): string {
      const { item } = this

      if (!item.amount) {
        return ZERO_IN_BASE.toFormat(UI_DEFAULT_ASSET_DECIMALS)
      }

      return item.amount.toFormat(
        UI_DEFAULT_ASSET_DECIMALS,
        BigNumberInBase.ROUND_DOWN
      )
    },

    priceToFormat(): string {
      const { item } = this

      if (!item.price) {
        return ZERO_IN_BASE.toFormat(UI_DEFAULT_FIAT_DECIMALS)
      }

      return item.price.toFormat(
        UI_DEFAULT_FIAT_DECIMALS,
        BigNumberInBase.ROUND_DOWN
      )
    },

    dateToFormat(): string | undefined {
      const { item } = this

      if (!item.date) {
        return undefined
      }

      return format(item.date, 'MMM-dd-yyyy HH:mm:ss')
    }
  }
})
</script>
