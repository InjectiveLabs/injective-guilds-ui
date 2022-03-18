import wallet from './en/wallet'

export default {
  ...wallet,
  myGuild: {
    title: 'My Guild',
    description:
      'You can view your portfolio stats and the stats of the Guild you have joined.'
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
  }
}
