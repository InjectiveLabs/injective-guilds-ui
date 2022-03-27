import { actionTree } from 'typed-vuex'
import { guildService, memberService } from '~/app/Services'
import { UiGuildWithMeta, UiGuildMemberWithPortfolio, UiPortfolio } from '~/types'
import { delayPromiseCall } from '~/app/utils/async'

const initialStateFactory = () => ({
  guild: undefined as UiGuildWithMeta | undefined,
  guilds: [] as UiGuildWithMeta[],
  members: [] as UiGuildMemberWithPortfolio[],
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
  setMembers(state: GuildStoreState, members: UiGuildMemberWithPortfolio[]) {
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
      const members = await guildService.fetchMembers(id)
      const membersWithPortfolio = await Promise.all(
        members.map(async (member) => {
          const portfolio = await memberService.fetchPortfolio(member.address)

          return {
            ...member,
            portfolio
          }
        })
      )

      commit('setMembers', membersWithPortfolio)
    },

    async fetchPortfolios({ commit }, id) {
      const portfolios = await guildService.fetchPortfolios(id)

      commit('setPortfolios', portfolios)
    },

    async joinGuild(_, id) {
      const { injectiveAddress } = await this.app.$accessor.wallet
      const { profile } = await this.app.$accessor.profile

      if (!injectiveAddress || profile) {
        return
      }

      await this.app.$accessor.wallet.validate()
      await guildService.joinGuild(id, injectiveAddress)

      await delayPromiseCall(
        () =>
          Promise.all([
            this.app.$accessor.fetchGuild(id),
            this.app.$accessor.fetchGuilds(id),
            this.app.$accessor.wallet.initPage()
          ]),
        3 * 1000
      )
    },

    async leaveGuild(_, id) {
      const { injectiveAddress } = await this.app.$accessor.wallet
      const { profile } = await this.app.$accessor.profile

      if (!injectiveAddress || !profile) {
        return
      }

      await this.app.$accessor.wallet.validate()
      await guildService.leaveGuild(id, injectiveAddress)

      await delayPromiseCall(
        () =>
          Promise.all([
            this.app.$accessor.fetchGuild(id),
            this.app.$accessor.fetchGuilds(id),
            this.app.$accessor.wallet.initPage()
          ]),
        3 * 1000
      )
    }
  }
)
