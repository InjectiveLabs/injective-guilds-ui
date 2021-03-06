import howItWorks from './en/how-it-works'
import wallet from './en/wallet'

export default {
  ...howItWorks,
  ...wallet,
  common: {
    home: 'Home',
    alright: 'Alright',
    awesome: 'Awesome',
    confirm: 'Confirm',
    leave: 'Leave',
    OK: 'OK',
    viewDetails: 'View details',
    open: 'open',
    close: 'close'
  },

  toast: {
    myGuildFetchProfileError: "Can't fetch member, please try again later",
    guildNotFoundErrorToast: 'Guild {name} not found.'
  },

  myGuild: {
    title: 'My Guild',
    description:
      'You can view your portfolio stats and the stats of the Guild you have joined.',
    myHoldings: 'My Holdings',
    balance: 'Balance',
    unrealisedPnL: 'Unrealised P&L',
    openPositionMargin: 'Open Position Margin',
    myEarnings: 'My Earnings',
    returns: 'Returns',
    value: 'Value',
    members: 'Members'
  },

  guild: {
    guildMaster: 'Guild Master',
    guildName: 'Guild name',
    backgroundStory: 'Background Story',
    tradingStrategy: 'Trading Strategy',
    members: 'Members',
    returns: 'Returns',
    value: 'Value',
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

  tradingGuild: {
    title: 'Trading Guilds',
    description:
      'Welcome to Trading Guilds, where you have to pick a guild to help you navigate the Tradingverse.',
    subDescription:
      'Each guild has its own story and trading strategy. Pick your guild wisely and pledge your allegiance.'
  },

  footer: {
    privacyPolicy: 'Privacy Policy',
    createAGuild: 'Create a guild'
  },

  guildCard: {
    member: 'members',
    value: 'Value',
    returns: 'Returns',
    joinNow: 'Join now',
    leave: 'Leave',
    maxCapacity: 'Max capacity',
    insufficientBalance: 'Insufficient Balance',
    youAreInThisGuild: 'You are in this guild',
    requirement: 'Requirements'
  },

  joinGuildModal: {
    title: 'Confirmation',
    description:
      'I join {name} from this moment forward, for better, for worse, for richer, for poorer.',
    confirmationDescription:
      'Congratulations. You are part of the {name} now, to share weal and woe.',
    failedDescription: 'Failed to join Trading Guild: {name}.',
    grantAuthConfirmationDescription:
      'You are granting the authorization to the guild master the access to trade on behalf of you using your wallet balance. The APY is reference only. Your balance might be lower than the initial amount.'
  },

  leaveGuildModal: {
    title: 'Confirmation',
    description: 'By leaving {name}, I am aware that:',
    subDescriptionOne:
      'All my open positions and open orders are going to be closed automatically.',
    subDescriptionTwo:
      'All permissions granted to the guild master will be revoked.',
    subDescriptionThree:
      'I will be able to join the guild again at any point as long as i meet the requirements.',
    confirmationDescription: 'You have left {name}.',
    failedDescription: 'Failed to leave Trading Guild: {name}.'
  },

  joinAGuildWarning: {
    title: 'Join guild',
    description: 'You have not joined a guild yet.'
  },

  accountRestrictedWarning: {
    title: 'Restricted Access',
    description: 'Application not available in your country.'
  },

  leaderboard: {
    leaderboard: 'Leaderboard',
    member: 'Member',
    returns: 'Returns',
    value: 'Value',
    guild: 'Guild',
    rank: 'Rank'
  }
}
