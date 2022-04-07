export default {
  howItWorks: {
    title: 'How it works?',
    headerOne: 'What is Trading Guilds?',
    descriptionOne:
      'Trading Guilds is a decentralised copy trading platform built on Injective. Using Trading Guilds, individuals can authorise a guild with the most suitable trading strategy to trade on their behalf.',
    headerTwo: 'Why use Trading Guilds?',
    descriptionTwo:
      'By using Trading Guilds, individuals can allow seasoned Guild Masters to trade on their behalf without having to actively monitor the markets. This means individuals can leave assets in their wallets to grow or shrink passively.',
    headerThree: 'Are there any fees?',
    descriptionThree:
      'There are no additional fees paid by the Guild Members, who only have to pay the trading fee. Meanwhile, Guild Masters will receive 40% of the trading fees generated from trades placed in their guilds.',
    headerFour: 'How is authorization granted to the Guild Master?',
    descriptionFour:
      'The Cosmos SDK authz module will be used when an individual joins a guild. When this happens, the grantee (Guild Master) is allowed execute trading related messages on behalf of the granter (Guild Member). Similarly, when an individual leaves a guild, the granter (Guild Member) revokes the authorization automatically.',
    headerFive: 'How can I create a Guild?',
    descriptionFive:
      'Guild creation is by invitation only. You can signal your interest using this form {link}.'
  }
}
