re<template>
  <div class="flex justify-between items-center text-sm">
    <span>{{ availableBalanceToFormat }} {{ balance.token.symbol }}</span>
    <span class="text-primary-500 text-opacity-50">
      ${{ availableBalanceInUsdToFormat }}
    </span>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { AssetTokenWithAvailableBalanceInUsd } from '~/types'
import {
  UI_DEFAULT_ASSET_DECIMALS,
  UI_DEFAULT_FIAT_DECIMALS
} from '~/app/utils/constants'

export default Vue.extend({
  props: {
    balance: {
      type: Object as PropType<AssetTokenWithAvailableBalanceInUsd>,
      required: true
    }
  },

  computed: {
    availableBalanceToFormat(): string {
      const { balance } = this

      if (!balance.availableTokenBalanceInBase) {
        return '0.00'
      }

      return balance.availableTokenBalanceInBase.toFormat(
        UI_DEFAULT_ASSET_DECIMALS
      )
    },

    availableBalanceInUsdToFormat(): string {
      const { balance } = this

      if (!balance.availableBalanceInUsd) {
        return '0.00'
      }

      return balance.availableBalanceInUsd.toFormat(UI_DEFAULT_FIAT_DECIMALS)
    }
  }
})
</script>
