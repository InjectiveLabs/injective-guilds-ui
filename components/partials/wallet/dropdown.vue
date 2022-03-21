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
      <div class="mt-4 flex items-center px-4">
        <div
          class="h-12 w-12 flex items-center justify-center rounded-full bg-primary-500 bg-opacity-20 mr-4 min-w-12"
        >
          <v-metamask-logo v-if="wallet === Wallet.Metamask" class="h-8 w-8" />
          <v-ledger-logo v-else class="h-8 w-8" />
        </div>
        <div class="w-full">
          <div class="flex items-center justify-between">
            <span>{{ formattedAddress }}</span>
            <span
              v-clipboard="() => address"
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
      <div class="my-4 flex items-center px-4">
        <v-logo-mini class="min-w-12 w-12 h-12 mr-4" />
        <div class="w-full">
          <div class="flex items-center justify-between">
            <span>{{ formattedInjectiveAddress }}</span>
            <span
              v-clipboard="() => injectiveAddress"
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
      <div class="p-4 border-t border-primary-500">
        <nuxt-link
          :to="{ name: 'my-guild' }"
          class="uppercase font-bold tracking-wider"
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
import VPopperBox from '~/components/elements/popper-box.vue'
import VMetamaskLogo from '~/components/icons/metamask.vue'
import VLedgerLogo from '~/components/icons/ledger.vue'
import VLogoMini from '~/components/svg/logo-mini.vue'

export default Vue.extend({
  components: {
    VLogoMini,
    VMetamaskLogo,
    VLedgerLogo,
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
    handleClickOnLogout() {
      this.$emit('logout')
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
