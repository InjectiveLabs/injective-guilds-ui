<template>
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
    <div class="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
      <GuildCard
        v-for="guild in guildData"
        :key="guild.name"
        :guild-info="guild"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { BigNumberInBase } from '@injectivelabs/utils'
import GuildCard from '~/components/partials/home/guild-card.vue'

export default Vue.extend({
  components: { GuildCard },
  data() {
    return {
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
      ]
    }
  },
  methods: {
    logout() {
      this.$accessor.wallet.logout()
    }
  }
})
</script>
