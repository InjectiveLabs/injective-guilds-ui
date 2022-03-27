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
              v-if="profilePortfolio"
              :portfolio="profilePortfolio.firstSnapshot"
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

            <v-card transparent class="mt-2">
              <div class="flex items-start justify-between">
                <span class="text-sm font-bold uppercase tracking-widest mt-1">
                  {{ $t('myGuild.historicalReturns') }}
                </span>
                <span class="text-3.5xl font-bold">
                  {{ historicalReturnsToFormat }}%
                </span>
              </div>
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
import VBanner from '~/layouts/child-page-banner.vue'
import TableBody from '~/components/partials/grid-table/body.vue'
import TableRow from '~/components/partials/my-guild/my-guild-row.vue'
import VOverview from '~/components/partials/my-guild/overview.vue'
import { UiGuild, UiProfile, UIProfilePortfolio } from '~/types'
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
    VOverview
  },

  middleware: ['wallet-connected', 'has-joined-guild'],

  data() {
    return {
      status: new Status(StatusType.Loading)
    }
  },

  computed: {
    guild(): UiGuild | undefined {
      return this.$accessor.guild.guild
    },

    profile(): UiProfile {
      return this.$accessor.profile.profile as UiProfile
    },

    profilePortfolio(): UIProfilePortfolio {
      return this.$accessor.profile.profilePortfolio as UIProfilePortfolio
    },

    myEarnings(): BigNumberInBase {
      const { profilePortfolio } = this

      if (!profilePortfolio) {
        return ZERO_IN_BASE
      }

      return profilePortfolio.lastSnapshot.portfolioValue.minus(
        profilePortfolio.firstSnapshot.portfolioValue
      )
    },

    myEarningsToFormat(): string {
      const { myEarnings } = this

      return myEarnings.toFormat(UI_DEFAULT_FIAT_DECIMALS)
    },

    historicalReturns(): BigNumberInBase {
      const { profilePortfolio } = this

      if (!profilePortfolio || !profilePortfolio.historicalReturns) {
        return ZERO_IN_BASE
      }

      return profilePortfolio.historicalReturns
    },

    historicalReturnsToFormat(): string {
      const { historicalReturns } = this

      return historicalReturns.toFormat(UI_DEFAULT_PERCENTAGE_DECIMALS)
    }
  },

  mounted() {
    const { guildId } = this.profile

    Promise.all([
      this.$accessor.guild.fetchGuild(guildId),
      this.$accessor.profile.fetchProfilePortfolio()
    ])
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
  }
})
</script>
