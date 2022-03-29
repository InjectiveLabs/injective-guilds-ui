import { actionTree } from 'typed-vuex'
import { sleep } from '@injectivelabs/utils'
import { DerivativeTransformer } from '@injectivelabs/ui-common'
import {
  derivativeService,
  guildActionService,
  guildService,
  memberService,
  spotService,
  tokenService
} from '~/app/Services'
import {
  UiGuildWithMeta,
  UiGuildMemberWithPortfolio,
  UiPortfolio,
  UiGuild,
  UiGuildRequirement,
  UiGuildToJoinModal,
  UiGuildToLeaveModal
} from '~/types'

const initialStateFactory = () => ({
  guild: undefined as UiGuildWithMeta | undefined,
  guilds: [] as UiGuildWithMeta[],
  members: [] as UiGuildMemberWithPortfolio[],
  portfolios: [] as UiPortfolio[],

  currentGuildToJoin: undefined as UiGuildToJoinModal,
  currentGuildToLeave: undefined as UiGuildToLeaveModal
})

const initialState = initialStateFactory()

export const state = () => ({
  members: initialState.members,
  guild: initialState.guild,
  guilds: initialState.guilds,
  portfolios: initialState.portfolios,
  currentGuildToJoin: initialState.currentGuildToJoin,
  currentGuildToLeave: initialState.currentGuildToLeave
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

  setCurrentGuildToLeave(state: GuildStoreState, payload: UiGuildToLeaveModal) {
    state.currentGuildToLeave = payload
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
    async validateJoin(_) {
      const { subaccount } = this.app.$accessor.account
      const { injectiveAddress, isUserWalletConnected } =
        this.app.$accessor.wallet

      if (!injectiveAddress || !isUserWalletConnected || !subaccount) {
        return
      }

      const derivativeOrders = await derivativeService.fetchOrders({
        subaccountId: subaccount.subaccountId
      })

      if (derivativeOrders.length > 0) {
        throw new Error(
          'You have open orders. Please close them before joining a guild.'
        )
      }

      const spotOrders = await spotService.fetchOrders({
        subaccountId: subaccount.subaccountId
      })

      if (spotOrders.length > 0) {
        throw new Error(
          'You have open orders. Please close them before joining a guild.'
        )
      }

      const positions = await derivativeService.fetchPositions({
        subaccountId: subaccount.subaccountId
      })

      if (positions.length > 0) {
        throw new Error(
          'You have open positions. Please close them before joining a guild.'
        )
      }
    },

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

    async refreshGuilds(_, guild: UiGuild) {
      await this.app.$accessor.guild.fetchGuilds()
      await this.app.$accessor.guild.fetchGuild(guild.id)
      await this.app.$accessor.guild.fetchMembers(guild.id)
      await this.app.$accessor.member.fetchMember()

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
      const { subaccount } = this.app.$accessor.account
      const { address, injectiveAddress, isUserWalletConnected } =
        this.app.$accessor.wallet

      if (!injectiveAddress || !isUserWalletConnected || !subaccount) {
        return
      }

      await this.app.$accessor.wallet.validate()
      await this.app.$accessor.guild.validateJoin()
      await this.app.$accessor.exchange.depositToTradingAccount(requirements)

      await guildActionService.grant({
        address,
        injectiveAddress,
        guildMasterAddress: guild.masterAddress
      })
      await guildService.joinGuild(guild.id, injectiveAddress)

      await sleep(3000)
      await this.app.$accessor.guild.refreshGuilds(guild)
    },

    async joinGuildInBatch(
      _,
      {
        guild,
        requirements
      }: { guild: UiGuild; requirements: UiGuildRequirement[] }
    ) {
      const { subaccount } = this.app.$accessor.account
      const { address, injectiveAddress, isUserWalletConnected } =
        this.app.$accessor.wallet

      if (!injectiveAddress || !isUserWalletConnected || !subaccount) {
        return
      }

      await this.app.$accessor.wallet.validate()
      await this.app.$accessor.guild.validateJoin()

      await guildActionService.grantInBatch({
        address,
        injectiveAddress,
        requirements,
        subaccountId: subaccount.subaccountId,
        guildMasterAddress: guild.masterAddress
      })
      await guildService.joinGuild(guild.id, injectiveAddress)

      await sleep(3000)
      await this.app.$accessor.guild.refreshGuilds(guild)
    },

    async leaveGuild(_, guild: UiGuild) {
      const { address, injectiveAddress, isUserWalletConnected } =
        this.app.$accessor.wallet

      if (!injectiveAddress || !isUserWalletConnected) {
        return
      }

      await this.app.$accessor.wallet.validate()

      await this.app.$accessor.exchange.batchCancelDerivativeOrder()
      await this.app.$accessor.exchange.batchCancelSpotOrder()
      await this.app.$accessor.exchange.closeAllPosition(guild)

      await guildActionService.revoke({
        injectiveAddress,
        address,
        guildMasterAddress: guild.masterAddress
      })
      await guildService.leaveGuild(guild.id, injectiveAddress)

      await sleep(3000)
      await this.app.$accessor.guild.refreshGuilds(guild)
    },

    async leaveGuildInBatch(_, guild: UiGuild) {
      const { subaccount } = this.app.$accessor.account
      const { address, injectiveAddress, isUserWalletConnected } =
        this.app.$accessor.wallet

      if (!injectiveAddress || !isUserWalletConnected) {
        return
      }

      await this.app.$accessor.wallet.validate()

      const derivativeMarkets = await derivativeService.fetchMarkets()
      const derivativeMarketsWithToken =
        await tokenService.getDerivativeMarketsWithToken(derivativeMarkets)
      const uiDerivativeMarkets =
        DerivativeTransformer.derivativeMarketsToUiSpotMarkets(
          derivativeMarketsWithToken
        )
      const derivativeOrders = await derivativeService.fetchOrders({
        subaccountId: subaccount.subaccountId
      })
      const derivativePositions = await derivativeService.fetchPositions({
        subaccountId: subaccount.subaccountId
      })
      const spotOrders = await spotService.fetchOrders({
        subaccountId: subaccount.subaccountId
      })

      await guildActionService.revokeInBatch({
        injectiveAddress,
        address,
        derivativeMarkets: uiDerivativeMarkets,
        positions: derivativePositions,
        derivativeOrders,
        spotOrders,
        subaccountId: subaccount.subaccountId,
        guildMasterAddress: guild.masterAddress
      })
      await guildService.leaveGuild(guild.id, injectiveAddress)

      await sleep(3000)
      await this.app.$accessor.guild.refreshGuilds(guild)
    }
  }
)
