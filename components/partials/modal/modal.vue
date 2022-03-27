<template>
  <ModalWrapper :is-open="isOpen" @modal-closed="handleCloseModal">
    <template #default>
      <div
        v-if="isOpen"
        class="w-full transform transition-all px-0.5 relative"
        :class="[sizeClasses, { accent: accent, md: md, lg: !md && !sm }]"
      >
        <div class="modal-wrap">
          <div class="modal">
            <p
              class="text-sm font-bold uppercase text-center"
              :class="[accent ? 'text-accent-500' : 'text-primary-500']"
            >
              {{ title }}
            </p>

            <div
              :class="[accent ? 'text-accent-500' : 'text-primary-500']"
              @click="handleCloseModal"
            >
              <v-icon-close class="cursor-pointer ml-auto w-4 h-4 -mr-2" />
            </div>

            <div
              class="mt-5"
              :class="[accent ? 'text-accent-500' : 'text-primary-500']"
            >
              <slot />
            </div>
          </div>
          <div class="modal-glow" />
        </div>
      </div>
    </template>
  </ModalWrapper>
</template>

<script lang="ts">
import Vue from 'vue'
import ModalWrapper from './modal-wrapper.vue'

export default Vue.extend({
  components: {
    ModalWrapper
  },

  props: {
    isOpen: {
      default: false,
      type: Boolean
    },

    sm: {
      type: Boolean,
      default: false
    },

    md: {
      type: Boolean,
      default: false
    },

    title: {
      type: String,
      default: ''
    },

    accent: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    sizeClasses(): string[] {
      const { sm, md } = this

      if (sm) {
        return ['max-w-[448px] xs:max-w-[448px]']
      }

      if (md) {
        return ['max-w-lg', 'lg:max-w-2xl']
      }

      return ['max-w-lg', 'lg:max-w-3xl']
    }
  },

  methods: {
    handleCloseModal() {
      this.$emit('modal-closed')
    }
  }
})
</script>

<style lang="scss" scoped>
.modal-wrap {
  @apply relative h-full w-full;

  filter: drop-shadow(0 0 8px rgba(15, 244, 231, 0.5));
}

.modal {
  @apply w-full h-full px-8 pb-8 pt-6 bg-black text-primary-500;

  clip-path: polygon(
    0 41px,
    16px 23px,
    112px 23px,
    130px 0,
    calc(100% - 130px) 0,
    calc(100% - 112px) 23px,
    calc(100% - 16px) 23px,
    100% 41px,
    100% 100%,
    0 100%
  );

  &::before {
    @apply inset-0 absolute bg-primary-500 w-full h-full;

    content: '';
    clip-path: polygon(
      0 41px,
      16px 23px,
      112px 23px,
      130px 0,
      calc(100% - 130px) 0,
      calc(100% - 112px) 23px,
      calc(100% - 16px) 23px,
      100% 41px,
      100% 100%,
      0 100%,
      0 41px,
      1px 41px,
      1px calc(100% - 1px),
      calc(100% - 1px) calc(100% - 1px),
      calc(100% - 1px) 42px,
      calc(100% - 17px) 24px,
      calc(100% - 113px) 24px,
      calc(100% - 125px) 10px,
      125px 10px,
      113px 24px,
      17px 24px,
      1px 42px
    );
  }
}

@media only screen and (max-width: 480px) {
  .modal {
    clip-path: polygon(
      0 41px,
      16px 23px,
      82px 23px,
      100px 0,
      calc(100% - 100px) 0,
      calc(100% - 82px) 23px,
      calc(100% - 16px) 23px,
      100% 41px,
      100% 100%,
      0 100%
    );

    &::before {
      clip-path: polygon(
        0 41px,
        16px 23px,
        82px 23px,
        100px 0,
        calc(100% - 100px) 0,
        calc(100% - 82px) 23px,
        calc(100% - 16px) 23px,
        100% 41px,
        100% 100%,
        0 100%,
        0 41px,
        1px 41px,
        1px calc(100% - 1px),
        calc(100% - 1px) calc(100% - 1px),
        calc(100% - 1px) 42px,
        calc(100% - 17px) 24px,
        calc(100% - 83px) 24px,
        calc(100% - 95px) 10px,
        95px 10px,
        83px 24px,
        17px 24px,
        1px 42px
      );
    }
  }
}

.modal-glow {
  @apply absolute h-6 w-4/5 bg-primary-500 inset-x-0 mx-auto;

  bottom: -10px;

  filter: blur(100px);
  transform: matrix(-1, 0, 0, 1, 0, 0);
}

.accent {
  .modal-wrap {
    filter: drop-shadow(0 0 8px rgba(224, 59, 24, 0.5));
  }

  .modal {
    @apply text-accent-500;

    &::before {
      @apply bg-accent-500;
    }
  }

  .modal-glow {
    @apply bg-accent-500;
  }
}
</style>
