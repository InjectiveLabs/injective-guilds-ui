<template>
  <button
    type="button"
    role="button"
    :class="classes"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot v-if="status && status.isNotLoading()" />
    <span v-if="status && status.isLoading()" class="block w-full">
      <span class="spinner" />
    </span>
  </button>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Status } from '@injectivelabs/utils'

export default Vue.extend({
  props: {
    status: {
      required: false,
      type: Object as PropType<Status>,
      default: () => new Status()
    },

    text: {
      default: false,
      type: Boolean
    },

    outline: {
      default: false,
      type: Boolean
    },

    primary: {
      default: false,
      type: Boolean
    },

    accent: {
      default: false,
      type: Boolean
    },

    disabled: {
      default: false,
      type: Boolean
    }
  },

  computed: {
    classes(): string[] {
      const classes = [
        'text-center',
        'rounded',
        'focus:outline-none',
        'py-2',
        'px-6'
      ]

      if (this.disabled) {
        classes.push(
          'pointer-events-none',
          'text-black',
          'bg-gray-600',
          'font-bold'
        )

        if (!this.text) {
          classes.push('border', 'border-gray-700')
        }

        return classes
      }

      if (this.text || this.outline) {
        classes.push('bg-transparent', 'font-medium')
        if (this.outline) {
          const borderColor = this.accent
            ? ['border-red-500', 'hover:border-red-600']
            : ['border-primary-500', 'hover:text-primary-600']

          classes.push(...borderColor, 'border')
        }

        const textColor = this.accent
          ? ['text-red-500', 'hover:text-red-600']
          : ['text-primary-500', 'hover:text-primary-600']

        return [...classes, ...textColor, 'tracking-wide']
      }

      // solid button
      classes.push('font-bold', 'shadow-none', 'text-black')
      const bgColor = this.accent
        ? ['text-red-500', 'hover:text-red-600']
        : ['bg-primary-500', 'hover:bg-primary-600']

      return [...classes, ...bgColor]
    }
  }
})
</script>
