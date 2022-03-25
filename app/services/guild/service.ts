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

      return await Promise.all(
        response.data.guilds.map(GuildTransformer.ApiGuildToUiGuild)
      )
    } catch (error: any) {
      throw new HttpException(error.message)
    }
  }

  async fetchGuild(id: string) {
    try {
      const response = (await this.client.get(`guilds/${id}`)) as ApiResponse<{
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

  async fetchMarkets(id: string) {
    try {
      const response = (await this.client.get(
        `guilds/${id}/markets`
      )) as ApiResponse<{
        markets: ApiMarket[]
      }>

      return await Promise.all(
        response.data.markets.map(GuildTransformer.ApiMarketToUiMarket)
      )
    } catch (error: any) {
      if ([404].includes(error.response.status)) {
        throw new GuildNotFoundException(error.message)
      }

      throw new HttpException(error.message)
    }
  }

  async fetchMembers(id: string) {
    try {
      const response = (await this.client.get(
        `guilds/${id}/members`
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

  async fetchPortfolios(id: string) {
    try {
      const response = (await this.client.get(
        `guilds/${id}/portfolios`
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
}
