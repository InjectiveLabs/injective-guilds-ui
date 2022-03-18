<template>
  <button
    type="button"
    role="button"
    :class="classes"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    default: {
      required: false,
      default: false,
      type: Boolean,
    },

    text: {
      required: false,
      default: false,
      type: Boolean,
    },

    outline: {
      required: false,
      default: false,
      type: Boolean,
    },

    primary: {
      required: false,
      default: false,
      type: Boolean,
    },

    red: {
      required: false,
      default: false,
      type: Boolean,
    },

    disabled: {
      required: false,
      default: false,
      type: Boolean,
    },
  },

  computed: {
    classes() {
      const classes = [
        'text-center',
        'rounded',
        'focus:outline-none',
        'py-2',
        'px-6',
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
      }

      if (!this.disabled) {
        if (this.text) {
          const color = this.red
            ? ['text-red-500', 'hover:text-red-600']
            : this.default
            ? ['text-gray-500', 'hover:text-primary-500']
            : ['text-primary-500', 'hover:text-primary-600']

          classes.push('font-bold', 'tracking-wide', ...color)
        } else if (this.primary) {
          if (this.outline) {
            classes.push(
              'bg-transparent',
              'font-medium',
              'border',
              'border-primary-500',
              'text-primary-500',
              'hover:text-primary-400'
            )
          } else {
            classes.push(
              'font-bold',
              'bg-primary-500',
              'hover:bg-primary-400',
              'text-gray-800',
              'shadow-none'
            )
          }
        } else if (this.red) {
          if (this.outline) {
            classes.push(
              'bg-transparent',
              'font-medium',
              'border',
              'border-red-500',
              'text-red-500',
              'hover:text-red-400'
            )
          } else {
            classes.push(
              'font-bold',
              'bg-red-500',
              'hover:bg-red-400',
              'text-gray-800',
              'shadow-none'
            )
          }
        }
      }
      return classes.join(' ')
    },
  },
})
</script>
