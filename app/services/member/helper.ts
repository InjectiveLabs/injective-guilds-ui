import { ZERO_IN_BASE } from '@injectivelabs/ui-common'
import { UiPortfolioWithoutDate } from '~/types'

export const calculateHistoricalReturns = (
  first: UiPortfolioWithoutDate,
  last: UiPortfolioWithoutDate
) => {
  const historicalReturns = last.portfolioValue
    .minus(first.portfolioValue)
    .dividedBy(first.portfolioValue)
    .multipliedBy(100)

  return historicalReturns.isNaN() ? ZERO_IN_BASE : historicalReturns
}
