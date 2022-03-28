import { actionTree } from 'typed-vuex'
import { sleep } from '@injectivelabs/utils'
import { guildActionService, guildService, memberService } from '~/app/Services'
import {
  UiGuildWithMeta,
  UiGuildMemberWithPortfolio,
  UiPortfolio,
  UiGuild,
  UiGuildRequirement,
  UiGuildToJoinModal
} from '~/types'

const initialStateFactory = () => ({
  guild: undefined as UiGuildWithMeta | undefined,
  guilds: [] as UiGuildWithMeta[],
  members: [] as UiGuildMemberWithPortfolio[],
  portfolios: [] as UiPortfolio[],

  currentGuildToJoin: undefined as UiGuildToJoinModal
})

const initialState = initialStateFactory()

export const state = () => ({
  members: initialState.members,
  guild: initialState.guild,
  guilds: initialState.guilds,
  portfolios: initialState.portfolios,
  currentGuildToJoin: initialState.currentGuildToJoin
})

export type GuildStoreState = ReturnType<typeof state>

export const mutations = {
  setMembers(state: GuildStoreState, members: UiGuildMemberWithPortfolio[]) {
    state.members = members
  },

  setGuild(state: GuildStoreState, guild: UiGuildWithMeta) {
    state.guild = guild
  },

  setCurrentGuildToJoin(state: GuildStoreState, payload: UiGuildToJoinModal) {
    state.currentGuildToJoin = payload
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

    async refreshGuild(_, guild: UiGuild) {
      await this.app.$accessor.fetchGuild(guild.id)
      await this.app.$accessor.fetchGuilds(guild.id)

      if (this.app.context.route.name === 'my-guild') {
        await this.app.$accessor.wallet.initPage()
      }
    },

    async joinGuild(
      _,
      {
        guild,
        requirements
      }: { guild: UiGuild; requirements: UiGuildRequirement[] }
    ) {
      const { address, injectiveAddress, isUserWalletConnected } =
        this.app.$accessor.wallet

      if (!injectiveAddress || !isUserWalletConnected) {
        return
      }

      await this.app.$accessor.wallet.validate()

      await guildActionService.grant({
        address,
        injectiveAddress,
        guildMasterAddress: guild.masterAddress
      })
      await guildService.joinGuild(guild.id, injectiveAddress)

      await sleep(3000)
      await this.app.$accessor.guild.refreshGuild(guild)
    },

    async leaveGuild(_, guild: UiGuild) {
      const { address, injectiveAddress, isUserWalletConnected } =
        this.app.$accessor.wallet

      if (!injectiveAddress || !isUserWalletConnected) {
        return
      }

      await this.app.$accessor.wallet.validate()

      await this.app.$accessor.derivatives.batchCancelOrder()
      await this.app.$accessor.spot.batchCancelOrder()
      await this.app.$accessor.positions.closeAllPosition(guild)
      await guildActionService.revoke({
        injectiveAddress,
        address,
        guildMasterAddress: guild.masterAddress
      })
      await guildService.leaveGuild(guild.id, injectiveAddress)

      await sleep(3000)
      await this.app.$accessor.guild.refreshGuild(guild)
    }
  }
)
