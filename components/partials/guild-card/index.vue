<template>
  <div
    v-on-clickaway="handleOnHoverLeave"
    class="flex flex-col max-w-xl mx-auto w-full"
    @click="handleOnHoverEnter"
    @mouseenter="handleOnHoverEnter"
    @mouseleave="handleOnHoverLeave"
  >
    <nuxt-link :to="{ name: 'guild-guild', params: { guild: guild.id } }">
      <v-guild-card-image :guild="guild" :on-hover="onHover" />
    </nuxt-link>

    <div class="guild-card-info-container flex-grow m-0">
      <div class="xs:flex justify-between">
        <div class="flex-grow">
          <p class="text-3xl text-primary-500">${{ portfolioValueToFormat }}</p>
          <p class="text-base text-primary-500 xs:mt-2.5">
            {{ $t('guildCard.value') }}
          </p>
        </div>
        <div class="flex-grow mt-2.5 xs:mt-0">
          <p class="text-3xl text-primary-500">
            {{ historicalReturnsToFormat }}%
          </p>
          <p class="text-base text-primary-500 xs:mt-2.5">
            {{ $t('guildCard.returns') }}
          </p>
        </div>
      </div>

      <v-guild-card-action class="mt-6 relative z-10" :guild="guild" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ZERO_IN_BASE } from '@injectivelabs/ui-common'
import { BigNumberInBase } from '@injectivelabs/utils'
import { directive as onClickaway } from 'vue-clickaway'
import VGuildCardImage from './image.vue'
import VGuildCardAction from './action.vue'
import { UiGuildWithMeta } from '~/types'
import {
  UI_DEFAULT_FIAT_DECIMALS,
  UI_DEFAULT_PERCENTAGE_DECIMALS
} from '~/app/utils/constants'

export default Vue.extend({
  directives: {
    onClickaway
  },

  components: {
    VGuildCardAction,
    VGuildCardImage
  },

  props: {
    guild: {
      required: true,
      type: Object as PropType<UiGuildWithMeta>
    }
  },

  data() {
    return {
      onHover: false
    }
  },

  computed: {
    historicalReturns(): BigNumberInBase {
      const { guild } = this

      if (
        !guild ||
        !guild.monthlyPortfolios ||
        guild.monthlyPortfolios.length === 0
      ) {
        return ZERO_IN_BASE
      }

      const [lastSnapshot] = guild.monthlyPortfolios

      if (!lastSnapshot.returns || !lastSnapshot.returns.isFinite()) {
        return ZERO_IN_BASE
      }

      return lastSnapshot.returns
    },

    historicalReturnsToFormat(): string {
      const { historicalReturns } = this

      return historicalReturns.toFormat(UI_DEFAULT_PERCENTAGE_DECIMALS)
    },

    portfolioValue(): BigNumberInBase {
      const { guild } = this

      if (!guild || !guild.portfolio || !guild.portfolio.portfolioValue) {
        return ZERO_IN_BASE
      }

      return guild.portfolio.portfolioValue
    },

    portfolioValueToFormat(): string {
      const { portfolioValue } = this

      return portfolioValue.toFormat(UI_DEFAULT_FIAT_DECIMALS)
    }
  },

  methods: {
    handleOnHoverEnter() {
      this.onHover = true
    },

    handleOnHoverLeave() {
      this.onHover = false
    }
  }
})
</script>

<style lang="scss" scoped>
.guild-card-info-container {
  @apply overflow-hidden max-w-xl relative border-l border-primary-500 p-6 self-center w-full;

  &::after,
  &::before {
    @apply absolute left-0 z-10;
    content: '';
    width: calc(100%);
  }
  &::before {
    @apply border-b border-r border-primary-500 h-14 bottom-0;
    transform: skew(-45deg);
    transform-origin: right top;
  }
  &::after {
    @apply border-r border-primary-500 top-0;
    height: calc(100% - 56px);
  }
}
</style>
