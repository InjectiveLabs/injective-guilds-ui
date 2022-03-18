<template>
  <v-modal
    :is-open="isOpenConnectModal"
    md
    :title="title"
    @modal-closed="handleModalClosed"
  >
    <VHOCLoading :status="status" :class="{ 'py-4': status.isLoading() }">
      <!-- wallet selection -->
      <section v-if="!showLedger">
        <div class="grid grid-cols-1 xs:grid-cols-2">
          <v-wallet-item
            :wallet="Wallet.Metamask"
            @click="handleWalletItemClick"
          >
            <v-metamask-logo slot="logo" class="h-8 w-8 mr-4" />
            <div slot="description">
              <p class="text-xl font-bold">{{ $t('connect.metamask') }}</p>
              <div class="text-xs cursor-pointer">
                <div
                  v-if="!metamaskInstalled"
                  class="flex items-center font-semibold"
                >
                  <a
                    href="https://metamask.io/download"
                    target="_blank"
                    class="text-xs capitalize"
                    rel="noreferrer"
                  >
                    {{ $t('connect.download') }}
                  </a>
                  <v-icon-arrow class="transform rotate-180 w-3 h-3 ml-1" />
                </div>
                <p v-else class="text-sm">
                  {{ $t('connect.connectUsingBrowser') }}
                </p>
              </div>
            </div>
          </v-wallet-item>

          <v-wallet-item
            :wallet="Wallet.Ledger"
            class="xs:border-l-0"
            @click="handleWalletItemClick"
          >
            <v-ledger-logo slot="logo" class="h-8 w-8 mr-4" />
            <div slot="description">
              <p class="text-xl font-bold">{{ $t('ledger.ledger') }}</p>
              <p class="text-sm">{{ $t('connect.connectUsingHardware') }}</p>
            </div>
          </v-wallet-item>
        </div>
        <p class="text-xs mt-4">{{ $t('connect.trezorConnectionNote') }}</p>
      </section>
      <v-ledger-section v-else @connected="handleModalClosed" />
    </VHOCLoading>
  </v-modal>
</template>

<script lang="ts">
import Vue from 'vue'
import { Status, StatusType } from '@injectivelabs/utils'
import { Wallet } from '@injectivelabs/web3-strategy'
import VWalletItem from '~/components/partials/wallet/wallet-item.vue'
import VModal from '~/components/partials/modal/modal.vue'
import VMetamaskLogo from '~/components/icons/metamask.vue'
import VLedgerLogo from '~/components/icons/ledger.vue'
import VLedgerSection from '~/components/partials/wallet/ledger-section.vue'
import { WalletConnectStatus } from '~/types'

export default Vue.extend({
  components: {
    VMetamaskLogo,
    VLedgerLogo,
    VLedgerSection,
    VModal,
    VWalletItem
  },

  data() {
    return {
      Wallet,
      status: new Status(StatusType.Idle),
      isOpenConnectModal: false,
      showLedger: false
    }
  },

  computed: {
    metamaskInstalled(): boolean {
      return this.$accessor.wallet.metamaskInstalled
    },

    walletConnectStatus(): WalletConnectStatus {
      return this.$accessor.wallet.walletConnectStatus
    },

    title(): string {
      const { showLedger } = this

      return showLedger
        ? this.$t('ledger.connectUsingLedger')
        : this.$t('connect.connectWallet')
    }
  },

  watch: {
    walletConnectStatus(newWalletConnectStatus: WalletConnectStatus) {
      if (newWalletConnectStatus === WalletConnectStatus.connecting) {
        this.handleConnectingWallet()
      }

      if (newWalletConnectStatus === WalletConnectStatus.disconnected) {
        this.handleDisconnectedWallet()
      }

      if (
        [WalletConnectStatus.connected, WalletConnectStatus.idle].includes(
          newWalletConnectStatus
        )
      ) {
        this.handleConnectedWallet()
      }
    }
  },

  mounted() {
    this.$root.$on('connect-wallet-clicked', this.handleWalletConnectClicked)

    Promise.all([this.$accessor.wallet.isMetamaskInstalled()])
      .then(() => {
        //
      })
      .catch(this.$onError)
  },

  beforeDestroy() {
    this.$root.$off('connect-wallet-clicked', this.handleWalletConnectClicked)
  },

  methods: {
    handleConnectingWallet() {
      this.status.setLoading()
    },

    handleWalletConnectClicked() {
      this.showLedger = false
      this.isOpenConnectModal = true
    },

    handleModalClosed() {
      this.isOpenConnectModal = false
    },

    handleConnectedWallet() {
      this.$toast.success(this.$t('connect.successfullyConnected'))
      this.$root.$emit('wallet-connected')
      this.handleModalClosed()
      this.status.setIdle()
    },

    handleDisconnectedWallet() {
      this.status.setIdle()
    },

    connectMetamask() {
      this.$accessor.wallet
        .connectMetamask()
        .then(() => {})
        .catch((e: any) => {
          this.$accessor.wallet.setWalletConnectStatus(
            WalletConnectStatus.disconnected
          )
          this.$onError(e)
        })
    },

    handleWalletItemClick(wallet: Wallet) {
      if (wallet === Wallet.Ledger) {
        this.showLedger = true
      }

      if (wallet === Wallet.Metamask) {
        this.connectMetamask()
      }
    }
  }
})
</script>
