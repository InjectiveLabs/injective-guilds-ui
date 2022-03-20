<template>
  <div>
    <v-banner>
      <div class="grid grid-col-1 md:grid-cols-2 gap-4 w-full">
        <div class="text-white self-center mx-auto w-full">
          <p class="font-logo text-6xl md:text-9xl">
            {{ $t('myGuild.title') }}
          </p>
          <p class="text-lg mt-8 max-w-lg">
            {{ $t('myGuild.description') }}
          </p>
        </div>

        <div class="text-primary-500 mx-auto md:ml-auto w-full">
          <v-card>
            <div>
              <div class="flex items-start justify-between">
                <span class="text-sm font-bold uppercase tracking-widest">
                  {{ $t('myGuild.myHoldings') }}
                </span>
                <span class="text-3.5xl font-bold">$1000.00</span>
              </div>

              <div
                class="
                  flex
                  items-center
                  justify-between
                  mt-3
                  text-sm
                  tracking-wide
                "
              >
                <span>
                  {{ $t('myGuild.walletBalance') }}
                </span>
                <span class="text-white">$600.00</span>
              </div>

              <div
                class="
                  flex
                  items-center
                  justify-between
                  mt-3
                  text-sm
                  tracking-wide
                "
              >
                <span>
                  {{ $t('myGuild.tradingAccountBalance') }}
                </span>
                <span class="text-white">$600.00</span>
              </div>

              <div
                class="
                  flex
                  items-center
                  justify-between
                  mt-3
                  text-sm
                  tracking-wide
                "
              >
                <span>
                  {{ $t('myGuild.unrealisedPnL') }}
                </span>
                <span class="text-white">$600.00</span>
              </div>

              <div
                class="
                  flex
                  items-center
                  justify-between
                  mt-3
                  text-sm
                  tracking-wide
                "
              >
                <span>
                  {{ $t('myGuild.openPositionMargin') }}
                </span>
                <span class="text-white">$600.00</span>
              </div>
            </div>
          </v-card>

          <v-card class="mt-2">
            <div class="flex items-start justify-between">
              <span class="text-sm font-bold uppercase tracking-widest">
                {{ $t('myGuild.myEarnings') }}
              </span>
              <span class="text-3.5xl font-bold">$400.00</span>
            </div>
          </v-card>

          <v-card class="mt-2">
            <div class="flex items-start justify-between">
              <span class="text-sm font-bold uppercase tracking-widest">
                {{ $t('myGuild.historicalReturns') }}
              </span>
              <span class="text-3.5xl font-bold">5.06%</span>
            </div>
          </v-card>
        </div>
      </div>
    </v-banner>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VBanner from '~/layouts/child-page-banner.vue'

export default Vue.extend({
  components: {
    VBanner
  }
})
</script>
