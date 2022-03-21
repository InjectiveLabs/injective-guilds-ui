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

    <section class="pt-16 container">
      <div class="border-t border-primary-500 w-full" />
      <TableBody>
        <TableRow
          v-for="(guild, index) in myGuilds"
          :key="`my-guild-${index}`"
          :guild="guild"
          @leave="handleLeaveGuildBtnClick"
        >
        </TableRow>
      </TableBody>
    </section>
    <v-modal-leave-guild v-if="selectedGuild" :guild="selectedGuild" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BigNumberInBase } from '@injectivelabs/utils'
import VBanner from '~/layouts/child-page-banner.vue'
import TableBody from '~/components/partials/grid-table/body.vue'
import TableRow from '~/components/partials/my-guild/my-guild-row.vue'
import VModalLeaveGuild from '~/components/partials/modal/leave-guild-modal.vue'
import { Modal, MyGuild } from '~/types'

export default Vue.extend({
  components: {
    TableBody,
    TableRow,
    VBanner,
    VModalLeaveGuild
  },

  data() {
    return {
      selectedGuild: undefined as MyGuild | undefined,
      myGuilds: [
        {
          name: 'schneider',
          holdings: new BigNumberInBase('1388783'),
          earnings: new BigNumberInBase('400'),
          apy: 5.06
        },
        {
          name: 'schneider',
          holdings: new BigNumberInBase('1388783'),
          earnings: new BigNumberInBase('400'),
          apy: 5.06
        }
      ] as MyGuild[]
    }
  },

  methods: {
    handleLeaveGuildBtnClick(guild: MyGuild) {
      this.selectedGuild = guild
      this.$nextTick(() => {
        this.$accessor.modal.openModal(Modal.LeaveGuild)
      })
    }
  }
})
</script>
