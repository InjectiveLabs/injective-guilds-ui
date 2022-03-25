<template>
  <v-card v-if="guild" square>
    <div class="flex items-start justify-between">
      <span class="text-sm font-bold uppercase tracking-widest mt-1">
        {{ $t('guild.guildMaster') }}
      </span>

      <div>
        <a v-if="isInjectiveAddress" :href="explorerUrl" target="_blank">
          <div class="flex items-center">
            <span class="text-lg font-bold leading-6">
              {{ formattedInjectiveAddress }}
            </span>
            <v-icon-arrow class="h-3 w-3 ml-2" />
          </div>
        </a>

        <span v-else class="text-lg font-bold leading-6">
          {{ formattedAddress }}
        </span>

        <div class="flex items-center justify-end mt-2 max-h-[20px]">
          <span class="mr-2 cursor-pointer" @click="handleClickOnSwitchIcon">
            <v-icon-ethereum
              v-if="isInjectiveAddress"
              class="w-6 h-6 hover:text-primary-600"
            />
            <v-icon-injective v-else class="w-5 h-5 hover:text-primary-600" />
          </span>
          <span
            v-clipboard="
              () => (isInjectiveAddress ? injectiveAddress : address)
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
  </v-card>
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
import { UiGuild } from '~/types'

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
    guild(): UiGuild | undefined {
      return this.$accessor.guild.guild
    },

    injectiveAddress(): string {
      const { guild } = this

      if (!guild) {
        return ''
      }

      return guild.masterAddress
    },

    explorerUrl(): string {
      const { guildMaster } = this

      return `${getExplorerUrl(NETWORK)}/account/${guildMaster.address}`
    },

    address(): string {
      const { injectiveAddress } = this

      return getAddressFromInjectiveAddress(injectiveAddress)
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
