<template>
  <div>
    <div class="flex flex-wrap gap-4 mb-6 lg:min-h-8">
      <div
        v-for="(market, index) in guild.markets"
        :key="`guild-card-market-${index}`"
        class="flex items-center"
      >
        <img
          :src="`${market.token.logo}`"
          :alt="market.token.name"
          class="w-8 h-8"
        />

        <span class="text-sm ml-3">{{ market.ticker }}</span>
      </div>
    </div>

    <div class="flex items-start">
      <v-button v-if="!isUserWalletConnected" @click="handleConnectClick">
        {{ $t('connect.connect') }}
      </v-button>

      <v-button
        v-else-if="isPartOfGuild"
        accent
        :disabled="isDefaultMember"
        :outline="!banner"
        @click="handleLeaveGuildClick"
      >
        {{ $t('guildCard.leave') }}
      </v-button>

      <v-button v-else-if="isMaxCapacity" disabled>
        {{ $t('guildCard.maxCapacity') }}
      </v-button>

      <v-button v-else-if="insufficientBalance" class="h-10" disabled>
        <div class="leading-4">
          {{ $t('guildCard.insufficientBalance') }}
        </div>
      </v-button>

      <v-button
        v-else
        :disabled="member !== undefined"
        @click="handleJoinGuildClick"
      >
        {{ $t('guildCard.joinNow') }}
      </v-button>

      <div
        v-if="!isMaxCapacity && !isPartOfGuild && isUserWalletConnected"
        class="text-sm ml-4"
      >
        <p>{{ $t('guildCard.requirement') }}:</p>
        <div class="grid xs:grid-cols-2 xs:min-w-[220px]">
          <span
            v-for="(
              requirement, index
            ) in outstandingRequirementsMinusBankBalances"
            :key="`guild-requirement-${index}`"
            class="flex items-center mr-1"
            :class="{
              'text-primary-600': requirement.outstandingAmountInBase.gt(0)
            }"
          >
            <span>
              {{ requirement.minAmount }} {{ requirement.token.symbol }}
            </span>

            <v-icon-check
              v-if="requirement.outstandingAmountInBase.lte(0)"
              class="w-3 h-3 ml-1"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import {
  BankBalances,
  UiSubaccountBalance,
  ZERO_IN_BASE
} from '@injectivelabs/ui-common'
import {
  BigNumber,
  BigNumberInBase,
  BigNumberInWei
} from '@injectivelabs/utils'
import { Modal, UiGuildWithMeta, UiGuildRequirement, UiMember } from '~/types'

export default Vue.extend({
  components: {
    //
  },

  props: {
    guild: {
      type: Object as PropType<UiGuildWithMeta>,
      required: true
    },

    banner: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isUserWalletConnected(): boolean {
      return this.$accessor.wallet.isUserWalletConnected
    },

    injectiveAddress(): string {
      return this.$accessor.wallet.injectiveAddress
    },

    member(): UiMember | undefined {
      return this.$accessor.member.member
    },

    subaccountBalances(): UiSubaccountBalance[] {
      return this.$accessor.account.subaccountBalances
    },

    bankBalances(): BankBalances {
      return this.$accessor.bank.bankBalances
    },

    outstandingRequirementsMinusSubaccountAvailableBalances(): UiGuildRequirement[] {
      const { guild, subaccountBalances } = this

      return guild.requirements.map((requirement) => {
        const subaccountBalance = subaccountBalances.find(
          ({ denom }) => denom === requirement.denom
        )

        const availableBalance = subaccountBalance
          ? new BigNumberInWei(subaccountBalance.availableBalance).toBase(
              requirement.token.decimals
            )
          : ZERO_IN_BASE

        const outstandingAmountAfterDeductingAvailableBalance =
          new BigNumberInBase(requirement.outstandingAmountInBase).minus(
            availableBalance
          )

        const outstandingAmountInBase = new BigNumberInBase(
          BigNumber.max(
            outstandingAmountAfterDeductingAvailableBalance,
            ZERO_IN_BASE
          )
        )

        return {
          ...requirement,
          outstandingAmountInBase
        }
      })
    },

    outstandingRequirementsMinusBankBalances(): UiGuildRequirement[] {
      const {
        bankBalances,
        outstandingRequirementsMinusSubaccountAvailableBalances
      } = this

      return outstandingRequirementsMinusSubaccountAvailableBalances.map(
        (requirement) => {
          const bankBalance = bankBalances[requirement.denom]
          const bankBalanceInBase = bankBalance
            ? new BigNumberInWei(bankBalance).toBase(requirement.token.decimals)
            : ZERO_IN_BASE

          const outstandingAmountAfterDeductingBankBalance =
            new BigNumberInBase(requirement.outstandingAmountInBase).minus(
              bankBalanceInBase
            )
          const outstandingAmountInBase = new BigNumberInBase(
            BigNumber.max(
              outstandingAmountAfterDeductingBankBalance,
              ZERO_IN_BASE
            )
          )

          return {
            ...requirement,
            outstandingAmountInBase
          }
        }
      )
    },

    isPartOfGuild(): boolean {
      const { guild, member } = this

      if (!guild || !member) {
        return false
      }

      return guild.id === member.guildId
    },

    isMaxCapacity(): boolean {
      const { guild } = this

      return guild.memberCount >= guild.capacity
    },

    insufficientBalance(): boolean {
      const { outstandingRequirementsMinusBankBalances } = this

      return (
        outstandingRequirementsMinusBankBalances.find(
          ({ outstandingAmountInBase }) => outstandingAmountInBase.gt('0')
        ) !== undefined
      )
    },

    isDefaultMember(): boolean {
      const { injectiveAddress, guild } = this

      if (!guild || !injectiveAddress) {
        return false
      }

      return guild.defaultMemberAddress === injectiveAddress
    }
  },

  methods: {
    handleJoinGuildClick() {
      const { guild, outstandingRequirementsMinusSubaccountAvailableBalances } =
        this

      this.$accessor.guild.setCurrentGuildToJoin({
        guild,
        requirements: outstandingRequirementsMinusSubaccountAvailableBalances
      })
      this.$accessor.modal.openModal(Modal.JoinGuild)
    },

    handleLeaveGuildClick() {
      const { guild } = this

      this.$accessor.guild.setCurrentGuildToLeave(guild)
      this.$accessor.modal.openModal(Modal.LeaveGuild)
    },

    handleConnectClick() {
      this.$root.$emit('connect-wallet-clicked')
    }
  }
})
</script>
