import { actionTree } from 'typed-vuex'
import { memberService } from '~/app/Services'
import { UiMember, UiMemberPortfolio } from '~/types'

const initialStateFactory = () => ({
  member: undefined as UiMember | undefined,
  memberPortfolio: undefined as UiMemberPortfolio | undefined
})

const initialState = initialStateFactory()

export const state = () => ({
  member: initialState.member,
  memberPortfolio: initialState.memberPortfolio
})

export type MemberStoreState = ReturnType<typeof state>

export const mutations = {
  setMember(state: MemberStoreState, member: UiMember) {
    state.member = member
  },

  setMemberPortfolio(
    state: MemberStoreState,
    memberPortfolio: UiMemberPortfolio
  ) {
    state.memberPortfolio = memberPortfolio
  },

  reset(state: MemberStoreState) {
    const initialState = initialStateFactory()

    state.member = initialState.member
    state.memberPortfolio = initialState.memberPortfolio
  }
}

export const actions = actionTree(
  { state },
  {
    async fetchMember({ commit }) {
      const { isUserWalletConnected, injectiveAddress } =
        this.app.$accessor.wallet

      if (!isUserWalletConnected || !injectiveAddress) {
        return
      }

      try {
        commit('setMember', await memberService.fetchMember(injectiveAddress))
      } catch {
        // ensure member is flushed on error
        commit('setMember', undefined)
      }
    },

    async fetchMemberPortfolio({ commit }) {
      const { isUserWalletConnected, injectiveAddress } =
        this.app.$accessor.wallet

      if (!isUserWalletConnected || !injectiveAddress) {
        return
      }

      commit(
        'setMemberPortfolio',
        await memberService.fetchMemberPortfolio(injectiveAddress)
      )
    }
  }
)
