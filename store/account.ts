import { AccountPortfolio } from '@injectivelabs/subaccount-consumer'
import {
  ZERO_TO_STRING,
  SubaccountBalanceWithToken,
  SubaccountBalanceWithTokenAndUsdPriceAndUsdBalance,
  UiSubaccount,
  UiSubaccountBalance
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
  subaccountBalancesWithToken: [] as SubaccountBalanceWithToken[],
  subaccountBalancesWithTokenAndPrice:
    [] as SubaccountBalanceWithTokenAndUsdPriceAndUsdBalance[]
})

const initialState = initialStateFactory()

export const state = () => ({
  subaccountIds: initialState.subaccountIds as string[],
  subaccount: initialState.subaccount as UiSubaccount | undefined,
  subaccountBalancesWithToken:
    initialState.subaccountBalancesWithToken as SubaccountBalanceWithToken[],
  subaccountBalancesWithTokenAndPrice:
    initialState.subaccountBalancesWithTokenAndPrice as SubaccountBalanceWithTokenAndUsdPriceAndUsdBalance[]
})

export type AccountStoreState = ReturnType<typeof state>

export const getters = getterTree(state, {
  //
})

export const mutations = {
  setSubacccountIds(state: AccountStoreState, subaccountIds: string[]) {
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

  setSubaccountBalancesWithToken(
    state: AccountStoreState,
    subaccountBalancesWithToken: SubaccountBalanceWithToken[]
  ) {
    state.subaccountBalancesWithToken = subaccountBalancesWithToken
  },

  setSubaccountBalancesWithTokenAndPrice(
    state: AccountStoreState,
    subaccountBalancesWithTokenAndPrice: SubaccountBalanceWithTokenAndUsdPriceAndUsdBalance[]
  ) {
    state.subaccountBalancesWithTokenAndPrice =
      subaccountBalancesWithTokenAndPrice
  },

  reset(state: AccountStoreState) {
    const initialState = initialStateFactory()

    state.subaccount = initialState.subaccount
    state.subaccountIds = initialState.subaccountIds
    state.subaccountBalancesWithToken = initialState.subaccountBalancesWithToken
    state.subaccountBalancesWithTokenAndPrice =
      initialState.subaccountBalancesWithTokenAndPrice
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

      commit('setSubacccountIds', subaccountIds)
      commit(
        'setSubaccount',
        await subaccountService.fetchSubaccount(subaccountId)
      )
    },

    async fetchSubaccountsBalances({ state }) {
      const { subaccount } = state

      if (!subaccount) {
        await this.app.$accessor.account.refreshSubaccountBalances()
      }

      if (subaccount && !subaccount.balances) {
        await this.app.$accessor.account.refreshSubaccountBalances()
      }
    },

    async refreshSubaccountBalances({ commit, state }) {
      await this.app.$accessor.account.fetchSubaccounts()

      const { subaccount: newSubaccount } = state

      if (!newSubaccount) {
        return
      }

      const subaccountBalances = newSubaccount.balances
      const subaccountBalancesWithToken =
        await tokenService.getSubaccountBalancesWithToken(subaccountBalances)

      commit('setSubaccountBalancesWithToken', subaccountBalancesWithToken)
    },

    async fetchSubaccountsBalancesWithPrices({ commit, state }) {
      await this.app.$accessor.account.refreshSubaccountBalances()

      const { subaccountBalancesWithToken: newSubaccountBalancesWithToken } =
        state

      const subaccountBalancesWithTokenAndPrice = await Promise.all(
        newSubaccountBalancesWithToken.map(async (balance) => {
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
