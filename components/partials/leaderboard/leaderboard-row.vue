<template>
  <div>
    <TableRow dense>
      <div class="col-span-2 lg:col-span-4 flex items-center justify-start">
        <img
          :src="guildAsset.thumbnail"
          :alt="guild.name"
          class="h-8 w-8 sm:h-20 sm:w-20 rounded-full"
        />
        <div class="flex flex-col ml-4 lg:text-left text-right">
          <nuxt-link
            :to="{ name: 'guild-guild', params: { guild: guild.id } }"
            class="hover:text-primary-500 flex text-white capitalize text-lg sm:text-2.5xl font-bold tracking-tight"
          >
            {{ guild.name }}
          </nuxt-link>
        </div>
      </div>

      <span class="text-lg sm:text-2xl lg:hidden uppercase">
        {{ $t('leaderboard.value') }}
      </span>
      <div class="lg:col-span-3 flex justify-end items-center">
        <span class="text-lg sm:text-3.5xl">${{ totalAssetsToFormat }}</span>
      </div>

      <span class="text-lg sm:text-2xl lg:hidden uppercase">
        {{ $t('leaderboard.member') }}
      </span>
      <div class="lg:col-span-3 flex justify-end items-center">
        <span class="text-lg sm:text-3.5xl">
          {{ guild.memberCount }} / {{ guild.capacity }}
        </span>
      </div>

      <span class="text-lg sm:text-2xl lg:hidden uppercase">
        {{ $t('leaderboard.returns') }}
      </span>
      <div class="lg:col-span-2 flex justify-end items-center">
        <span class="text-lg sm:text-3.5xl">{{
          historicalReturnsToString
        }}</span>
      </div>
    </TableRow>
    <div class="border-t border-primary-500 w-full" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ZERO_IN_BASE } from '@injectivelabs/ui-common'
import { BigNumberInBase } from '@injectivelabs/utils'
import TableRow from '~/components/partials/grid-table/row.vue'
import { UiGuildWithReturns } from '~/types'
import { UI_DEFAULT_PERCENTAGE_DECIMALS } from '~/app/utils/constants'
import { guildImageMappings, GuildAsset } from '~/app/data/guild'

export default Vue.extend({
  components: {
    TableRow
  },

  props: {
    guild: {
      type: Object as PropType<UiGuildWithReturns>,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },

  computed: {
    guildAsset(): GuildAsset {
      const { guild } = this

      return (
        guildImageMappings[guild.name.toLowerCase()] ||
        guildImageMappings.default
      )
    },

    totalAssetsToFormat(): string {
      const { guild } = this

      if (!guild.portfolio) {
        return '0.00'
      }

      return guild.portfolio.portfolioValue.toFormat(2)
    },

    historicalReturns(): BigNumberInBase {
      const { guild } = this

      if (!guild || !guild.returns || !guild.returns.isFinite()) {
        return ZERO_IN_BASE
      }

      return guild.returns
    },

    historicalReturnsToString(): string {
      const { historicalReturns } = this

      return `${historicalReturns.toFormat(UI_DEFAULT_PERCENTAGE_DECIMALS)}%`
    }
  }
})
</script>
