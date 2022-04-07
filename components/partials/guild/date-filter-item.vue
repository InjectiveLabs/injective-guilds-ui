<template>
  <span
    class="text-xs tracking-wide cursor-pointer py-[4.5px] px-1.5"
    :class="{
      'bg-primary-500 bg-opacity-20 rounded': active,
      'hover:text-primary-600': !active
    }"
    @click="handleClickEvent"
  >
    {{ item }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    active: {
      type: Boolean,
      default: false
    },

    item: {
      type: String,
      required: true
    }
  },

  methods: {
    handleClickEvent() {
      const { item } = this

      this.$emit('click', item)
    }
  }
})
</script>
