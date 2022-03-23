<template>
  <div
    class="grid-cols-12 gap-4 uppercase hidden items-center border-b border-primary-500"
    :class="[dense ? 'lg:grid' : 'xl:grid']"
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
