<template>
  <div>
    <TableRow>
      <div class="col-span-2 xl:col-span-12 grid grid-cols-2 lg:grid-cols-3">
        <div class="col-span-2 sm:col-span-1 flex">
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
          </div>
        </div>
        <div class="col-span-2 sm:col-span-1 lg:col-span-2 grid lg:grid-cols-3">
          <div class="flex flex-col items-start sm:items-end mt-2 lg:mt-0">
            <span class="text-3.5xl">${{ totalAssetsToFormat }}</span>
            <span class="text-sm xl:hidden">{{
              $t('leaderboard.totalAssets')
            }}</span>
          </div>

          <div class="flex flex-col items-start sm:items-end mt-2 lg:mt-0">
            <span class="text-3.5xl">{{ apyToString }}</span>
            <span class="text-sm xl:hidden">
              {{ $t('leaderboard.apy') }}
            </span>
          </div>
          <div class="flex flex-col items-start sm:items-end mt-2 lg:mt-0">
            <span class="text-3.5xl">{{ membersToFormat }}</span>
            <span class="text-sm xl:hidden">{{
              $t('leaderboard.member')
            }}</span>
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
import { UIGuildCard } from '~/types'

export default Vue.extend({
  components: {
    TableRow
  },

  props: {
    guild: {
      type: Object as PropType<UIGuildCard>,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },

  computed: {
    logoLink(): string {
      const { guild } = this

      return '/guilds/schneider/sm.png'
    },

    totalAssetsToFormat(): string {
      const { guild } = this

      if (!guild.totalAssetsAmount) {
        return '0.00'
      }

      return guild.totalAssetsAmount.toFormat(2)
    },

    membersToFormat(): string {
      const { guild } = this

      if (!guild.memberAmount) {
        return '0.00'
      }

      return guild.memberAmount.toFormat()
    },

    apyToString(): string {
      const { guild } = this

      if (!guild.apy) {
        return '0.00'
      }

      return `${guild.apy}%`
    }
  }
})
</script>
