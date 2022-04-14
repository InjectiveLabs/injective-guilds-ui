import { HttpException } from '@injectivelabs/exceptions'
import { HttpClient } from '@injectivelabs/utils'
import {
  ApiResponse,
  ApiPortfolio,
  ApiMember,
  ApiMonthlyPortfolio
} from '~/types'
import { MemberTransformer } from '~/app/services/member/transformer'
import { GuildTransformer } from '~/app/services/guild/transformer'
import { MemberNotFoundException } from '~/app/exceptions'
import { calculateHistoricalReturns } from '~/app/services/member/helper'

export class MemberService {
  private client: HttpClient

  constructor(baseUrl: string) {
    this.client = new HttpClient(baseUrl)
  }

  async fetchGuildMonthlyPortfolio(address: string) {
    try {
      const response = (await this.client.get(
        `members/${address}/monthly-portfolios`
      )) as ApiResponse<{
        portfolios: ApiMonthlyPortfolio[]
      }>

      if (!response.data.portfolios) {
        return []
      }

      const [latestPortfolio] = response.data.portfolios

      return await GuildTransformer.ApiMonthlyPortfolioToUiPortfolio(
        latestPortfolio
      )
    } catch (error: any) {
      if ([404].includes(error.response.status)) {
        throw new MemberNotFoundException(error.message)
      }

      throw new HttpException(error.message)
    }
  }

  async fetchGuildMonthlyPortfolios(address: string) {
    try {
      const response = (await this.client.get(
        `members/${address}/monthly-portfolios`
      )) as ApiResponse<{
        portfolios: ApiMonthlyPortfolio[]
      }>

      if (!response.data.portfolios) {
        return []
      }

      return await Promise.all(
        response.data.portfolios.map(
          GuildTransformer.ApiMonthlyPortfolioToUiPortfolio
        )
      )
    } catch (error: any) {
      if ([404].includes(error.response.status)) {
        throw new MemberNotFoundException(error.message)
      }

      throw new HttpException(error.message)
    }
  }

  async fetchMemberPortfolio(address: string) {
    try {
      const response = (await this.client.get(
        `members/${address}/monthly-portfolios`
      )) as ApiResponse<{
        portfolios: ApiMonthlyPortfolio[]
      }>

      if (!response.data.portfolios) {
        return []
      }

      return await Promise.all(
        response.data.portfolios.map(
          GuildTransformer.ApiMonthlyPortfolioToUiPortfolio
        )
      )
    } catch (error: any) {
      if ([404].includes(error.response.status)) {
        throw new MemberNotFoundException(error.message)
      }

      throw new HttpException(error.message)
    }
  }

  async fetchMember(address: string) {
    try {
      const response = (await this.client.get(
        `members/${address}`
      )) as ApiResponse<{ data: ApiMember }>

      return MemberTransformer.ApiMemberToUiMember(response.data.data)
    } catch (error: any) {
      if ([404].includes(error.response.status)) {
        throw new MemberNotFoundException(error.message)
      }

      throw new HttpException(error.message)
    }
  }

  async fetchPortfolio(address: string) {
    try {
      const response = (await this.client.get(
        `members/${address}/portfolio`
      )) as ApiResponse<{
        data: ApiPortfolio
      }>

      return await GuildTransformer.ApiPortfolioToUiPortfolio(
        response.data.data
      )
    } catch (error: any) {
      if ([404].includes(error.response.status)) {
        throw new MemberNotFoundException(error.message)
      }

      throw new HttpException(error.message)
    }
  }
}
