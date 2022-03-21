<template>
  <div class="grid grid-cols-1">
    <slot></slot>
    <div
      v-if="showEmpty"
      class="col-span-1 grid grid-cols-1 xl:grid-cols-12 items-center grow"
    >
      <slot name="empty"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    showEmpty: {
      type: Boolean,
      default: false
    }
  }
})
</script>
