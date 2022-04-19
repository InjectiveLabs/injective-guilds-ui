<template>
  <div class="flex flex-col max-w-xl mx-auto w-full">
    <div class="image-container w-full">
      <div
        class="w-full h-full bg-cover bg-center opacity-25"
        :style="{ backgroundImage: `url(${guildAsset.card})` }"
      />
      <div
        class="w-full bg-black bg-opacity-70 h-24 absolute inset-x-0 bottom-0 border border-primary-500 px-10 pt-5 pb-6 text-white"
      >
        <p
          class="text-3.5xl overflow-ellipsis overflow-hidden whitespace-nowrap mt-4"
        >
          {{ 'The Cyborgs' }}
        </p>

        <div class="triangle-1" />
        <div class="triangle-2" />
        <div class="triangle-3" />
      </div>
    </div>

    <div class="guild-card-info-container m-0">
      <div class="flex flex-row items-end">
        <p class="text-3.5xl uppercase">
          {{ $t('guildCard.comingSoon') }}
        </p>
        <div class="flex gap-2 pb-2 ml-1">
          <div class="pulse-dot pulse-dot-1" />
          <div class="pulse-dot pulse-dot-2" />
          <div class="pulse-dot pulse-dot-3" />
        </div>
      </div>
      <p class="mt-20">
        {{ $t('guildCard.getEmailNotification') }}
      </p>

      <v-button class="mt-3 relative z-10">
        <a
          class="absolute inset-0 w-full h-full"
          href=" https://2frsqow755m.typeform.com/to/FJSa37Zy"
          target="_blank"
        />
        {{ $t('guildCard.registerInterest') }}
      </v-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { guildImageMappings, GuildAsset } from '~/app/data/guild'

export default Vue.extend({
  computed: {
    guildAsset(): GuildAsset {
      return guildImageMappings.comingSoon
    }
  }
})
</script>

<style lang="scss" scoped>
.image-container {
  @apply h-[308px] overflow-hidden max-w-xl relative m-auto;
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

.guild-card-info-container {
  @apply overflow-hidden max-w-xl relative border-l border-primary-500 px-10 py-6 self-center w-full;

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

  .pulse-dot {
    @apply w-1.5 h-1.5 rounded-full bg-primary-500;
  }

  .pulse-dot-1 {
    opacity: 0.5;
    animation: pulse 1.5s ease infinite;
  }

  .pulse-dot-2 {
    animation: pulse 1.5s ease infinite;
    animation-delay: 0.5s;
  }

  .pulse-dot-3 {
    animation: pulse 1.5s ease infinite;
    animation-delay: 1s;
  }

  @keyframes pulse {
    0% {
      opacity: 0.4;
      transform: scale(1, 1);
    }

    50% {
      opacity: 1;
      transform: scale(1.2, 1.2);
    }

    100% {
      opacity: 0.4;
      transform: scale(1, 1);
    }
  }
}
</style>
