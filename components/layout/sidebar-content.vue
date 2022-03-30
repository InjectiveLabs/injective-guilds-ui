<template>
  <div class="flex flex-col gap-4">
    <nuxt-link
      class="px-8"
      :to="{ name: 'index' }"
      @click.native="handleClickEvent"
    >
      <TGLogo />
    </nuxt-link>
    <nav>
      <nuxt-link
        :to="{ name: 'index' }"
        class="text-white hover:bg-gray-900 border-l-4 border-transparent hover:text-primary-500 flex items-center px-8 tracking-widest py-4 uppercase text-xs"
        @click.native="handleClickEvent"
      >
        <span class="text-lg uppercase">
          {{ $t('common.home') }}
        </span>
      </nuxt-link>

      <nuxt-link
        :to="{ name: 'leaderboard' }"
        class="text-white hover:bg-gray-900 border-l-4 border-transparent hover:text-primary-500 flex items-center px-8 tracking-widest py-4 uppercase text-xs"
        @click.native="handleClickEvent"
      >
        <span class="text-lg uppercase">
          {{ $t('leaderboard.leaderboard') }}
        </span>
      </nuxt-link>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TGLogo from '~/components/svg/tg-logo.vue'

export default Vue.extend({
  components: {
    TGLogo
  },

  methods: {
    handleClickEvent() {
      this.$root.$emit('nav-link-clicked')
    }
  }
})
</script>
