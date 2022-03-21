<template>
  <div class="flex items-start justify-between">
    <span class="text-sm font-bold uppercase tracking-widest mt-1">
      {{ $t('guild.guildMaster') }}
    </span>

    <div>
      <a
        v-if="isInjectiveAddress"
        :href="guildMasterExplorerUrl"
        target="_blank"
      >
        <div class="flex items-center">
          <span class="text-lg font-bold">
            {{ formattedInjectiveAddress }}
          </span>
          <v-icon-arrow class="h-5 w-5 transform rotate-135 ml-2" />
        </div>
      </a>

      <span v-else class="text-lg font-bold">
        {{ formattedAddress }}
      </span>

      <div class="flex items-center justify-end mt-2">
        <span class="mr-2 cursor-pointer" @click="handleClickOnSwitchIcon">
          <v-icon-ethereum
            v-if="isInjectiveAddress"
            class="w-6 h-6 hover:text-primary-600"
          />
          <v-icon-injective v-else class="w-5 h-5 hover:text-primary-600" />
        </span>
        <span
          v-clipboard="() => (isInjectiveAddress ? injectiveAddress : address)"
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
</template>

<script lang="ts">
import Vue from 'vue'
import { formatWalletAddress } from '@injectivelabs/utils'
import {
  getExplorerUrl,
  getAddressFromInjectiveAddress
} from '@injectivelabs/ui-common'
import { guildMaster as mockGuildMaster } from '~/app/data/mock'
import { NETWORK } from '~/app/utils/constants'
import VIconEthereum from '~/components/icons/ethereum.vue'
import VIconInjective from '~/components/icons/injective.vue'

export default Vue.extend({
  components: {
    VIconEthereum,
    VIconInjective
  },

  data() {
    return {
      isInjectiveAddress: true,
      guildMaster: mockGuildMaster
    }
  },

  computed: {
    guildMasterExplorerUrl(): string {
      const { guildMaster } = this

      return `${getExplorerUrl(NETWORK)}/account/${guildMaster.address}`
    },

    injectiveAddress(): string {
      const { guildMaster } = this

      if (!guildMaster.address) {
        return ''
      }

      return guildMaster.address
    },

    address(): string {
      const { guildMaster } = this

      if (!guildMaster.address) {
        return ''
      }

      return getAddressFromInjectiveAddress(guildMaster.address)
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
    handleClickOnSwitchIcon() {
      this.isInjectiveAddress = !this.isInjectiveAddress
    }
  }
})
</script>
