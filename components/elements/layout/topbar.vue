<template>
  <div class="h-16 bg-black w-full border-b border-primary-500">
    <div class="container mx-auto h-full">
      <div class="flex justify-between items-center h-full">
        <!-- left panel -->
        <div>
          <TGLogo />
        </div>

        <!-- right panel -->
        <div class="h-full hidden sm:block">
          <div
            class="
              bg-primary-500
              transform
              -skew-x-45
              h-full
              cursor-pointer
              group
              hover:bg-transparent
              hover:text-primary-500
              hover:border-l
              hover:border-r
              hover:border-primary-500
            "
          >
            <div
              class="flex items-center h-full px-8 transform skew-x-45"
              @click="handleConnectClick"
            >
              <v-icon-chain class="w-6 h-6 pr-2" />
              <div class="font-bold uppercase">
                {{ $t('wallet.connectWallet') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <connect-wallet-modal />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TGLogo from '~/components/svg/tg-logo.vue'
import { Modal } from '~/types/enums'
import ConnectWalletModal from '~/components/partials/modal/connect-wallet.vue'

export default Vue.extend({
  components: {
    ConnectWalletModal,
    TGLogo,
  },

  mounted() {
    this.$accessor.modal.openModal(Modal.ConnectWallet)
  },

  methods: {
    handleConnectClick() {
      this.$accessor.modal.openModal(Modal.ConnectWallet)
    },
  },
})
</script>
