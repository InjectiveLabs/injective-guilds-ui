<template>
  <VPopperBox
    ref="popper"
    class="popper bg-black border border-primary-500 flex-col flex-wrap absolute z-60 shadow-md w-[294px]"
    :class="[isUserWalletConnected ? 'flex' : 'hidden']"
    binding-element="#wallet-address"
    :options="popperOption"
  >
    <div class="text-primary-500">
      <div
        class="flex items-center justify-between text-sm uppercase px-4 mt-4"
      >
        <span class="uppercase bold">{{ $t('connect.myAccount') }}</span>

        <span
          class="text-sm text-accent-500 cursor-pointer hover:text-accent-600"
          @click="handleClickOnLogout"
        >
          {{ $t('connect.logout') }}
        </span>
      </div>
      <div class="mt-4 mb-4 flex items-center px-4">
        <div
          :class="{
            'h-12 w-12 flex items-center justify-center bg-opacity-20 mr-4 min-w-12 rounded-full bg-primary-500':
              !isInjectiveAddress
          }"
        >
          <v-logo-mini
            v-if="isInjectiveAddress"
            class="min-w-12 w-12 h-12 mr-4"
          />
          <v-metamask-logo
            v-else-if="wallet === Wallet.Metamask"
            class="h-8 w-8"
          />
          <v-ledger-logo v-else class="h-8 w-8" />
        </div>

        <div class="w-full">
          <div class="flex items-center justify-between">
            <span>
              {{
                isInjectiveAddress
                  ? formattedInjectiveAddress
                  : formattedAddress
              }}
            </span>

            <div class="flex items-center">
              <span
                class="mr-2 cursor-pointer"
                @click="handleClickOnSwitchIcon"
              >
                <v-icon-ethereum
                  v-if="isInjectiveAddress"
                  class="w-6 h-6 hover:text-primary-600"
                />
                <v-icon-injective
                  v-else
                  class="w-5 h-5 hover:text-primary-600"
                />
              </span>

              <span
                v-clipboard="
                  () =>
                    isInjectiveAddress
                      ? formattedInjectiveAddress
                      : formattedAddress
                "
                v-clipboard:success="
                  () => $toast.success($t('connect.copiedAddress'))
                "
                class="cursor-pointer hover:text-primary-600"
              >
                <v-icon-copy class="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <v-subaccount-balance />

      <div class="p-4 border-t border-primary-500">
        <nuxt-link
          :to="{ name: 'my-guild' }"
          class="uppercase tracking-wider hover:text-primary-600"
          @click.native="hideDropdown"
        >
          {{ $t('myGuild.title') }}
        </nuxt-link>
      </div>
    </div>
  </VPopperBox>
</template>

<script lang="ts">
import Vue from 'vue'
import { formatWalletAddress } from '@injectivelabs/utils'
import { Wallet } from '@injectivelabs/web3-strategy'
import VSubaccountBalance from './subaccount-balance.vue'
import VPopperBox from '~/components/elements/popper-box.vue'
import VIconEthereum from '~/components/icons/ethereum.vue'
import VIconInjective from '~/components/icons/injective.vue'
import VLedgerLogo from '~/components/icons/ledger.vue'
import VLogoMini from '~/components/svg/logo-mini.vue'
import VMetamaskLogo from '~/components/icons/metamask.vue'

export default Vue.extend({
  components: {
    VIconEthereum,
    VIconInjective,
    VLedgerLogo,
    VLogoMini,
    VMetamaskLogo,
    VSubaccountBalance,
    VPopperBox
  },

  data() {
    return {
      Wallet,
      isInjectiveAddress: true,
      popperOption: {
        placement: 'bottom-start',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 0]
            }
          }
        ]
      }
    }
  },

  computed: {
    isUserWalletConnected(): boolean {
      return this.$accessor.wallet.isUserWalletConnected
    },

    wallet(): Wallet {
      return this.$accessor.wallet.wallet
    },

    address(): string {
      return this.$accessor.wallet.address
    },

    injectiveAddress(): string {
      return this.$accessor.wallet.injectiveAddress
    },

    formattedAddress(): string {
      const { address } = this

      return formatWalletAddress(address)
    },

    formattedInjectiveAddress(): string {
      const { injectiveAddress } = this

      return formatWalletAddress(injectiveAddress)
    }
  },

  methods: {
    hideDropdown() {
      this.$emit('hide')
    },

    handleClickOnSwitchIcon() {
      this.isInjectiveAddress = !this.isInjectiveAddress
    },

    handleClickOnLogout() {
      this.$emit('hide')
      this.$nextTick(() => {
        this.$accessor.wallet.logout()
      })

      if (['my-guild'].includes(this.$route.name as string)) {
        this.$router.push({ name: 'index' })
      }
    }
  }
})
</script>
