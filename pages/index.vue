<template>
  <VHOCLoading :status="status">
    <div>
      <section
        :style="{ backgroundImage: `url('/images/homepage-banner.jpg')` }"
        class="py-16 bg-cover bg-right-bottom h-banner"
      >
        <div class="container flex h-full items-center">
          <div class="text-white">
            <p class="font-logo text-9xl">{{ $t('tradingGuild.title') }}</p>
            <div class="text-lg mt-8 max-w-lg">
              <p>{{ $t('tradingGuild.description') }}</p>
              <p>{{ $t('tradingGuild.subDescription') }}</p>
            </div>

            <div class="flex items-center mt-8 gap-6">
              <nuxt-link
                :to="{ name: 'how-it-works' }"
                class="text-sm bg-primary-500 text-primary-500 hover:text-white bg-opacity-50 lg:bg-opacity-20 hover:bg-opacity-80 lg:hover:bg-opacity-50 rounded p-2"
              >
                <span>{{ $t('howItWorks.title') }}</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </section>
      <div
        class="container grid md:grid-cols-1 3md:grid-cols-2 gap-8 my-8 lg:gap-16 lg:my-16"
      >
        <GuildCard
          v-for="(guild, index) in guilds"
          :key="`guild-card-${index}`"
          :guild="guild"
        />
        <ComingSoonGuild />
      </div>
    </div>
  </VHOCLoading>
</template>

<script lang="ts">
import Vue from 'vue'
import { Status, StatusType } from '@injectivelabs/utils'
import GuildCard from '~/components/partials/guild-card/index.vue'
import ComingSoonGuild from '~/components/partials/coming-soon-guild/index.vue'
import { UiGuildWithMeta } from '~/types'

export default Vue.extend({
  components: {
    GuildCard,
    ComingSoonGuild
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
