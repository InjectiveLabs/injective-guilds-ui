<template>
  <div>
    <TableRow>
      <div class="col-span-2 xl:col-span-12 grid grid-cols-2 lg:grid-cols-3">
        <div class="col-span-2 sm:col-span-1 flex lg:items-center">
          <img
            :src="guildAsset.thumbnail"
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
              <v-button accent outline @click="handleLeaveGuildClick">
                <span>{{ $t('common.leave') }}</span>
              </v-button>
              <nuxt-link
                :to="{ name: 'guild-guild', params: { guild: guild.id } }"
              >
                <v-button text>{{ $t('common.viewDetails') }}</v-button>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="col-span-2 sm:col-span-1 lg:col-span-2 grid lg:grid-cols-3">
          <div class="flex flex-col items-start sm:items-end mt-2 lg:mt-0">
            <span class="text-3.5xl">${{ portFolioValueToFormat }}</span>
            <span class="text-sm lg:mt-2.5">
              {{ $t('myGuild.value') }}
            </span>
          </div>

          <div class="flex flex-col items-start sm:items-end mt-2 lg:mt-0">
            <span class="text-3.5xl">{{ historicalReturnsToFormat }}%</span>
            <span class="text-sm lg:mt-2.5">
              {{ $t('myGuild.returns') }}
            </span>
          </div>

          <div class="flex flex-col items-start sm:items-end mt-2 lg:mt-0">
            <span class="text-3.5xl">
              {{ guild.memberCount }} / {{ guild.capacity }}
            </span>
            <span class="text-sm lg:mt-2.5">
              {{ $t('myGuild.members') }}
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
import { ZERO_IN_BASE } from '@injectivelabs/ui-common'
import { BigNumberInBase } from '@injectivelabs/utils'
import TableRow from '~/components/partials/grid-table/row.vue'
import { Modal, UiGuildWithMeta } from '~/types'
import {
  UI_DEFAULT_FIAT_DECIMALS,
  UI_DEFAULT_PERCENTAGE_DECIMALS
} from '~/app/utils/constants'
import { GuildAsset, guildImageMappings } from '~/app/data/guild'

export default Vue.extend({
  components: {
    TableRow
  },

  props: {
    guild: {
      type: Object as PropType<UiGuildWithMeta>,
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

    portfolioValue(): BigNumberInBase {
      const { guild } = this

      if (!guild || !guild.portfolio || !guild.portfolio.portfolioValue) {
        return ZERO_IN_BASE
      }

      return guild.portfolio.portfolioValue
    },

    portFolioValueToFormat(): string {
      const { portfolioValue } = this

      return portfolioValue.toFormat(UI_DEFAULT_FIAT_DECIMALS)
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
  },

  methods: {
    handleLeaveGuildClick() {
      const { guild } = this

      this.$accessor.guild.setCurrentGuildToLeave(guild)
      this.$accessor.modal.openModal(Modal.LeaveGuild)
    }
  }
})
</script>
