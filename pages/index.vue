<template>
  <VHOCLoading :status="status">
    <div>
      <section
        :style="{ backgroundImage: `url('/svg/homepage-banner.svg')` }"
        class="py-16 bg-cover bg-right-bottom h-banner"
      >
        <div class="container flex h-full items-center">
          <div class="text-white">
            <p class="font-logo text-9xl">{{ $t('tradingGuild.title') }}</p>
            <p class="text-lg mt-8 max-w-lg">
              {{ $t('tradingGuild.description') }}
            </p>
          </div>
        </div>
      </section>
      <div class="container grid md:grid-cols-1 lg:grid-cols-2 gap-6 my-6">
        <GuildCard
          v-for="(guild, index) in guilds"
          :key="`guild-card-${index}`"
          :guild="guild"
        />
      </div>
    </div>
  </VHOCLoading>
</template>

<script lang="ts">
import Vue from 'vue'
import { Status, StatusType } from '@injectivelabs/utils'
import GuildCard from '~/components/partials/common/guild-card.vue'
import { UiGuildWithMeta } from '~/types'

export default Vue.extend({
  components: {
    GuildCard
  },

  data() {
    return {
      poll: undefined as any,
      status: new Status(StatusType.Loading)
    }
  },

  computed: {
    guilds(): UiGuildWithMeta[] {
      return this.$accessor.guild.guilds
    }
  },

  mounted() {
    Promise.all([this.$accessor.guild.fetchGuilds()])
      .catch(this.$onError)
      .finally(() => {
        this.status.setIdle()
      })

    this.setPolling()
  },

  beforeDestroy() {
    clearInterval(this.poll)
  },

  methods: {
    logout() {
      this.$accessor.wallet.logout()
    },

    setPolling() {
      this.poll = setInterval(() => {
        Promise.all([
          this.$accessor.guild.fetchGuilds(),
          this.$accessor.wallet.initPage()
        ])
      }, 30 * 1000)
    }
  }
})
</script>
