<template>
  <div class="guild-card-image-container">
    <div
      class="w-full h-full bg-cover bg-center"
      :style="{ backgroundImage: `url(${guildAsset.card})` }"
    />
    <div
      class="w-full bg-black bg-opacity-70 h-24 absolute inset-x-0 bottom-0 border border-primary-500 px-10 pt-5 pb-6 text-white"
    >
      <p class="text-sm">
        {{ guild ? guild.memberCount : '0' }} {{ $t('guildCard.member') }}
      </p>
      <p class="text-3.5xl overflow-ellipsis overflow-hidden whitespace-nowrap">
        {{ guild.name }}
      </p>
    </div>
    <div class="triangle-1" />
    <div class="triangle-2" />
    <div class="triangle-3" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { UiGuildWithMeta } from '~/types'
import { guildImageMappings, GuildAsset } from '~/app/data/guild'

export default Vue.extend({
  props: {
    guild: {
      required: true,
      type: Object as PropType<UiGuildWithMeta>
    }
  },

  computed: {
    guildAsset(): GuildAsset {
      const { guild } = this

      return guildImageMappings[guild.id] || guildImageMappings.default
    }
  }
})
</script>

<style lang="scss" scoped>
.guild-card-image-container {
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
</style>
