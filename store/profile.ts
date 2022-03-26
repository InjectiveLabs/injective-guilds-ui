import { actionTree } from 'typed-vuex'
import { memberService } from '~/app/Services'
import { UiProfile, UIProfilePortfolio } from '~/types'

const initialStateFactory = () => ({
  profile: undefined as UiProfile | undefined,
  profilePortfolio: undefined as UIProfilePortfolio | undefined
})

const initialState = initialStateFactory()

export const state = () => ({
  profile: initialState.profile,
  profilePortfolio: initialState.profilePortfolio
})

export type GuildStoreState = ReturnType<typeof state>

export const mutations = {
  setProfile(state: GuildStoreState, profile: UiProfile) {
    state.profile = profile
  },

  setProfilePortfolio(
    state: GuildStoreState,
    profilePortfolio: UIProfilePortfolio
  ) {
    state.profilePortfolio = profilePortfolio
  },

  reset(state: GuildStoreState) {
    const initialState = initialStateFactory()

    state.profile = initialState.profile
    state.profilePortfolio = initialState.profilePortfolio
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
        'setProfile',
        await memberService.fetchProfile(
          'inj1dye2gg272p7hjqlsavdaacg8n55jsh8mk70hxt'
        )
      )
    },

    async fetchProfilePortfolio({ commit }) {
      const { isUserWalletConnected, injectiveAddress } =
        this.app.$accessor.wallet

      if (!isUserWalletConnected || !injectiveAddress) {
        return
      }

      commit(
        'setProfilePortfolio',
        await memberService.fetchProfilePortfolio(
          'inj1dye2gg272p7hjqlsavdaacg8n55jsh8mk70hxt'
        )
      )
    }
  }
)
