<template>
  <div>
    <div class="flex gap-4 mb-6">
      <div
        v-for="(market, index) in guild.markets"
        :key="`guild-card-market-${index}`"
        class="flex items-center"
      >
        <img
          :src="`${market.token.logo}`"
          :alt="market.token.name"
          class="w-8 h-8"
        />

        <span class="text-sm ml-3">{{ market.ticker }}</span>
      </div>
    </div>

    <div class="flex items-start">
      <v-button class="pointer-events-auto" disabled>
        {{ $t('guildCard.unqualified') }}
      </v-button>

      <div class="text-sm ml-4">
        <p>{{ $t('guildCard.requirement') }}:</p>
        <div class="grid xs:grid-cols-2 xs:min-w-[180px]">
          <span
            v-for="(requirement, index) in guild.requirements"
            :key="`guild-requirement-${index}`"
          >
            {{ requirement.minAmount }} {{ requirement.token.symbol }}
          </span>
        </div>
      </div>
    </div>
    <!-- <v-button
      v-if="guildInfo.status === GuildStatus.Valid"
      class="mt-6 pointer-events-auto"
      primary
    >
      {{ $t('guildCard.joinNow') }}
    </v-button>
    <div v-else-if="guildInfo.status === GuildStatus.Joined" class="flex gap-3">
      <v-button class="mt-6 pointer-events-auto" accent outline>
        {{ $t('guildCard.leave') }}
      </v-button>
      <p class="text-base text-primary-500 self-end">
        {{ $t('guildCard.youAreInThisGuild') }}
      </p>
    </div>
    <v-button
      v-else-if="guildInfo.status === GuildStatus.Full"
      class="mt-6 pointer-events-auto"
      disabled
    >
      {{ $t('guildCard.maxCapacity') }}
    </v-button>
    <div
      v-else-if="guildInfo.status === GuildStatus.Unqualified"
      class="flex gap-3"
    >
      <v-button class="mt-6 pointer-events-auto" disabled>
        {{ $t('guildCard.unqualified') }}
      </v-button>
      <div class="pr-7">
        <p class="text-base text-primary-500 mt-5">

        </p>
        <p class="text-base text-primary-500">
          {{ guildInfo.additionalInfo }}
        </p>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { UiGuildWithMeta } from '~/types'

export default Vue.extend({
  props: {
    guild: {
      required: true,
      type: Object as PropType<UiGuildWithMeta>
    }
  },

  computed: {
    isMaxCapacity(): boolean {
      const { guild } = this

      return guild.memberCount > guild.capacity
    }
  }
})
</script>
