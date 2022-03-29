<template>
  <VHOCLoading :status="status">
    <div>
      <v-banner />

      <div class="container py-16">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-5">
          <div class="md:col-span-2">
            <v-guild-master />

            <v-card v-if="guild" class="mt-2">
              <div class="flex items-start justify-between">
                <span class="text-sm font-bold uppercase tracking-widest mt-1">
                  {{ $t('guild.members') }}
                </span>
                <span class="text-3.5xl font-bold">
                  {{ guild.memberCount }}
                </span>
              </div>
            </v-card>

            <v-historical-returns class="mt-2" />
          </div>

          <v-card class="row-start-1 md:row-start-auto md:col-span-3" square>
            <v-chart :portfolio-value="portfolioValue" />
          </v-card>
        </div>

        <v-portfolio class="mt-16" :portfolio-value="portfolioValue" />
        <v-member class="mt-10" :portfolio-value="portfolioValue" />
      </div>
      <v-modal-join-guild
        v-if="currentGuildToJoin"
        :guild="currentGuildToJoin"
      />
    </div>
  </VHOCLoading>
</template>

<script lang="ts">
import Vue from 'vue'
import { BigNumberInBase, Status, StatusType } from '@injectivelabs/utils'
import { ZERO_IN_BASE } from '@injectivelabs/ui-common'
import { GuildNotFoundException } from '~/app/exceptions'
import VBanner from '~/components/partials/guild/guild-banner.vue'
import VChart from '~/components/partials/guild/chart-wrapper.vue'
import VGuildMaster from '~/components/partials/guild/guild-master.vue'
import VHistoricalReturns from '~/components/partials/guild/historical-returns.vue'
import VPortfolio from '~/components/partials/guild/portfolio/index.vue'
import VMember from '~/components/partials/guild/member/index.vue'
import {
  UiPortfolioBalanceWithToken,
  UiGuildToJoinModal,
  UiGuildWithMeta
} from '~/types'
import VModalJoinGuild from '~/components/partials/modals/join-guild.vue'

export default Vue.extend({
  components: {
    VBanner,
    VChart,
    VModalJoinGuild,
    VGuildMaster,
    VHistoricalReturns,
    VMember,
    VPortfolio
  },

  data() {
    return {
      poll: undefined as any,
      status: new Status(StatusType.Loading)
    }
  },

  computed: {
    guild(): UiGuildWithMeta {
      return this.$accessor.guild.guild as UiGuildWithMeta
    },

    currentGuildToJoin(): UiGuildToJoinModal {
      return this.$accessor.guild.currentGuildToJoin
    },

    balances(): UiPortfolioBalanceWithToken[] {
      const { guild } = this

      if (!guild || !guild.portfolio || !guild.portfolio.balances) {
        return []
      }

      return guild.portfolio.balances
    },

    portfolioValue(): BigNumberInBase {
      const { guild } = this

      if (!guild || !guild.portfolio || !guild.portfolio.portfolioValue) {
        return ZERO_IN_BASE
      }

      return guild.portfolio.portfolioValue
    }
  },

  mounted() {
    const guildId = this.$route.params.guild

    this.fetchGuildAndWallet()
      .catch((error: any) => {
        if (error instanceof GuildNotFoundException) {
          this.$toast.error(
            this.$t('toast.guildNotFoundErrorToast', { name: guildId })
          )
          this.$router.push('/')
        } else {
          this.$onError(error)
        }
      })
      .finally(() => {
        this.status.setIdle()
      })

    this.setPolling()
  },

  beforeDestroy() {
    clearInterval(this.poll)
  },

  methods: {
    fetchGuildAndWallet(): Promise<void[]> {
      const guildId = this.$route.params.guild

      return Promise.all([
        this.$accessor.guild.fetchGuild(guildId),
        this.$accessor.guild.fetchPortfolios(guildId),
        this.$accessor.guild.fetchMembers(guildId),
        this.$accessor.wallet.initPage()
      ])
    },

    setPolling() {
      this.poll = setInterval(() => {
        this.fetchGuildAndWallet()
      }, 30 * 1000)
    }
  }
})
</script>
