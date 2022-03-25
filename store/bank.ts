import {
  BankBalances,
  BankBalanceWithToken,
  IbcBankBalanceWithToken
} from '@injectivelabs/ui-common'
import { actionTree, getterTree } from 'typed-vuex'
import { bankService, tokenService } from '~/app/Services'

const initialStateFactory = () => ({
  balances: {} as BankBalances,
  ibcBalances: {} as BankBalances,
  bankErc20BalancesWithToken: [] as BankBalanceWithToken[],
  bankIbcBalancesWithToken: [] as IbcBankBalanceWithToken[]
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
  hasAnyBankBalance: (state: BankStoreState) => {
    return (
      Object.keys(state.balances).length > 0 ||
      Object.keys(state.ibcBalances).length > 0
    )
  },

  bankBalancesWithToken: (state: BankStoreState) => {
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

  setBankErc20BalancesWithToken(
    state: BankStoreState,
    bankErc20BalancesWithToken: BankBalanceWithToken[]
  ) {
    state.bankErc20BalancesWithToken = bankErc20BalancesWithToken
  },

  setIbcBalances(state: BankStoreState, ibcBalances: BankBalances) {
    state.ibcBalances = ibcBalances
  },

  setIbcBalancesWithToken(
    state: BankStoreState,
    bankIbcBalancesWithToken: IbcBankBalanceWithToken[]
  ) {
    state.bankIbcBalancesWithToken = bankIbcBalancesWithToken
  },

  reset(state: BankStoreState) {
    const initialState = initialStateFactory()

    state.balances = initialState.balances
    state.bankErc20BalancesWithToken = initialState.bankErc20BalancesWithToken
    state.bankIbcBalancesWithToken = initialState.bankIbcBalancesWithToken
  }
}

export const actions = actionTree(
  { state },
  {
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

      commit('setBankErc20BalancesWithToken', bankBalancesWithToken)
      commit('setIbcBalancesWithToken', ibcBankBalancesWithToken)
    }
  }
)
