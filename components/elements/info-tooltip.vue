<template>
  <v-icon-info
    v-tooltip="{ content: tooltip }"
    v-bind="$attrs"
    class="w-3 h-3 cursor-pointer"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    tooltip: {
      type: String,
      default: ''
    }
  }
})
</script>
