<template>
  <div class="py-6 px-4 bg-white bg-opacity-10">
    <div class="tracking-wider text-sm">
      <div class="flex items-center">
        <v-icon-info-tooltip
          class="mr-2"
          :tooltip="$t('subaccount.balance.tooltip')"
        />
        <span>{{ $t('subaccount.balance.title') }}</span>

        <div class="ml-3">
          <span
            v-if="fetchBalanceStatus.isLoading()"
            class="primary spinner spinner-sm"
          />
          <v-icon-rotate
            v-else
            class="w-4 h-4 cursor-pointer text-primary-500"
            @click.native="fetchSubaccountBalances"
          />
        </div>
      </div>
    </div>
    <h3 class="text-2xl tracking-wider text-right mt-3">
      ${{ totalAvailableBalanceInUsdToFormat }}
    </h3>
    <div v-if="sortedSubaccountAvailableBalancesInUsd.length > 0" class="mt-3">
      <v-subaccount-balance-item
        v-for="(balance, index) in paginatedSubaccountAvailableBalancesInUsd"
        :key="`subaccount-available-balance-item-${index}`"
        :balance="balance"
        :class="{ 'mt-3': index !== 0 }"
      />
      <p
        v-if="limit < sortedSubaccountAvailableBalancesInUsd.length"
        class="text-gray-400 hover:text-primary-500 cursor-pointer mt-3"
        @click="handleShowMoreTokens"
      >
        +{{ sortedSubaccountAvailableBalancesInUsd.length - limit }}
        {{ $t('subaccount.balance.moreTokens') }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  BigNumberInBase,
  BigNumberInWei,
  Status,
  StatusType
} from '@injectivelabs/utils'
import {
  INJ_DENOM,
  SubaccountBalanceWithTokenAndUsdPriceAndUsdBalance,
  ZERO_IN_BASE
} from '@injectivelabs/ui-common'
import VSubaccountBalanceItem from './subaccount-balance-item.vue'
import {
  AssetTokenWithAvailableBalanceInUsd,
  BankBalanceWithTokenAndUsdPrice
} from '~/types'
import { UI_DEFAULT_FIAT_DECIMALS } from '~/app/utils/constants'

export default Vue.extend({
  components: {
    VSubaccountBalanceItem
  },

  data() {
    return {
      limit: 3,
      perPage: 3,
      fetchBalanceStatus: new Status(StatusType.Idle)
    }
  },

  computed: {
    bankBalancesWithTokenAndUsdPrice(): BankBalanceWithTokenAndUsdPrice[] {
      return this.$accessor.bank.bankBalancesWithTokenAndUsdPrice
    },

    subaccountBalancesWithTokenAndPrice(): SubaccountBalanceWithTokenAndUsdPriceAndUsdBalance[] {
      return this.$accessor.account.subaccountBalancesWithTokenAndPrice
    },

    injBankAvailableBalanceInUsd():
      | AssetTokenWithAvailableBalanceInUsd
      | undefined {
      const { bankBalancesWithTokenAndUsdPrice } = this

      const injToken = bankBalancesWithTokenAndUsdPrice.find(
        ({ denom }) => denom.toLowerCase() === INJ_DENOM
      )

      if (!injToken) {
        return
      }

      const availableTokenBalanceInBase = new BigNumberInWei(
        injToken.balance
      ).toBase(injToken.token.decimals)
      const availableBalanceInUsd = availableTokenBalanceInBase.multipliedBy(
        injToken.token.usdPrice
      )

      return {
        token: injToken.token,
        availableTokenBalanceInBase,
        availableBalanceInUsd
      }
    },

    subaccountAvailableBalancesInUsd(): AssetTokenWithAvailableBalanceInUsd[] {
      const { subaccountBalancesWithTokenAndPrice } = this

      return subaccountBalancesWithTokenAndPrice.map((balance) => {
        const availableTokenBalanceInBase = new BigNumberInWei(
          balance.availableBalance
        ).toBase(balance.token.decimals)
        const availableBalanceInUsd = availableTokenBalanceInBase.multipliedBy(
          balance.token.usdPrice
        )

        return {
          token: balance.token,
          availableTokenBalanceInBase,
          availableBalanceInUsd
        }
      })
    },

    subaccountAvailableBalancesWithBankInjBalance(): AssetTokenWithAvailableBalanceInUsd[] {
      const { injBankAvailableBalanceInUsd, subaccountAvailableBalancesInUsd } =
        this

      if (!injBankAvailableBalanceInUsd) {
        return subaccountAvailableBalancesInUsd
      }

      const subaccountInjBalance = subaccountAvailableBalancesInUsd.find(
        ({ token }) => token.denom === INJ_DENOM
      )

      if (!subaccountInjBalance) {
        return [
          injBankAvailableBalanceInUsd,
          ...subaccountAvailableBalancesInUsd
        ]
      }

      return subaccountAvailableBalancesInUsd.map((balance) => {
        if (balance.token.denom !== INJ_DENOM) {
          return balance
        }

        return {
          ...balance,
          availableTokenBalanceInBase: balance.availableTokenBalanceInBase.plus(
            injBankAvailableBalanceInUsd.availableTokenBalanceInBase
          ),
          availableBalanceInUsd: balance.availableBalanceInUsd.plus(
            injBankAvailableBalanceInUsd.availableBalanceInUsd
          )
        }
      })
    },

    sortedSubaccountAvailableBalancesInUsd(): AssetTokenWithAvailableBalanceInUsd[] {
      const { subaccountAvailableBalancesWithBankInjBalance } = this

      return subaccountAvailableBalancesWithBankInjBalance
        .filter((balance) => balance.availableTokenBalanceInBase.gt('0'))
        .sort(
          (
            b1: AssetTokenWithAvailableBalanceInUsd,
            b2: AssetTokenWithAvailableBalanceInUsd
          ) =>
            b2.availableTokenBalanceInBase
              .minus(b1.availableTokenBalanceInBase)
              .toNumber()
        )
    },

    paginatedSubaccountAvailableBalancesInUsd(): AssetTokenWithAvailableBalanceInUsd[] {
      const { sortedSubaccountAvailableBalancesInUsd, limit } = this

      return sortedSubaccountAvailableBalancesInUsd.slice(0, limit)
    },

    totalAvailableBalanceInUsd(): BigNumberInBase {
      const { sortedSubaccountAvailableBalancesInUsd } = this

      return sortedSubaccountAvailableBalancesInUsd.reduce(
        (total, balance: AssetTokenWithAvailableBalanceInUsd) =>
          total.plus(balance.availableBalanceInUsd),
        ZERO_IN_BASE
      )
    },

    totalAvailableBalanceInUsdToFormat(): string {
      const { totalAvailableBalanceInUsd } = this

      return totalAvailableBalanceInUsd.toFormat(UI_DEFAULT_FIAT_DECIMALS)
    }
  },

  methods: {
    fetchSubaccountBalances() {
      this.fetchBalanceStatus.setLoading()

      Promise.all([this.$accessor.account.fetchSubaccountsBalancesWithPrices()])
        .then(() => {})
        .catch(this.$onError)
        .finally(() => {
          this.fetchBalanceStatus.setIdle()
        })
    },

    handleShowMoreTokens() {
      const { limit, perPage, sortedSubaccountAvailableBalancesInUsd } = this

      if (limit + perPage >= sortedSubaccountAvailableBalancesInUsd.length) {
        this.limit = sortedSubaccountAvailableBalancesInUsd.length
      } else {
        this.limit = limit + perPage
      }
    }
  }
})
</script>
