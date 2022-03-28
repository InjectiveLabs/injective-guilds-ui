<template>
  <div>
    <v-banner>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        <div class="text-white self-center lg:col-span-2 mx-auto w-full grid">
          <p class="font-logo text-6xl md:text-9xl">
            {{ $t('leaderboard.leaderboard') }}
          </p>
        </div>
        <div class="lg:ml-auto lg: self-start w-full max-w-xs self-end">
          <v-select-custom
            v-model="selected"
            :options="
              selectOptions.map((a) => ({
                code: a.code,
                label: a.label
              }))
            "
            :clearable="false"
            :searchable="false"
            :transparent="true"
          />
        </div>
      </div>
    </v-banner>
    <section class="pt-16 container">
      <div class="w-full" />
      <TableHeader class="text-sm font-bold px-6 py-2" dense>
        <span class="col-span-5 text-base text-primary-500">
          {{ $t('leaderboard.guild') }}
        </span>
        <div class="col-span-3 flex justify-end">
          <SortableHeaderItem
            :value="TableHeaderType.TotalAssetsAmount"
            :sort-by="sortBy"
            :ascending="ascending"
            @sort="handleSort"
          >
            {{ $t('leaderboard.totalAssets') }}
          </SortableHeaderItem>
        </div>

        <div class="col-span-2 flex justify-end">
          <SortableHeaderItem
            :value="TableHeaderType.APY"
            :sort-by="sortBy"
            :ascending="ascending"
            @sort="handleSort"
          >
            {{ $t('leaderboard.apy') }}
          </SortableHeaderItem>
        </div>
        <div class="col-span-2 flex justify-end">
          <SortableHeaderItem
            :value="TableHeaderType.Member"
            :sort-by="sortBy"
            :ascending="ascending"
            @sort="handleSort"
          >
            {{ $t('leaderboard.member') }}
          </SortableHeaderItem>
        </div>
      </TableHeader>
      <TableBody>
        <div class="border-t border-primary-500 w-full" />
        <TableRow
          v-for="(guild, index) in sortedGuildDataWithDirection"
          :key="guild.name"
          :guild="guild"
          :index="index"
        >
        </TableRow>
      </TableBody>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BigNumberInBase } from '@injectivelabs/utils'
import VBanner from '~/layouts/child-page-banner.vue'
import VSelectCustom from '~/components/inputs/select-custom.vue'
import { TableHeaderType, UIGuildCard } from '~/types'
import TableBody from '~/components/partials/grid-table/body.vue'
import TableRow from '~/components/partials/leaderboard/leader-board-row.vue'
import TableHeader from '~/components/partials/grid-table/header.vue'
import SortableHeaderItem from '~/components/partials/grid-table/sortable-header-item.vue'

export default Vue.extend({
  components: {
    VBanner,
    VSelectCustom,
    TableBody,
    TableRow,
    TableHeader,
    SortableHeaderItem
  },

  data() {
    return {
      selectOptions: [
        {
          code: 'all_time',
          label: 'All time'
        },
        {
          code: 'Apr',
          label: 'Apr 15 - May 15'
        },
        {
          code: 'Mar',
          label: 'Mar 15 - Feb 15'
        },
        {
          code: 'Feb',
          label: 'Feb 15 - Jan 15'
        }
      ],
      ascending: false,
      sortBy: '',
      selected: 'all_time',
      TableHeaderType,
      guildData: [
        {
          name: 'Schneider',
          image: '/svg/hero-1.svg',
          memberAmount: new BigNumberInBase('13540'),
          apy: 15,
          totalAssetsAmount: new BigNumberInBase('1388783'),
          assets: [
            {
              symbol: 'BNB',
              logo: '/svg/icons/BNB.svg',
              name: 'BNB'
            },
            {
              symbol: 'USDT',
              logo: '/svg/icons/USDT.svg',
              name: 'USDT'
            },
            {
              symbol: 'USDC',
              logo: '/svg/icons/USDC.svg',
              name: 'USDC'
            }
          ],
          status: 'joined'
        },
        {
          name: 'Ethixx',
          image: '/svg/hero-1.svg',
          memberAmount: new BigNumberInBase('1352'),
          apy: 10,
          totalAssetsAmount: new BigNumberInBase('123456789'),
          assets: [
            {
              symbol: 'BNB',
              logo: '/svg/icons/BNB.svg',
              name: 'BNB'
            },
            {
              symbol: 'USDT',
              logo: '/svg/icons/USDT.svg',
              name: 'USDT'
            },
            {
              symbol: 'USDC',
              logo: '/svg/icons/USDC.svg',
              name: 'USDC'
            }
          ],
          status: 'valid'
        },
        {
          name: 'Akukx',
          image: '/svg/hero-1.svg',
          memberAmount: new BigNumberInBase('1552'),
          apy: 10,
          totalAssetsAmount: new BigNumberInBase('1234789'),
          assets: [
            {
              symbol: 'BNB',
              logo: '/svg/icons/BNB.svg',
              name: 'BNB'
            },
            {
              symbol: 'USDT',
              logo: '/svg/icons/USDT.svg',
              name: 'USDT'
            },
            {
              symbol: 'USDC',
              logo: '/svg/icons/USDC.svg',
              name: 'USDC'
            }
          ],
          status: 'full'
        },
        {
          name: 'Asepoid',
          image: '/svg/hero-1.svg',
          memberAmount: new BigNumberInBase('1452'),
          apy: 12,
          totalAssetsAmount: new BigNumberInBase('126789'),
          assets: [
            {
              symbol: 'BNB',
              logo: '/svg/icons/BNB.svg',
              name: 'BNB'
            },
            {
              symbol: 'USDT',
              logo: '/svg/icons/USDT.svg',
              name: 'USDT'
            },
            {
              symbol: 'USDC',
              logo: '/svg/icons/USDC.svg',
              name: 'USDC'
            }
          ],
          status: 'unqualified',
          additionalInfo: '1,000 USDT + 500 INJ stake'
        }
      ] as UIGuildCard[]
    }
  },

  computed: {
    sortedGuildData(): UIGuildCard[] {
      const { guildData, sortBy } = this

      if (sortBy === TableHeaderType.TotalAssetsAmount) {
        return [...guildData].sort((v1: UIGuildCard, v2: UIGuildCard) => {
          return new BigNumberInBase(v2.totalAssetsAmount)
            .minus(v1.totalAssetsAmount)
            .toNumber()
        })
      }

      if (sortBy === TableHeaderType.Member) {
        return [...guildData].sort((v1: UIGuildCard, v2: UIGuildCard) => {
          return new BigNumberInBase(v2.memberAmount)
            .minus(v1.memberAmount)
            .toNumber()
        })
      }

      if (sortBy === TableHeaderType.APY) {
        return [...guildData].sort((v1: UIGuildCard, v2: UIGuildCard) => {
          return v2.apy - v1.apy
        })
      }

      return guildData
    },

    sortedGuildDataWithDirection(): UIGuildCard[] {
      const { ascending, sortedGuildData } = this

      return ascending ? sortedGuildData.reverse() : sortedGuildData
    }
  },

  methods: {
    handleSort(type: TableHeaderType) {
      if (type !== this.sortBy) {
        this.sortBy = type
        this.ascending = false
      } else if (this.ascending) {
        this.ascending = false
        this.sortBy = ''
      } else {
        this.ascending = true
      }
    }
  }
})
</script>
