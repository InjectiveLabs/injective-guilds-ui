<template>
  <div
    class="grid grid-cols-2 gap-4"
    :class="[
      dense ? 'lg:grid-cols-12 px-4 py-6 ' : 'xl:grid-cols-12 px-6 py-8'
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    dense: {
      type: Boolean,
      default: false
    }
  }
})
</script>
