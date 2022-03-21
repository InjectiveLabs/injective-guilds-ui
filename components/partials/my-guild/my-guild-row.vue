<template>
  <div>
    <TableRow>
      <div class="col-span-2 xl:col-span-12 grid grid-cols-2 lg:grid-cols-3">
        <div class="col-span-2 sm:col-span-1 flex lg:items-center">
          <img
            :src="logoLink"
            :alt="guild.name"
            class="h-20 w-20 rounded-full"
          />
          <div class="flex flex-col ml-4">
            <p
              class="text-white capitalize text-2.5xl font-bold tracking-tight"
            >
              {{ guild.name }}
            </p>
            <div class="flex items-center text-lg mt-4">
              <v-button accent outline @click="handleLeaveGuildBtnClick">
                <span>{{ $t('common.leave') }}</span>
              </v-button>
              <v-button text>{{ $t('common.viewDetails') }}</v-button>
            </div>
          </div>
        </div>
        <div class="col-span-2 sm:col-span-1 lg:col-span-2 grid lg:grid-cols-3">
          <div class="flex flex-col items-start sm:items-end mt-2 lg:mt-0">
            <span class="text-3.5xl">${{ holdingsToFormat }}</span>
            <span class="text-sm lg:mt-2.5">{{
              $t('myGuild.myHoldings')
            }}</span>
          </div>

          <div class="flex flex-col items-start sm:items-end mt-2 lg:mt-0">
            <span class="text-3.5xl">${{ earningsToFormat }}</span>
            <span class="text-sm lg:mt-2.5">{{
              $t('myGuild.myEarnings')
            }}</span>
          </div>

          <div class="flex flex-col items-start sm:items-end mt-2 lg:mt-0">
            <span class="text-3.5xl">${{ apyToString }}</span>
            <span class="text-sm lg:mt-2.5">
              {{ $t('myGuild.effectiveAPY') }}
            </span>
          </div>
        </div>
      </div>
    </TableRow>
    <div class="border-t border-primary-500 w-full" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import TableRow from '~/components/partials/grid-table/row.vue'
import { MyGuild } from '~/types'

export default Vue.extend({
  components: {
    TableRow
  },

  props: {
    guild: {
      type: Object as PropType<MyGuild>,
      required: true
    }
  },

  computed: {
    logoLink(): string {
      const { guild } = this

      return `/guilds/${guild.name.toLowerCase()}/sm.png`
    },

    holdingsToFormat(): string {
      const { guild } = this

      if (!guild.holdings) {
        return '0.00'
      }

      return guild.holdings.toFormat(2)
    },

    earningsToFormat(): string {
      const { guild } = this

      if (!guild.earnings) {
        return '0.00'
      }

      return guild.earnings.toFormat(2)
    },

    apyToString(): string {
      const { guild } = this

      if (!guild.apy) {
        return '0.00'
      }

      return `${guild.apy}%`
    }
  },

  methods: {
    handleLeaveGuildBtnClick() {
      const { guild } = this

      this.$emit('leave', guild)
    }
  }
})
</script>
