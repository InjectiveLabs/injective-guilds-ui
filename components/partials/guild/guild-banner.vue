<template>
  <section
    v-if="guild"
    :style="{ backgroundImage: `url(${guildAssets.banner})` }"
    class="py-16 bg-cover bg-center"
  >
    <div class="container flex h-full items-center">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-5">
        <div class="md:col-span-2">
          <p class="font-bold text-sm tracking-wider uppercase mb-6">
            {{ $t('guild.guildName') }}
          </p>
          <h2 class="tracking-tight text-7xl font-bold text-white capitalize">
            {{ guild.name }}
          </h2>

          <v-guild-card-action class="mt-8" banner :guild="guild" />
        </div>

        <div class="md:col-span-3">
          <p class="font-bold text-sm tracking-wider uppercase mb-4">
            {{ $t('guild.backgroundStory') }}
          </p>
          <p class="text-lg">{{ guildAssets.story }}</p>

          <p class="font-bold text-sm tracking-wider uppercase mt-8 mb-4">
            {{ $t('guild.tradingStrategy') }}
          </p>

          <p class="text-lg">{{ guildAssets.strategy }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import VGuildCardAction from '../home/guild-action.vue'
import { UiGuild } from '~/types'
import { guildImageMappings, GuildAsset } from '~/app/data/guild'

export default Vue.extend({
  components: {
    VGuildCardAction
  },

  data() {
    return {
      guildImageMappings
    }
  },

  computed: {
    guild(): UiGuild | undefined {
      return this.$accessor.guild.guild
    },

    guildAssets(): GuildAsset {
      const { guild } = this

      if (!guild) {
        return guildImageMappings.default
      }

      return (
        guildImageMappings[guild.name.toLowerCase()] ||
        guildImageMappings.default
      )
    }
  }
})
</script>
