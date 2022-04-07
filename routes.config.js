const { HttpClient } = require('@injectivelabs/utils')
const { Network } = require('@injectivelabs/networks')

const guildServiceEndpoint =
  process.env.APP_NETWORK === Network.Devnet
    ? 'https://devnet.guilds.injective.dev'
    : 'https://testnet.guilds.injective.dev/'

const fetchGuilds = async () => {
  const client = new HttpClient(guildServiceEndpoint)

  try {
    const { data } = await client.get('guilds')

    return data.guilds
  } catch (e) {
    return []
  }
}

const routes = async () => {
  const staticRoutes = ['/', '/how-it-works', '/leaderboard', '/my-guild']

  const guilds = await fetchGuilds()

  const guildsRoutes = guilds.map(
    // @ts-ignore
    (guild) => `/guild/${guild.id}`
  )

  return [...staticRoutes, ...guildsRoutes]
}

module.exports = routes
