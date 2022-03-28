<template>
  <div>
    <TableRow dense>
      <span class="text-lg sm:text-3.5xl lg:hidden">
        {{ $t('leaderboard.guild') }}
      </span>
      <div class="lg:col-span-5 flex items-center justify-end lg:justify-start">
        <img
          :src="logoLink"
          :alt="guild.name"
          class="h-8 w-8 sm:h-20 sm:w-20 rounded-full"
        />
        <div class="flex flex-col ml-4">
          <a
            href="/guild"
            target="_blank"
            class="hover:text-primary-500 flex text-white capitalize text-lg sm:text-2.5xl font-bold tracking-tight"
          >
            {{ guild.name }}
          </a>
        </div>
      </div>

      <span class="text-lg sm:text-3.5xl lg:hidden">
        {{ $t('leaderboard.totalAssets') }}
      </span>
      <div class="lg:col-span-3 text-right">
        <span class="text-lg sm:text-3.5xl">${{ totalAssetsToFormat }}</span>
      </div>

      <span class="text-lg sm:text-3.5xl lg:hidden">
        {{ $t('leaderboard.apy') }}
      </span>
      <div class="lg:col-span-2 text-right">
        <span class="text-lg sm:text-3.5xl">${{ apyToString }}</span>
      </div>

      <span class="text-lg sm:text-3.5xl lg:hidden">
        {{ $t('leaderboard.member') }}
      </span>
      <div class="lg:col-span-2 text-right">
        <span class="text-lg sm:text-3.5xl">${{ membersToFormat }}</span>
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
