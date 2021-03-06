import {
  ZERO_TO_STRING,
  UiSubaccount,
  UiSubaccountBalance,
  SubaccountBalanceWithTokenAndUsdPriceAndUsdBalance
} from '@injectivelabs/ui-common'
import { actionTree, getterTree } from 'typed-vuex'
import {
  subaccountService,
  tokenCoinGeckoService,
  tokenService
} from '~/app/Services'

const initialStateFactory = () => ({
  subaccountIds: [] as string[],
  subaccount: undefined as UiSubaccount | undefined,
  subaccountBalancesWithTokenAndPrice:
    [] as SubaccountBalanceWithTokenAndUsdPriceAndUsdBalance[]
})

const initialState = initialStateFactory()

export const state = () => ({
  subaccountIds: initialState.subaccountIds,
  subaccount: initialState.subaccount,
  subaccountBalancesWithTokenAndPrice:
    initialState.subaccountBalancesWithTokenAndPrice
})

export type AccountStoreState = ReturnType<typeof state>

export const getters = getterTree(state, {
  subaccountBalances: (state: AccountStoreState) => {
    if (!state.subaccount) {
      return []
    }

    return state.subaccount.balances
  }
})

export const mutations = {
  setSubaccountIds(state: AccountStoreState, subaccountIds: string[]) {
    state.subaccountIds = subaccountIds
  },

  setSubaccount(state: AccountStoreState, subaccount: UiSubaccount) {
    state.subaccount = subaccount
  },

  setSubaccountBalance(state: AccountStoreState, balance: UiSubaccountBalance) {
    if (!state.subaccount) {
      return
    }

    const currentBalance = [...state.subaccount.balances].find(
      (b) => b.denom === balance.denom
    )
    const balances = [...state.subaccount.balances].filter(
      (b) => b.denom !== balance.denom
    )
    const updatedBalance = {
      ...balance,
      totalBalance:
        balance.totalBalance ||
        (currentBalance ? currentBalance.totalBalance : ZERO_TO_STRING),
      availableBalance:
        balance.availableBalance ||
        (currentBalance ? currentBalance.availableBalance : ZERO_TO_STRING)
    }

    state.subaccount = {
      ...state.subaccount,
      balances: [...balances, updatedBalance]
    }
  },

  setSubaccountBalancesWithTokenAndPrice(
    state: AccountStoreState,
    balance: SubaccountBalanceWithTokenAndUsdPriceAndUsdBalance[]
  ) {
    state.subaccountBalancesWithTokenAndPrice = balance
  },

  reset(state: AccountStoreState) {
    const initialState = initialStateFactory()

    state.subaccount = initialState.subaccount
    state.subaccountIds = initialState.subaccountIds
  }
}

export const actions = actionTree(
  { state, mutations },
  {
    async init(_) {
      await this.app.$accessor.account.fetchSubaccounts()
    },

    async fetchSubaccounts({ commit }) {
      const { injectiveAddress } = this.app.$accessor.wallet

      if (!injectiveAddress) {
        return
      }

      const subaccountIds = await subaccountService.fetchSubaccounts(
        injectiveAddress
      )

      if (subaccountIds.length === 0) {
        return
      }

      const [subaccountId] = subaccountIds

      commit('setSubaccountIds', subaccountIds)
      commit(
        'setSubaccount',
        await subaccountService.fetchSubaccount(subaccountId)
      )
    },

    async fetchSubaccountsBalancesWithPrices({ commit, state }) {
      await this.app.$accessor.account.fetchSubaccounts()

      const { subaccount } = this.app.$accessor.account

      if (!subaccount || !subaccount.balances) {
        return
      }

      const subaccountBalancesWithToken =
        await tokenService.getSubaccountBalancesWithToken(subaccount.balances)

      const subaccountBalancesWithTokenAndPrice = await Promise.all(
        subaccountBalancesWithToken.map(async (balance) => {
          return {
            ...balance,
            token: {
              ...balance.token,
              usdPrice: await tokenCoinGeckoService.fetchUsdTokenPrice(
                balance.token.coinGeckoId
              )
            }
          } as SubaccountBalanceWithTokenAndUsdPriceAndUsdBalance
        })
      )

      commit(
        'setSubaccountBalancesWithTokenAndPrice',
        subaccountBalancesWithTokenAndPrice
      )
    }
  }
)
