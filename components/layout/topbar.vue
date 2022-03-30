<template>
  <div
    class="h-16 bg-black w-full border-b border-primary-500 overflow-x-hidden flex"
  >
    <button
      class="px-4 border-r border-primary-500 text-white md:hidden hover:text-primary-500"
      @click.stop="handleClickOnSidebarToggle"
    >
      <span class="sr-only">{{ $t('common.open') }}</span>
      <v-icon-menu class="w-6 h-6" />
    </button>
    <div class="xs:container h-full ml-auto md:mx-auto">
      <div class="flex justify-between items-center h-full">
        <!-- left panel -->
        <div class="flex gap-14">
          <nuxt-link class="hidden md:block" :to="{ name: 'index' }">
            <TGLogo />
          </nuxt-link>
          <nuxt-link
            :to="{ name: 'leaderboard' }"
            class="hidden md:flex items-center"
          >
            <span class="text-lg text-primary-500 uppercase font-bold">{{
              $t('leaderboard.leaderboard')
            }}</span>
          </nuxt-link>
        </div>
        <!-- right panel -->
        <v-wallet class="h-full" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TGLogo from '~/components/svg/tg-logo.vue'
import VWallet from '~/components/partials/wallet/wallet.vue'

export default Vue.extend({
  components: {
    TGLogo,
    VWallet
  },

  methods: {
    handleClickOnSidebarToggle() {
      this.$emit('sidebar-opened')
    }
  }
})
</script>
