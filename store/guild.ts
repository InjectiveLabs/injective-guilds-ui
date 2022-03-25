import { actionTree } from 'typed-vuex'
import { guildService, memberService } from '~/app/Services'
import { UiGuildWithMeta, UiGuildMember, UiPortfolio } from '~/types'

const initialStateFactory = () => ({
  guild: undefined as UiGuildWithMeta | undefined,
  guilds: [] as UiGuildWithMeta[],
  members: [] as UiGuildMember[],
  portfolios: [] as UiPortfolio[]
})

const initialState = initialStateFactory()

export const state = () => ({
  members: initialState.members,
  guild: initialState.guild,
  guilds: initialState.guilds,
  portfolios: initialState.portfolios
})

export type GuildStoreState = ReturnType<typeof state>

export const mutations = {
  setMembers(state: GuildStoreState, members: UiGuildMember[]) {
    state.members = members
  },

  setGuild(state: GuildStoreState, guild: UiGuildWithMeta) {
    state.guild = guild
  },

  setGuilds(state: GuildStoreState, guilds: UiGuildWithMeta[]) {
    state.guilds = guilds
  },

  setPortfolios(state: GuildStoreState, portfolios: UiPortfolio[]) {
    state.portfolios = portfolios
  },

  reset(state: GuildStoreState) {
    const initialState = initialStateFactory()

    state.members = initialState.members
    state.guild = initialState.guild
    state.guilds = initialState.guilds
    state.portfolios = initialState.portfolios
  }
}

export const actions = actionTree(
  { state },
  {
    async fetchGuild({ commit }, id: string) {
      const guild = await guildService.fetchGuild(id)
      const markets = await guildService.fetchMarkets(id)
      const historicalReturns = await memberService.fetchGuildHistoricalReturn(
        guild.defaultMemberAddress
      )

      commit('setGuild', {
        ...guild,
        markets,
        historicalReturns
      })
    },

    async fetchGuilds({ commit }) {
      const guilds = await guildService.fetchGuilds()
      const guildsWithHistoricalReturns = await Promise.all(
        guilds.map(async (guild) => {
          const markets = await guildService.fetchMarkets(guild.id)
          const historicalReturns =
            await memberService.fetchGuildHistoricalReturn(
              guild.defaultMemberAddress
            )

          return {
            ...guild,
            markets,
            historicalReturns
          }
        })
      )

      commit('setGuilds', guildsWithHistoricalReturns)
    },

    async fetchMembers({ commit }, id) {
      commit('setMembers', await guildService.fetchMembers(id))
    },

    async fetchPortfolios({ commit }, id) {
      const portfolios = await guildService.fetchPortfolios(id)

      commit('setPortfolios', portfolios)
    }
  }
)
