<template>
  <VHOCLoading :status="status">
    <div>
      <v-banner>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          <div class="text-white self-center lg:col-span-2 mx-auto w-full grid">
            <p class="font-logo text-6xl md:text-9xl">
              {{ $t('leaderboard.leaderboard') }}
            </p>
          </div>
        </div>
      </v-banner>
      <section class="py-16 container">
        <TableHeader class="text-sm font-bold px-4 pb-4 uppercase" dense>
          <span class="col-span-4">
            {{ $t('leaderboard.guild') }}
          </span>
          <div class="col-span-3 flex justify-end">
            <SortableHeaderItem
              :value="LeaderboardTableHeaderType.Value"
              :sort-by="sortBy"
              :ascending="ascending"
              @sort="handleSort"
            >
              {{ $t('leaderboard.value') }}
            </SortableHeaderItem>
          </div>

          <div class="col-span-3 flex justify-end">
            <SortableHeaderItem
              :value="LeaderboardTableHeaderType.Member"
              :sort-by="sortBy"
              :ascending="ascending"
              @sort="handleSort"
            >
              {{ $t('leaderboard.member') }}
            </SortableHeaderItem>
          </div>

          <div class="col-span-2 flex justify-end">
            <SortableHeaderItem
              :value="LeaderboardTableHeaderType.Returns"
              :sort-by="sortBy"
              :ascending="ascending"
              @sort="handleSort"
            >
              {{ $t('leaderboard.returns') }}
            </SortableHeaderItem>
          </div>
        </TableHeader>
        <TableBody class="border-t border-primary-500 lg:border-t-transparent">
          <TableRow
            v-for="(guild, index) in sortedGuildDataWithDirection"
            :key="guild.name"
            :guild="guild"
            :index="index + 1"
          >
          </TableRow>
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
import {
  LeaderboardTableHeaderType,
  UiGuildWithMeta,
  UiGuildWithReturns
} from '~/types'
import TableBody from '~/components/partials/grid-table/body.vue'
import TableRow from '~/components/partials/leaderboard/leaderboard-row.vue'
import TableHeader from '~/components/partials/grid-table/header.vue'
import SortableHeaderItem from '~/components/partials/grid-table/sortable-header-item.vue'

export default Vue.extend({
  components: {
    VBanner,
    TableBody,
    TableRow,
    TableHeader,
    SortableHeaderItem
  },

  data() {
    return {
      ascending: false,
      sortBy: LeaderboardTableHeaderType.Value,
      LeaderboardTableHeaderType,
      poll: undefined as any,
      status: new Status(StatusType.Loading)
    }
  },

  computed: {
    guilds(): UiGuildWithMeta[] {
      return this.$accessor.guild.guilds
    },

    guildWithReturns(): UiGuildWithReturns[] {
      const { guilds } = this

      return guilds.map((guild) => {
        const returns =
          guild.monthlyPortfolios.length === 0
            ? ZERO_IN_BASE
            : guild.monthlyPortfolios[0].returns

        return {
          ...guild,
          returns
        }
      })
    },

    sortedGuildData(): UiGuildWithReturns[] {
      const { guildWithReturns, sortBy } = this

      if (sortBy === LeaderboardTableHeaderType.Value) {
        return [...guildWithReturns].sort(
          (v1: UiGuildWithReturns, v2: UiGuildWithReturns) => {
            return new BigNumberInBase(v2.portfolio.portfolioValue)
              .minus(v1.portfolio.portfolioValue)
              .toNumber()
          }
        )
      }

      if (sortBy === LeaderboardTableHeaderType.Member) {
        return [...guildWithReturns].sort(
          (v1: UiGuildWithReturns, v2: UiGuildWithReturns) => {
            return v2.memberCount - v1.memberCount
          }
        )
      }

      if (sortBy === LeaderboardTableHeaderType.Returns) {
        return [...guildWithReturns].sort(
          (v1: UiGuildWithReturns, v2: UiGuildWithReturns) => {
            return v2.returns.minus(v1.returns).toNumber()
          }
        )
      }

      return guildWithReturns
    },

    sortedGuildDataWithDirection(): UiGuildWithMeta[] {
      const { ascending, sortedGuildData } = this

      return ascending ? sortedGuildData.reverse() : sortedGuildData
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
    setPolling() {
      this.poll = setInterval(() => {
        Promise.all([
          this.$accessor.guild.fetchGuilds(),
          this.$accessor.wallet.initPage()
        ])
      }, 30 * 1000)
    },

    handleSort(type: LeaderboardTableHeaderType) {
      if (type !== this.sortBy) {
        this.sortBy = type
        this.ascending = false
      } else if (this.ascending) {
        this.ascending = false
        this.sortBy = '' as LeaderboardTableHeaderType
      } else {
        this.ascending = true
      }
    }
  }
})
</script>
