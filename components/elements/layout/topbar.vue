<template>
  <div
    class="h-16 bg-black w-full border-b border-primary-500 overflow-x-hidden"
  >
    <div class="xs:container h-full">
      <div class="flex justify-between items-center h-full">
        <!-- left panel -->
        <div class="flex gap-14">
          <nuxt-link :to="{ name: 'index' }">
            <TGLogo />
          </nuxt-link>
          <nuxt-link :to="{ name: 'leaderboard' }" class="flex items-center">
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
  }
})
</script>
