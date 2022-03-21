<template>
  <div class="relative">
    <div class="flex items-center h-full w-full">
      <div class="bg-primary-500 w-3 self-stretch mr-1"></div>
      <div class="card-wrap" :class="{ square: square }">
        <div class="card">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    square: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
.card {
  @apply w-full h-full px-6 pb-4 pt-10 bg-black bg-opacity-20;

  clip-path: polygon(
    68px 0,
    84px 16px,
    100% 16px,
    100% calc(100% - 22px),
    calc(100% - 22px) 100%,
    0 100%,
    0 0
  );

  &::before {
    @apply inset-0 absolute bg-primary-500 w-full h-full;

    content: '';
    clip-path: polygon(
      68px 0,
      84px 16px,
      100% 16px,
      100% calc(100% - 22px),
      calc(100% - 22px) 100%,
      0 100%,
      0 0,
      1px 0,
      1px calc(100% - 1px),
      calc(100% - 23px) calc(100% - 1px),
      calc(100% - 1px) calc(100% - 23px),
      calc(100% - 1px) 15px,
      calc(100% - 1px) 17px,
      83px 17px,
      67px 1px,
      1px 1px,
      0 0
    );
  }
}

.card.square {
  clip-path: polygon(68px 0, 84px 16px, 100% 16px, 100% 100%, 0 100%, 0 0);

  &::before {
    clip-path: polygon(
      68px 0,
      84px 16px,
      100% 16px,
      100% 100%,
      0 100%,
      0 0,
      1px 0,
      1px calc(100% - 1px),
      calc(100% - 1px) calc(100% - 1px),
      calc(100% - 1px) 15px,
      calc(100% - 1px) 17px,
      83px 17px,
      67px 1px,
      1px 1px,
      0 0
    );
  }
}

.card-wrap {
  @apply relative h-full w-full;

  filter: drop-shadow(0 0 16px rgba(15, 244, 231, 0.5));
}
</style>
