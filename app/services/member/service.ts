import { differenceInHours } from 'date-fns'
import { HttpException } from '@injectivelabs/exceptions'
import { HttpClient } from '@injectivelabs/utils'
import { ApiResponse, ApiPortfolio, ApiProfile, UiPortfolio } from '~/types'
import { MemberTransformer } from '~/app/services/member/transformer'
import { GuildTransformer } from '~/app/services/guild/transformer'
import { MemberNotFoundException } from '~/app/exceptions'

const calculateHistoricalReturns = (first: UiPortfolio, last: UiPortfolio) => {
  // round up to the nearest day
  const difference = differenceInHours(last.updatedAt, first.updatedAt)

  return last.portfolioValue
    .minus(first.portfolioValue)
    .dividedBy(first.portfolioValue)
    .dividedBy(difference)
    .multipliedBy(365)
}

export class MemberService {
  private client: HttpClient

  constructor(baseUrl: string) {
    this.client = new HttpClient(baseUrl)
  }

  async fetchGuildHistoricalReturn(address: string) {
    try {
      const response = (await this.client.get(
        `members/${address}/portfolios`
      )) as ApiResponse<{
        portfolios: ApiPortfolio[]
      }>

      const firstSnapshot = await GuildTransformer.ApiPortfolioToUiPortfolio(
        response.data.portfolios[response.data.portfolios.length - 1]
      )
      const lastSnapshot = await GuildTransformer.ApiPortfolioToUiPortfolio(
        response.data.portfolios[0]
      )

      return calculateHistoricalReturns(firstSnapshot, lastSnapshot)
    } catch (error: any) {
      if ([404].includes(error.response.status)) {
        throw new MemberNotFoundException(error.message)
      }

      throw new HttpException(error.message)
    }
  }

  async fetchProfilePortfolio(address: string) {
    try {
      const response = (await this.client.get(
        `members/${address}/portfolios`
      )) as ApiResponse<{
        portfolios: ApiPortfolio[]
      }>

      const firstSnapshot = await GuildTransformer.ApiPortfolioToUiPortfolio(
        response.data.portfolios[response.data.portfolios.length - 1]
      )
      const lastSnapshot = await GuildTransformer.ApiPortfolioToUiPortfolio(
        response.data.portfolios[0]
      )

      return {
        firstSnapshot,
        lastSnapshot,
        historicalReturns: calculateHistoricalReturns(
          firstSnapshot,
          lastSnapshot
        )
      }
    } catch (error: any) {
      if ([404].includes(error.response.status)) {
        throw new MemberNotFoundException(error.message)
      }

      throw new HttpException(error.message)
    }
  }

  async fetchProfile(address: string) {
    try {
      const response = (await this.client.get(
        `members/${address}`
      )) as ApiResponse<{ data: ApiProfile }>

      return MemberTransformer.ApiProfileToUiProfile(response.data.data)
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
