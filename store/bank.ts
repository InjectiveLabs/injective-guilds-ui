import { BankBalances } from '@injectivelabs/ui-common'
import { actionTree, getterTree } from 'typed-vuex'
import { bankService } from '~/app/Services'

const initialStateFactory = () => ({
  balances: {} as BankBalances,
  ibcBalances: {} as BankBalances
})

const initialState = initialStateFactory()

export const state = () => ({
  balances: initialState.balances,
  ibcBalances: initialState.balances
})

export type BankStoreState = ReturnType<typeof state>

export const getters = getterTree(state, {
  bankBalances: (state: BankStoreState) => {
    return {
      ...state.balances,
      ...state.ibcBalances
    }
  }
})

export const mutations = {
  setBalances(state: BankStoreState, balances: BankBalances) {
    state.balances = balances
  },

  setIbcBalances(state: BankStoreState, ibcBalances: BankBalances) {
    state.ibcBalances = ibcBalances
  },

  reset(state: BankStoreState) {
    const initialState = initialStateFactory()

    state.balances = initialState.balances
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
    }
  }
)
