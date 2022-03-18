<template>
  <div
    class="h-16 bg-black w-full border-b border-primary-500 overflow-x-hidden"
  >
    <div class="xs:container mx-auto h-full pl-4 xs:pl-0">
      <div class="flex justify-between items-center h-full">
        <!-- left panel -->
        <nuxt-link :to="{ name: 'index' }">
          <TGLogo />
        </nuxt-link>

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
