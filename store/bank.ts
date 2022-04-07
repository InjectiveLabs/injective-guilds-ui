import { BankBalances } from '@injectivelabs/ui-common'
import { actionTree, getterTree } from 'typed-vuex'
import {
  bankService,
  tokenCoinGeckoService,
  tokenService
} from '~/app/Services'
import { BankBalanceWithTokenAndUsdPrice } from '~/types'

const initialStateFactory = () => ({
  balances: {} as BankBalances,
  ibcBalances: {} as BankBalances,
  bankErc20BalancesWithToken: [] as BankBalanceWithTokenAndUsdPrice[],
  bankIbcBalancesWithToken: [] as BankBalanceWithTokenAndUsdPrice[]
})

const initialState = initialStateFactory()

export const state = () => ({
  balances: initialState.balances,
  ibcBalances: initialState.balances,
  bankErc20BalancesWithToken: initialState.bankErc20BalancesWithToken,
  bankIbcBalancesWithToken: initialState.bankIbcBalancesWithToken
})

export type BankStoreState = ReturnType<typeof state>

export const getters = getterTree(state, {
  bankBalances: (state: BankStoreState) => {
    return {
      ...state.balances,
      ...state.ibcBalances
    }
  },

  bankBalancesWithTokenAndUsdPrice: (state: BankStoreState) => {
    return [
      ...state.bankErc20BalancesWithToken,
      ...state.bankIbcBalancesWithToken
    ]
  }
})

export const mutations = {
  setBalances(state: BankStoreState, balances: BankBalances) {
    state.balances = balances
  },

  setIbcBalances(state: BankStoreState, ibcBalances: BankBalances) {
    state.ibcBalances = ibcBalances
  },

  setBankErc20BalancesWithToken(
    state: BankStoreState,
    bankErc20BalancesWithToken: BankBalanceWithTokenAndUsdPrice[]
  ) {
    state.bankErc20BalancesWithToken = bankErc20BalancesWithToken
  },

  setIbcBalancesWithToken(
    state: BankStoreState,
    bankIbcBalancesWithToken: BankBalanceWithTokenAndUsdPrice[]
  ) {
    state.bankIbcBalancesWithToken = bankIbcBalancesWithToken
  },

  reset(state: BankStoreState) {
    const initialState = initialStateFactory()

    state.balances = initialState.balances
    state.ibcBalances = initialState.ibcBalances
    state.bankErc20BalancesWithToken = initialState.bankErc20BalancesWithToken
    state.bankIbcBalancesWithToken = initialState.bankIbcBalancesWithToken
  }
}

export const actions = actionTree(
  { state },
  {
    async fetchBankBalances({ commit }) {
      const { injectiveAddress } = this.app.$accessor.wallet

      if (!injectiveAddress) {
        return
      }

      const { bankBalances, ibcBankBalances } = await bankService.fetchBalances(
        injectiveAddress
      )

      commit('setBalances', bankBalances)
      commit('setIbcBalances', ibcBankBalances)

      await this.app.$accessor.bank.fetchBankBalancesWithToken()
    },

    async fetchBankBalancesWithToken({ commit }) {
      const { injectiveAddress } = this.app.$accessor.wallet

      if (!injectiveAddress) {
        return
      }

      const { bankBalances, ibcBankBalances } = await bankService.fetchBalances(
        injectiveAddress
      )

      commit('setBalances', bankBalances)
      commit('setIbcBalances', ibcBankBalances)

      const { bankBalancesWithToken, ibcBankBalancesWithToken } =
        await tokenService.getBalancesWithToken(bankBalances, ibcBankBalances)

      const bankBalancesWithTokenAndPrice = await Promise.all(
        bankBalancesWithToken.map(async (balance) => {
          return {
            ...balance,
            token: {
              ...balance.token,
              usdPrice: await tokenCoinGeckoService.fetchUsdTokenPrice(
                balance.token.coinGeckoId
              )
            }
          } as BankBalanceWithTokenAndUsdPrice
        })
      )

      const ibcBalanceWithTokenAndPrice = await Promise.all(
        ibcBankBalancesWithToken.map(async (balance) => {
          return {
            ...balance,
            token: {
              ...balance.token,
              usdPrice: await tokenCoinGeckoService.fetchUsdTokenPrice(
                balance.token.coinGeckoId
              )
            }
          } as BankBalanceWithTokenAndUsdPrice
        })
      )

      commit('setBankErc20BalancesWithToken', bankBalancesWithTokenAndPrice)
      commit('setIbcBalancesWithToken', ibcBalanceWithTokenAndPrice)
    }
  }
)
