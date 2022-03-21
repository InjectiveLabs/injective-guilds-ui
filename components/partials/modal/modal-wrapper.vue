<template>
  <div
    v-show="isVisibleOnViewport"
    class="fixed inset-0 overflow-y-auto py-4 z-50"
  >
    <div
      class="
        flex
        items-center
        justify-center
        min-h-screen
        pt-4
        px-4
        pb-20
        sm:p-0
      "
    >
      <transition
        enter-active-class="ease-out duration-300"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-show="isOpen"
          class="fixed inset-0 transition-opacity"
          :aria-hidden="isOpen"
          @click="handleCloseModal"
        >
          <div
            class="absolute inset-0 bg-gray-900 dark:bg-gray-700 opacity-90"
          />
        </div>
      </transition>

      <transition
        enter-active-class="ease-out duration-300"
        enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="ease-in duration-200"
        leave-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <slot
          :is-open="isOpen"
          :handle-click-on-close-button="handleClickOnCloseButton"
        />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    isOpen: {
      default: false,
      type: Boolean
    }
  },

  data() {
    return {
      isVisibleOnViewport: false
    }
  },

  watch: {
    isOpen(newIsOpen: boolean) {
      newIsOpen ? this.handleOnOpen() : this.handleOnClose()
    }
  },

  mounted() {
    this.onEscKeyDown()

    if (this.isOpen) {
      this.handleOnOpen()
    }
  },

  beforeDestroy() {
    document.body.classList.remove('overflow-hidden')
  },

  methods: {
    handleOnOpen() {
      this.isVisibleOnViewport = true
      this.$nextTick(() => {
        document.body.classList.add('overflow-hidden')
      })
    },

    handleOnClose() {
      document.body.classList.remove('overflow-hidden')
      setTimeout(() => {
        this.isVisibleOnViewport = false
      }, 300)
    },

    handleCloseModal() {
      if (this.isOpen) {
        this.$emit('modal-closed')
      }
    },

    handleClickOnCloseButton() {
      this.handleCloseModal()
    },

    onEscKeyDown() {
      const onEscape = (e: KeyboardEvent) => {
        if (this.isOpen && e.keyCode === 27) {
          this.handleCloseModal()
        }
      }

      document.addEventListener('keydown', onEscape)

      this.$once('hook:destroyed', () => {
        document.removeEventListener('keydown', onEscape)
      })
    }
  }
})
</script>
