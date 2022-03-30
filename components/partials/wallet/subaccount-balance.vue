<template>
  <div class="py-6 px-4 bg-white bg-opacity-10">
    <div class="tracking-wider text-sm">
      <div class="flex items-center">
        <span>{{ $t('subaccount.balance.title') }}</span>
        <div class="ml-2">
          <span
            v-if="fetchBalanceStatus.isLoading()"
            class="primary spinner spinner-md"
          />
          <v-icon-rotate
            v-else
            class="w-4 h-4 cursor-pointer text-primary-500"
            @click.native="fetchSubaccountBalances"
          />
        </div>
      </div>
    </div>
    <h3 class="text-3.5xl tracking-wider text-right mt-3">
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
  SubaccountBalanceWithTokenAndUsdPriceAndUsdBalance,
  ZERO_IN_BASE
} from '@injectivelabs/ui-common'
import VSubaccountBalanceItem from './subaccount-balance-item.vue'
import { subaccountAvailableBalanceInUsd } from '~/types'
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
    subaccountBalancesWithTokenAndPrice(): SubaccountBalanceWithTokenAndUsdPriceAndUsdBalance[] {
      return this.$accessor.account.subaccountBalancesWithTokenAndPrice
    },

    subaccountAvailableBalancesInUsd(): subaccountAvailableBalanceInUsd[] {
      const { subaccountBalancesWithTokenAndPrice } = this

      return subaccountBalancesWithTokenAndPrice.map((balance) => {
        const availableTokenBalanceInBase = new BigNumberInWei(
          balance.availableBalance
        ).toBase(balance.token.decimals)
        const availableBalanceInUsd = availableTokenBalanceInBase.multipliedBy(
          balance.token.usdPrice
        )

        return {
          ...balance,
          availableTokenBalanceInBase,
          availableBalanceInUsd
        }
      })
    },

    sortedSubaccountAvailableBalancesInUsd(): subaccountAvailableBalanceInUsd[] {
      const { subaccountAvailableBalancesInUsd } = this

      return subaccountAvailableBalancesInUsd
        .filter((balance) => balance.availableTokenBalanceInBase.gt('0'))
        .sort(
          (
            b1: subaccountAvailableBalanceInUsd,
            b2: subaccountAvailableBalanceInUsd
          ) =>
            b2.availableTokenBalanceInBase
              .minus(b1.availableTokenBalanceInBase)
              .toNumber()
        )
    },

    paginatedSubaccountAvailableBalancesInUsd(): subaccountAvailableBalanceInUsd[] {
      const { sortedSubaccountAvailableBalancesInUsd, limit } = this

      return sortedSubaccountAvailableBalancesInUsd.slice(0, limit)
    },

    totalAvailableBalanceInUsd(): BigNumberInBase {
      const { sortedSubaccountAvailableBalancesInUsd } = this

      return sortedSubaccountAvailableBalancesInUsd.reduce(
        (total, balance: subaccountAvailableBalanceInUsd) =>
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
