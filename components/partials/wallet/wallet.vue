<template>
  <div>
    <div
      class="
        transform
        xs:-skew-x-45
        h-full
        cursor-pointer
        group
        hover:border-l hover:border-r
      "
      :class="[
        isUserConnectedProcessCompleted && isUserWalletConnected
          ? 'border-primary-500 border-l border-r text-primary-500 bg-black hover:text-black hover:border-black hover:bg-primary-500'
          : 'bg-primary-500 hover:text-primary-500 hover:border-primary-500 hover:bg-transparent '
      ]"
    >
      <div class="h-full px-4 xs:px-8 transform xs:skew-x-45">
        <nuxt-link
          v-if="isUserConnectedProcessCompleted && isUserWalletConnected"
          class="flex items-center"
          :to="{ name: 'my-guild' }"
        >
          <div class="flex items-center">
            <v-icon-person class="mr-2" />
            <span class="font-bold uppercase mr-4">{{ $t('myGuild') }}</span>
            <span>{{ formattedAddress }}</span>
          </div>
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
    <connect-wallet-modal />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { formatWalletAddress } from '@injectivelabs/utils'
import ConnectWalletModal from '~/components/partials/modal/connect-wallet.vue'

export default Vue.extend({
  components: {
    ConnectWalletModal
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
    }
  }
})
</script>
