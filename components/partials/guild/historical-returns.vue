<template>
  <v-card v-if="guild">
    <div class="flex items-start justify-between">
      <span class="text-sm font-bold uppercase tracking-widest mt-1">
        {{ $t('guild.historicalReturns') }}
      </span>
      <span class="text-3.5xl font-bold">{{ historicalReturnsToFormat }}%</span>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { BigNumberInBase } from '@injectivelabs/utils'
import { ZERO_IN_BASE } from '@injectivelabs/ui-common'
import { UiGuildWithMeta } from '~/types'
import { UI_DEFAULT_PERCENTAGE_DECIMALS } from '~/app/utils/constants'

export default Vue.extend({
  computed: {
    guild(): UiGuildWithMeta | undefined {
      return this.$accessor.guild.guild
    },

    historicalReturns(): BigNumberInBase {
      const { guild } = this

      if (
        !guild ||
        !guild.historicalReturns ||
        !guild.historicalReturns.isFinite()
      ) {
        return ZERO_IN_BASE
      }

      return guild.historicalReturns
    },

    historicalReturnsToFormat(): string {
      const { historicalReturns } = this

      return historicalReturns.toFormat(UI_DEFAULT_PERCENTAGE_DECIMALS)
    }
  }
})
</script>
