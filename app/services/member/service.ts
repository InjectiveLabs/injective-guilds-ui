import { HttpException } from '@injectivelabs/exceptions'
import { HttpClient } from '@injectivelabs/utils'
import { ApiResponse, ApiPortfolio, ApiProfile } from '~/types'
import { MemberTransformer } from '~/app/services/member/transformer'
import { GuildTransformer } from '~/app/services/guild/transformer'
import { MemberNotFoundException } from '~/app/exceptions'

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

      const first = await GuildTransformer.ApiPortfolioToUiPortfolio(
        response.data.portfolios[response.data.portfolios.length - 1]
      )
      const last = await GuildTransformer.ApiPortfolioToUiPortfolio(
        response.data.portfolios[0]
      )

      return last.portfolioValue
        .minus(first.portfolioValue)
        .dividedBy(first.portfolioValue)
        .multipliedBy(100)
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
      )) as ApiResponse<ApiProfile>

      return MemberTransformer.ApiProfileToUiProfile(response.data)
    } catch (error: any) {
      if ([404].includes(error.response.status)) {
        throw new MemberNotFoundException(error.message)
      }

      throw new HttpException(error.message)
    }
  }
}
