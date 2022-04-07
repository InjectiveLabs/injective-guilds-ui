import { TokenMeta } from '@injectivelabs/token-metadata'
import { BigNumberInBase, BigNumberInWei } from '@injectivelabs/utils'
import { ZERO_IN_BASE, Token, TokenTransformer } from '@injectivelabs/ui-common'
import {
  ApiGuild,
  ApiMarket,
  ApiGuildMember,
  ApiPortfolio,
  ApiPortfolioBalance,
  UiGuild,
  UiGuildMember,
  UiPortfolio,
  UiPortfolioBalanceWithToken
} from './types'
import { derivativeService, spotService, tokenService } from '~/app/Services'

const ApiPortfolioBalanceToUiPortfolioBalanceWithToken = async (
  balance: ApiPortfolioBalance
): Promise<UiPortfolioBalanceWithToken> => {
  const token = (await tokenService.getDenomTokenMeta(
    balance.denom
  )) as TokenMeta

  const availableBalance = new BigNumberInWei(balance.available_balance).toBase(
    token.decimals
  )

  const marginHold = new BigNumberInWei(balance.margin_hold).toBase(
    token.decimals
  )
  const totalBalance = new BigNumberInWei(balance.total_balance).toBase(
    token.decimals
  )
  const unrealizedPnl = new BigNumberInWei(balance.unrealized_pnl).toBase(
    token.decimals
  )
  const totalValue = totalBalance.plus(marginHold).plus(unrealizedPnl)
  const totalValueInUsd = totalValue.times(balance.price_usd)

  return {
    availableBalance,
    marginHold,
    totalBalance,
    totalValue,
    totalValueInUsd,
    unrealizedPnl,
    denom: balance.denom,
    priceUsd: balance.price_usd,
    token: TokenTransformer.tokenMetaToToken(token, token.address) as Token
  }
}

export const ApiGuildMemberToUiGuildMember = (
  ApiGuildMember: ApiGuildMember
): UiGuildMember => {
  return {
    guildId: ApiGuildMember.guild_id,
    address: ApiGuildMember.injective_address,
    since: ApiGuildMember.since
  }
}

export const ApiGuildToUiGuild = async (
  apiGuild: ApiGuild
): Promise<UiGuild> => {
  const portfolio = await ApiPortfolioToUiPortfolio(apiGuild.current_portfolio)
  const requirementsWithToken = await Promise.all(
    apiGuild.requirements.map(async (requirement) => {
      const token = (await tokenService.getDenomTokenMeta(
        requirement.denom
      )) as TokenMeta

      return {
        denom: requirement.denom,
        minAmountInUsd: requirement.min_amount_usd,
        minAmount: requirement.min_amount,
        outstandingAmountInBase: new BigNumberInBase(requirement.min_amount),
        token: TokenTransformer.tokenMetaToToken(token, token.address) as Token
      }
    })
  )

  return {
    id: apiGuild.id,
    capacity: apiGuild.capacity,
    description: apiGuild.description,
    defaultMemberAddress: apiGuild.default_member_address,
    masterAddress: apiGuild.master_address,
    memberCount: apiGuild.member_count,
    name: apiGuild.name,
    requirements: requirementsWithToken,
    portfolio
  }
}

export const ApiPortfolioToUiPortfolio = async (
  apiPortfolio: ApiPortfolio
): Promise<UiPortfolio> => {
  const balances = apiPortfolio.balances ? apiPortfolio.balances : []
  const portfolioBalances = await Promise.all(
    balances.map(ApiPortfolioBalanceToUiPortfolioBalanceWithToken)
  )
  const portfolioValue = portfolioBalances.reduce(
    (total: BigNumberInBase, balance: UiPortfolioBalanceWithToken) =>
      total.plus(balance.totalValueInUsd),
    ZERO_IN_BASE
  )

  return {
    portfolioValue,
    balances: portfolioBalances,
    updatedAt: apiPortfolio.updated_at
  }
}

export const ApiMarketToUiMarket = async (market: ApiMarket) => {
  if (market.is_perpetual) {
    try {
      const derivativeMarket = await derivativeService.fetchMarket(
        market.market_id
      )

      if (!derivativeMarket) {
        return
      }

      const token = (await tokenService.getTokenMetaDataBySymbol(
        derivativeMarket.oracleBase
      )) as TokenMeta

      return {
        token: TokenTransformer.tokenMetaToToken(token, token.address),
        ticker: derivativeMarket.ticker
      }
    } catch (e: any) {
      return undefined
    }
  }

  try {
    const spotMarket = await spotService.fetchMarket(market.market_id)

    if (!spotMarket) {
      return
    }

    const token = await tokenService.getDenomToken(spotMarket.baseDenom)

    return {
      token,
      ticker: `${spotMarket.ticker} SPOT`
    }
  } catch (e: any) {
    return undefined
  }
}

export class GuildTransformer {
  static ApiGuildToUiGuild = ApiGuildToUiGuild

  static ApiMarketToUiMarket = ApiMarketToUiMarket

  static ApiGuildMemberToUiGuildMember = ApiGuildMemberToUiGuildMember

  static ApiPortfolioToUiPortfolio = ApiPortfolioToUiPortfolio
}
