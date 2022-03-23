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

    <v-portfolio class="mt-16" />
    <v-member class="mt-10" />
    <v-trade class="mt-10" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VChart from '~/components/partials/guild/chart-wrapper.vue'
import VGuildMaster from '~/components/partials/guild/guild-master.vue'
import VPortfolio from '~/components/partials/guild/portfolio/index.vue'
import VMember from '~/components/partials/guild/member/index.vue'
import VTrade from '~/components/partials/guild/trade/index.vue'

export default Vue.extend({
  components: {
    VChart,
    VGuildMaster,
    VMember,
    VPortfolio,
    VTrade
  },

  data() {
    return {}
  }
})
</script>
