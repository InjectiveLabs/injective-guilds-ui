import wallet from './en/wallet'

export default {
  ...wallet,
  common: {
    confirm: 'Confirm',
    leave: 'Leave',
    viewDetails: 'View details'
  },

  guilds: {
    asepoid: 'Asepoid',
    akukx: 'Akukx',
    ethixx: 'Ethixx',
    schneider: 'Schneider'
  },

  myGuild: {
    title: 'My Guild',
    description:
      'You can view your portfolio stats and the stats of the Guild you have joined.',
    myHoldings: 'My Holdings',
    walletBalance: 'Wallet Balance',
    tradingAccountBalance: 'Trading Account Balance',
    unrealisedPnL: 'Unrealised P&L',
    openPositionMargin: 'Open Position Margin',
    myEarnings: 'My Earnings',
    historicalReturns: 'Historical Returns',
    effectiveAPY: 'Effective APY'
  },

  guild: {
    guildMaster: 'Guild Master',
    members: 'Members',
    historicalReturns: 'Historical Returns',
    portfolioValue: 'Portfolio Value',
    portfolio: {
      title: 'Guild Portfolio',
      asset: 'Asset',
      total: 'Total',
      available: 'Available',
      marginHold: 'Margin hold',
      unrealizedPNL: 'Unrealized PNL',
      unrealizedPNLTooltip: 'Unrealized PNL tooltip placeholder',
      value: 'Value',
      dailyChange: 'Daily change',
      allocation: 'Allocation'
    },
    member: {
      title: 'Members',
      address: 'Address',
      since: 'Since',
      percentage: 'Percentage'
    },
    trade: {
      title: 'Trades',
      market: 'Market',
      side: 'Side',
      amount: 'Amount',
      price: 'Price',
      date: 'Date'
    }
  },

  guildModal: {
    title: 'Confirmation',
    joinDescription:
      'I join {guild} from this moment forward, for better, for worse, for richer, for poorer.',
    joinConfirmationDescription:
      'Congratulations. You are part of the {guild} now, to share weal and woe.',
    leaveDescription:
      'I leave {guild} from this moment forward, for better, for worse, for richer, for poorer.',
    grantAuthConfirmationDescription:
      'You are granting the authorization to the guild master the access to trade on behalf of you using your wallet balance. The APY is reference only. Your balance might be lower than the initial amount.'
  },

  tradingGuild: {
    title: 'Trading Guilds',
    description:
      'Pick your guild wisely, you can only join 1 guild per address. And the guild will use all of your qualified funds in your wallet. Create a new wallet and fund it with the exact amount you wish to join.'
  },

  footer: {
    privacyPolicy: 'Privacy Policy',
    startAGuild: 'Start a guild',
    item1: 'Item 1',
    item2: 'Item 2'
  },
  guildCard: {
    member: '{amount} members',
    assetAmount: '$ {amount}',
    totalAssets: 'Total Assets',
    apy: 'APY',
    joinNow: 'Join now',
    leave: 'Leave',
    maxCapacity: 'Max capacity',
    unqualified: 'Unqualified',
    youAreInThisGuild: 'You are in this guild',
    requirement: 'Requirements:'
  }
}
