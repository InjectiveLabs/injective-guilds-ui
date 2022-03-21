<template>
  <div class="container pt-16">
    <div class="grid grid-cols-1 md:grid-cols-5 gap-5">
      <div class="md:col-span-2">
        <v-card square>
          <v-guild-master />
        </v-card>

        <v-card class="mt-2">
          <div class="flex items-start justify-between">
            <span class="text-sm font-bold uppercase tracking-widest mt-1">
              {{ $t('guild.members') }}
            </span>
            <span class="text-3.5xl font-bold">1352</span>
          </div>
        </v-card>

        <v-card class="mt-2">
          <div class="flex items-start justify-between">
            <span class="text-sm font-bold uppercase tracking-widest mt-1">
              {{ $t('guild.historicalReturns') }}
            </span>
            <span class="text-3.5xl font-bold">15%</span>
          </div>
        </v-card>
      </div>
      <div class="row-start-1 md:row-start-auto md:col-span-3">
        <v-card square>
          <v-chart />
        </v-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { formatWalletAddress } from '@injectivelabs/utils'
import {
  getExplorerUrl,
  getAddressFromInjectiveAddress
} from '@injectivelabs/ui-common'
import VChart from '~/components/partials/guild/chart-wrapper.vue'
import VGuildMaster from '~/components/partials/guild/guild-master.vue'
import { guildMaster as mockGuildMaster } from '~/app/data/mock'
import { NETWORK } from '~/app/utils/constants'

export default Vue.extend({
  components: {
    VGuildMaster,
    VChart
  },

  data() {
    return {
      guildMaster: mockGuildMaster
    }
  },

  computed: {
    guildMasterExplorerUrl(): string {
      const { guildMaster } = this

      return `${getExplorerUrl(NETWORK)}/account/${guildMaster.address}`
    },

    // ethereumAddress(): string {
    //   getAddressFromInjectiveAddress
    // }

    formattedGuildMasterAddress(): string {
      const { guildMaster } = this

      if (!guildMaster.address) {
        return ''
      }

      return formatWalletAddress(guildMaster.address)
    }
  }
})
</script>
