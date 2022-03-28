<template>
  <div class="flex items-center cursor-pointer" @click="$emit('sort', value)">
    <div class="mr-4">
      <div
        :class="{
          'opacity-50': sortBy !== value || !ascending
        }"
      >
        <v-icon-triangle />
      </div>
      <div
        :class="{
          'opacity-50': sortBy !== value || ascending
        }"
      >
        <v-icon-triangle class="transform rotate-180" />
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: String,
      required: true
    },

    sortBy: {
      type: String,
      required: true
    },

    ascending: {
      type: Boolean,
      required: true
    }
  }
})
</script>
