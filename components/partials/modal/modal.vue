<template>
  <ModalWrapper :is-open="isOpen" @modal-closed="handleCloseModal">
    <template #default>
      <div
        v-if="isOpen"
        class="modal w-full transform transition-all px-0.5 relative"
        :class="[sizeClasses, { accent: accent, md: md, lg: !md && !sm }]"
      >
        <div class="w-full bg-black modal-content relative p-8">
          <slot />
        </div>

        <span
          class="modal-title text-sm font-bold uppercase text-center"
          :class="[accent ? 'text-accent-500' : 'text-primary-500']"
        >
          {{ title }}
        </span>
        <span
          class="modal-close cursor-pointer"
          :class="[accent ? 'text-accent-500' : 'text-primary-500']"
          @click="handleCloseModal"
        >
          <v-icon-close class="w-4 h-4" />
        </span>
        <div class="modal-glow" />
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
        return ['xs:max-w-[448px]']
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
.modal-content {
  @apply border-b border-l border-r border-primary-500 relative z-10 text-primary-500;

  box-shadow: 0 0 16px 2px rgba(15, 244, 231, 0.5);
}

.modal::before {
  @apply absolute -inset-x-0 bg-cover w-full z-20;

  content: ' ';
  background-image: url(/svg/primary-modal.svg);
  height: 54px;
  top: -54px;
}

.modal-title {
  @apply absolute inset-x-0 z-30;

  top: -18px;
}

.modal-close {
  @apply absolute z-30 top-0;

  right: 16px;
}

.modal-glow {
  @apply absolute h-10 w-4/5 bg-primary-500 inset-x-0 mx-auto;

  filter: blur(100px);
  transform: matrix(-1, 0, 0, 1, 0, 0);
}

.hide-top-shadow {
  @apply absolute w-full bg-black h-1 inset-x-0;
}

.modal {
  &.accent {
    &::before {
      background-image: url(/svg/accent-modal.svg);
    }

    .modal-glow {
      @apply bg-accent-500;
    }

    .modal-content {
      @apply border-accent-500 text-accent-500;

      box-shadow: 0 0 16px rgba(224, 59, 24, 0.5);
    }
  }

  @media screen and (max-width: theme('screens.xs')) {
    padding: 0 2px;

    &::before {
      height: 48px;
      top: -48px;
    }

    .modal-title {
      top: -10px;
    }

    .modal-close {
      top: 4px;
    }
  }

  &.md,
  &.lg {
    &::before {
      height: 60px;
      top: -60px;
    }

    .modal-close {
      right: 24px;
    }
  }

  @media screen and (min-width: theme('screens.lg')) {
    &.md {
      padding: 0 3px;

      .modal-close {
        right: 28px;
      }

      &::before {
        height: 80px;
        top: -80px;
      }
    }

    &.lg {
      padding: 0 3px;

      &::before {
        height: 92px;
        top: -92px;
      }
    }
  }
}
</style>
