<template>
  <div class="my-6 mx-6">
    <div class="image-container">
      <div
        class="w-[542px] h-full bg-cover"
        :style="{ backgroundImage: `url(${guildInfo.image})` }"
      />
      <div
        class="w-full bg-black bg-opacity-70 h-24 absolute inset-x-0 bottom-0 border border-primary-500 pl-10"
      >
        <p class="text-base text-white mt-4">
          {{ $t('guildCard.member', { amount: memberAmountToFormat }) }}
        </p>
        <p class="text-3xl text-white mt-1.5">
          {{ guildInfo.name }}
        </p>
      </div>
      <div class="triangle-1" />
      <div class="triangle-2" />
      <div class="triangle-3" />
    </div>
    <div class="info-container">
      <div class="flex">
        <div>
          <p class="text-3xl text-primary-500 mr-20">
            {{ $t('guildCard.assetAmount', { amount: assetAmountToFormat }) }}
          </p>
          <p class="text-base text-primary-500 mt-2.5">
            {{ $t('guildCard.totalAssets') }}
          </p>
        </div>
        <div>
          <p class="text-3xl text-primary-500">
            {{ apyToString }}
          </p>
          <p class="text-base text-primary-500 mt-2.5">
            {{ $t('guildCard.apy') }}
          </p>
        </div>
      </div>
      <div class="flex gap-2.5 mt-6">
        <img
          v-for="currency in guildInfo.assets"
          :key="currency.symbol"
          :src="currency.logo"
          alt=""
          class="w-8 h-8"
        />
      </div>
      <v-button
        v-if="guildInfo.isJoinable"
        class="mt-6 pointer-events-auto"
        primary
      >
        {{ $t('guildCard.joinNow') }}
      </v-button>
      <v-button
        v-else-if="guildInfo.isJoined"
        class="mt-6 pointer-events-auto"
        accent
        outline
      >
        {{ $t('guildCard.leave') }}
      </v-button>
      <v-button
        v-else-if="guildInfo.isFull"
        class="mt-6 pointer-events-auto"
        disabled
      >
        {{ $t('guildCard.maxCapacity') }}
      </v-button>
      <v-button
        v-else-if="!guildInfo.isQualified"
        class="mt-6 pointer-events-auto"
        disabled
      >
        {{ $t('guildCard.unqualified') }}
      </v-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { UIGuildCard } from '~/types'

export default Vue.extend({
  props: {
    guildInfo: {
      required: true,
      type: Object as PropType<UIGuildCard>
    }
  },
  computed: {
    apyToString(): string {
      const { guildInfo } = this
      return `${guildInfo.apy}%`
    },
    memberAmountToFormat(): string {
      const { guildInfo } = this
      return guildInfo.memberAmount.toFormat()
    },
    assetAmountToFormat(): string {
      const { guildInfo } = this
      return guildInfo.totalAssetsAmount.toFormat()
    }
  }
})
</script>

<style lang="scss" scoped>
.image-container {
  @apply w-[542px] h-[308px] overflow-hidden  relative;
  clip-path: polygon(0% 56px, 56px 0%, 100% 0%, 100% 100%, 0 100%);
  &::before {
    @apply inset-0 absolute bg-primary-500 w-full h-full;

    content: '';
    clip-path: polygon(
      0% 56px,
      56px 0%,
      100% 0%,
      100% 100%,
      0 100%,
      0 56px,
      1px 56px,
      1px calc(100% - 1px),
      calc(100% - 1px) calc(100% - 1px),
      calc(100% - 1px) 1px,
      56px 1px,
      1px 56px,
      0 56px
    );
  }
  .triangle-1 {
    @apply absolute bottom-0 right-0 w-0 h-0;
    border-bottom: 56px solid #0ff4e7;
    border-left: 56px solid transparent;
  }
  .triangle-2 {
    @apply absolute bottom-0 right-0 w-0 h-0;
    border-bottom: 40px solid black;
    border-left: 40px solid transparent;
  }
  .triangle-3 {
    @apply absolute bottom-0 right-0 w-0 h-0;
    border-bottom: 24px solid #0ff4e7;
    border-left: 24px solid transparent;
  }
}

.info-container {
  @apply w-[542px] h-[240px]  overflow-hidden relative border-l border-primary-500 py-6 pl-10;
  pointer-events: none;

  cursor: pointer;
  &::after,
  &::before {
    @apply absolute left-0;
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
