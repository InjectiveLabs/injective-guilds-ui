import { actionTree } from 'typed-vuex'
import { guildService, memberService } from '~/app/Services'
import {
  UiGuildWithMeta,
  UiGuildMemberWithPortfolio,
  UiPortfolio
} from '~/types'
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
    async fetchGuild({ commit }, guildId: string) {
      const guild = await guildService.fetchGuild(guildId)
      const markets = await guildService.fetchMarkets(guildId)
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

    async fetchMembers({ commit }, guildId: string) {
      const members = await guildService.fetchMembers(guildId)
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

    async fetchPortfolios({ commit }, guildId: string) {
      commit('setPortfolios', await guildService.fetchPortfolios(guildId))
    },

    async joinGuild(_, guildId: string) {
      const { injectiveAddress } = this.app.$accessor.wallet
      const { profile } = this.app.$accessor.profile

      if (!injectiveAddress || profile) {
        return
      }

      await this.app.$accessor.wallet.validate()
      await guildService.joinGuild(guildId, injectiveAddress)

      await delayPromiseCall(
        () =>
          Promise.all([
            this.app.$accessor.fetchGuild(guildId),
            this.app.$accessor.fetchGuilds(guildId),
            this.app.$accessor.wallet.initPage()
          ]),
        3 * 1000
      )
    },

    async leaveGuild(_, guildId: string) {
      const { injectiveAddress } = await this.app.$accessor.wallet
      const { profile } = await this.app.$accessor.profile

      if (!injectiveAddress || !profile) {
        return
      }

      await this.app.$accessor.wallet.validate()
      await guildService.leaveGuild(guildId, injectiveAddress)

      await delayPromiseCall(
        () =>
          Promise.all([
            this.app.$accessor.fetchGuild(guildId),
            this.app.$accessor.fetchGuilds(guildId),
            this.app.$accessor.wallet.initPage()
          ]),
        3 * 1000
      )
    }
  }
)
