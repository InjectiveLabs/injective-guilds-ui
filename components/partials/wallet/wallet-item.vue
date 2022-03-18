<template>
  <div
    class="
      flex
      items-center
      border border-primary-500
      p-4
      hover:text-white
      cursor-pointer
    "
    @click="handleClick"
  >
    <slot name="logo" />
    <slot name="description" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Wallet } from '@injectivelabs/web3-strategy'

export default Vue.extend({
  props: {
    wallet: {
      type: String as PropType<Wallet>,
      required: true
    }
  },

  methods: {
    handleClick() {
      const { wallet } = this

      this.$emit('click', wallet)
    }
  }
})
</script>
