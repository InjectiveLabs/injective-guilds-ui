import { actionTree } from 'typed-vuex'
import { memberService } from '~/app/Services'
import { UiProfile } from '~/types'

const initialStateFactory = () => ({
  profile: undefined as UiProfile | undefined
})

const initialState = initialStateFactory()

export const state = () => ({
  profile: initialState.profile
})

export type GuildStoreState = ReturnType<typeof state>

export const mutations = {
  setProfile(state: GuildStoreState, profile: UiProfile) {
    state.profile = profile
  },

  reset(state: GuildStoreState) {
    const initialState = initialStateFactory()

    state.profile = initialState.profile
  }
}

export const actions = actionTree(
  { state },
  {
    async fetchProfile({ commit }) {
      const { isUserWalletConnected, injectiveAddress } =
        this.app.$accessor.wallet

      if (!isUserWalletConnected || !injectiveAddress) {
        return
      }

      commit(
        'setPortfolios',
        await memberService.fetchProfile(injectiveAddress)
      )
    }
  }
)
