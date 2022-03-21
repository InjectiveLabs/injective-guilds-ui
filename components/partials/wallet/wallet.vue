<template>
  <div>
    <div
      id="wallet-address"
      class="transform xs:-skew-x-45 h-full cursor-pointer group hover:border-l hover:border-r"
      :class="[
        isUserConnectedProcessCompleted && isUserWalletConnected
          ? 'border-primary-500 border-l border-r text-primary-500 bg-black hover:text-black hover:border-black hover:bg-primary-500'
          : 'bg-primary-500 hover:text-primary-500 hover:border-primary-500 hover:bg-transparent '
      ]"
      @mouseenter="handleShowDropdown"
      @mouseleave="handleHideDropdown"
      @focus="handleShowDropdown"
      @blur="handleHideDropdown"
    >
      <div class="h-full px-4 xs:px-8 transform xs:skew-x-45">
        <nuxt-link
          v-if="isUserConnectedProcessCompleted && isUserWalletConnected"
          class="flex items-center h-full"
          :to="{ name: 'my-guild' }"
        >
          <v-icon-person class="mr-2" />
          <span class="font-bold uppercase mr-4">
            {{ $t('myGuild.title') }}
          </span>
          <span>{{ formattedAddress }}</span>
        </nuxt-link>

        <div
          v-else
          class="flex items-center h-full"
          @click="handleConnectClick"
        >
          <v-icon-chain class="w-6 h-6 pr-2" />
          <div class="font-bold uppercase">
            {{ $t('connect.connectWallet') }}
          </div>
        </div>
      </div>
    </div>
    <v-modal-connect-wallet />
    <v-wallet-dropdown
      ref="popper-wallet-dropdown"
      @logout="handleHideDropdown"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { formatWalletAddress } from '@injectivelabs/utils'
import VModalConnectWallet from '~/components/partials/modal/connect-wallet.vue'
import VWalletDropdown from '~/components/partials/wallet/dropdown.vue'

export default Vue.extend({
  components: {
    VModalConnectWallet,
    VWalletDropdown
  },

  data() {
    return {
      isUserConnectedProcessCompleted: false
    }
  },

  computed: {
    isUserWalletConnected(): boolean {
      return this.$accessor.wallet.isUserWalletConnected
    },

    injectiveAddress(): string {
      return this.$accessor.wallet.injectiveAddress
    },

    formattedAddress(): string {
      const { injectiveAddress } = this

      return formatWalletAddress(injectiveAddress)
    },

    $popper(): any {
      return this.$refs['popper-wallet-dropdown']
    }
  },

  watch: {
    isUserWalletConnected(newIsUserWalletConnected) {
      if (!newIsUserWalletConnected) {
        this.isUserConnectedProcessCompleted = false
      }
    }
  },

  mounted() {
    this.$root.$on('wallet-connected', this.handleConnectedWallet)

    if (this.isUserWalletConnected) {
      this.isUserConnectedProcessCompleted = true
    }
  },

  beforeDestroy() {
    this.$root.$off('wallet-connected', this.handleConnectedWallet)
  },

  methods: {
    handleConnectedWallet() {
      this.isUserConnectedProcessCompleted = true
    },

    handleConnectClick() {
      this.$root.$emit('connect-wallet-clicked')
    },

    handleShowDropdown() {
      const { isUserWalletConnected, $popper } = this

      if (isUserWalletConnected && $popper && $popper.$refs.popper) {
        $popper.$refs.popper.showDropdown()
      }
    },

    handleHideDropdown() {
      const { $popper } = this

      if ($popper && $popper.$refs.popper) {
        $popper.$refs.popper.hideDropdown()
      }
    }
  }
})
</script>
