import { HttpException } from '@injectivelabs/exceptions'
import { HttpClient } from '@injectivelabs/utils'
import {
  ApiResponse,
  ApiGuild,
  ApiMarket,
  ApiGuildMember,
  ApiPortfolio
} from '~/types'
import { GuildTransformer } from '~/app/services/guild/transformer'
import { GuildNotFoundException } from '~/app/exceptions'

export class GuildService {
  private client: HttpClient

  constructor(baseUrl: string) {
    this.client = new HttpClient(baseUrl)
  }

  async fetchGuilds() {
    try {
      const response = (await this.client.get('guilds')) as ApiResponse<{
        guilds: ApiGuild[]
      }>

      const guilds = response.data.guilds || []

      return await Promise.all(guilds.map(GuildTransformer.ApiGuildToUiGuild))
    } catch (error: any) {
      throw new HttpException(error.message)
    }
  }

  async fetchGuild(guildId: string) {
    try {
      const response = (await this.client.get(
        `guilds/${guildId}`
      )) as ApiResponse<{
        guild: ApiGuild
      }>

      return await GuildTransformer.ApiGuildToUiGuild(response.data.guild)
    } catch (error: any) {
      if ([404].includes(error.response.status)) {
        throw new GuildNotFoundException(error.message)
      }

      throw new HttpException(error.message)
    }
  }

  async fetchMarkets(guildId: string) {
    try {
      const response = (await this.client.get(
        `guilds/${guildId}/markets`
      )) as ApiResponse<{
        markets: ApiMarket[]
      }>

      const markets = await Promise.all(
        response.data.markets.map(GuildTransformer.ApiMarketToUiMarket)
      )

      return markets.filter((m) => m !== undefined)
    } catch (error: any) {
      if ([404].includes(error.response.status)) {
        throw new GuildNotFoundException(error.message)
      }

      throw new HttpException(error.message)
    }
  }

  async fetchMembers(guildId: string) {
    try {
      const response = (await this.client.get(
        `guilds/${guildId}/members`
      )) as ApiResponse<{
        members: ApiGuildMember[]
      }>

      return response.data.members.map(
        GuildTransformer.ApiGuildMemberToUiGuildMember
      )
    } catch (error: any) {
      if ([404].includes(error.response.status)) {
        throw new GuildNotFoundException(error.message)
      }

      throw new HttpException(error.message)
    }
  }

  async fetchPortfolios(guildId: string) {
    try {
      const response = (await this.client.get(
        `guilds/${guildId}/portfolios`
      )) as ApiResponse<{
        portfolios: ApiPortfolio[]
      }>

      return await Promise.all(
        response.data.portfolios.map(GuildTransformer.ApiPortfolioToUiPortfolio)
      )
    } catch (error: any) {
      if ([404].includes(error.response.status)) {
        throw new GuildNotFoundException(error.message)
      }

      throw new HttpException(error.message)
    }
  }

  async joinGuild(guildId: string, address: string) {
    try {
      await this.client.post(`guilds/${guildId}/member`, {
        injective_address: address
      })
    } catch (error: any) {
      throw new HttpException(
        error.response ? error.response.data.message : error.message
      )
    }
  }

  async leaveGuild(guildId: string, address: string) {
    try {
      await this.client.delete(`guilds/${guildId}/member/${address}`)
    } catch (error: any) {
      throw new HttpException(
        error.response ? error.response.data.message : error.message
      )
    }
  }
}
