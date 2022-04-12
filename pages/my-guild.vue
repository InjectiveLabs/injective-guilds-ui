<template>
  <VHOCLoading :status="status">
    <div>
      <v-banner>
        <div class="grid grid-col-1 md:grid-cols-2 gap-4 w-full">
          <div class="text-white self-center mx-auto w-full">
            <p class="font-logo text-6xl md:text-9xl">
              {{ $t('myGuild.title') }}
            </p>
            <p class="text-lg mt-8 max-w-lg">
              {{ $t('myGuild.description') }}
            </p>
          </div>

          <div class="mx-auto md:ml-auto w-full">
            <v-overview
              v-if="memberPortfolio"
              :portfolio="memberPortfolio[0] || {}"
            />

            <v-card transparent class="mt-2">
              <div class="flex items-start justify-between">
                <span class="text-sm font-bold uppercase tracking-widest mt-1">
                  {{ $t('myGuild.myEarnings') }}
                </span>
                <span class="text-3.5xl font-bold">
                  ${{ myEarningsToFormat }}
                </span>
              </div>
            </v-card>

            <v-card v-if="guild" transparent class="mt-2">
              <v-historical-returns :monthly-portfolios="memberPortfolio">
                {{ $t('myGuild.returns') }}
              </v-historical-returns>
            </v-card>
          </div>
        </div>
      </v-banner>

      <section class="py-16 container">
        <div class="border-t border-primary-500 w-full" />
        <TableBody v-if="guild">
          <TableRow :guild="guild" />
        </TableBody>
      </section>
    </div>
  </VHOCLoading>
</template>

<script lang="ts">
import Vue from 'vue'
import { BigNumberInBase, Status, StatusType } from '@injectivelabs/utils'
import { ZERO_IN_BASE } from '@injectivelabs/ui-common'
import VBanner from '~/components/partials/common/subpage-banner.vue'
import TableBody from '~/components/partials/grid-table/body.vue'
import TableRow from '~/components/partials/my-guild/my-guild-row.vue'
import VOverview from '~/components/partials/my-guild/overview.vue'
import VHistoricalReturns from '~/components/partials/common/historical-returns.vue'
import { UiGuild, UiMember, UiMonthlyPortfolio } from '~/types'
import {
  GuildNotFoundException,
  MemberNotFoundException
} from '~/app/exceptions'
import {
  UI_DEFAULT_FIAT_DECIMALS,
  UI_DEFAULT_PERCENTAGE_DECIMALS
} from '~/app/utils/constants'

export default Vue.extend({
  components: {
    TableBody,
    TableRow,
    VBanner,
    VHistoricalReturns,
    VOverview
  },

  middleware: ['wallet-connected', 'has-joined-guild'],

  data() {
    return {
      poll: undefined as any,
      status: new Status(StatusType.Loading)
    }
  },

  computed: {
    guild(): UiGuild | undefined {
      return this.$accessor.guild.guild
    },

    member(): UiMember | undefined {
      return this.$accessor.member.member
    },

    memberPortfolio(): UiMonthlyPortfolio[] {
      return this.$accessor.member.memberPortfolio || []
    },

    myEarnings(): BigNumberInBase {
      const { memberPortfolio } = this

      if (!memberPortfolio || memberPortfolio.length === 0) {
        return ZERO_IN_BASE
      }

      const firstSnapshot = memberPortfolio[memberPortfolio.length - 1]
      const lastSnapshot = memberPortfolio[0]

      return lastSnapshot.portfolioValue.minus(firstSnapshot.portfolioValue)
    },

    myEarningsToFormat(): string {
      const { myEarnings } = this

      return myEarnings.toFormat(UI_DEFAULT_FIAT_DECIMALS)
    },

    historicalReturns(): BigNumberInBase {
      const { memberPortfolio } = this

      if (!memberPortfolio || memberPortfolio.length === 0) {
        return ZERO_IN_BASE
      }

      return memberPortfolio[0].returns
    },

    historicalReturnsToFormat(): string {
      const { historicalReturns } = this

      return historicalReturns.toFormat(UI_DEFAULT_PERCENTAGE_DECIMALS)
    }
  },

  watch: {
    member(newMember) {
      if (!newMember) {
        this.$router.push({ name: 'index' })
      }
    }
  },

  mounted() {
    this.fetchGuildAndProfile()
      .catch((error: any) => {
        if (
          error instanceof GuildNotFoundException ||
          error instanceof MemberNotFoundException
        ) {
          this.$toast.error(this.$t('toast.myGuildFetchProfileError'))
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
    fetchGuildAndProfile(): Promise<void[]> {
      const { member } = this

      if (!member) {
        return Promise.resolve([])
      }

      const { guildId } = member

      return Promise.all([
        this.$accessor.guild.fetchGuild(guildId),
        this.$accessor.member.fetchMember(),
        this.$accessor.member.fetchMemberPortfolio()
      ])
    },

    setPolling() {
      this.poll = setInterval(() => {
        this.fetchGuildAndProfile().catch((error: any) => {
          if (
            error instanceof GuildNotFoundException ||
            error instanceof MemberNotFoundException
          ) {
            this.$toast.error(this.$t('toast.myGuildFetchProfileError'))
            this.$router.push('/')
          }
        })
      }, 30 * 1000)
    }
  }
})
</script>
