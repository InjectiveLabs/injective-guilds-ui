<template>
  <span
    class="
      cursor-pointer
      text-white
      hover:text-primary-500
      py-2
      px-4
      flex
      h-full
      flex-col flex-wrap
      justify-center
      items-center
    "
    @click="handleClick"
    >{{ feature }}</span
  >
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    feature: {
      type: String,
      required: true,
    },
  },

  methods: {
    handleClick() {
      const { feature } = this
      this.$emit('click', feature)
    },
  },
})
</script>
