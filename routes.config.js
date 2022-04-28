const { HttpClient } = require('@injectivelabs/utils')
const {
  APP_GUILDS_API_ENDPOINT,
  IS_DEVNET,
  IS_TESTNET
} = require('./app/utils/constants')

const guildServiceEndpoint =
  APP_GUILDS_API_ENDPOINT ||
  (IS_DEVNET
    ? 'https://devnet.guilds.injective.dev'
    : IS_TESTNET
    ? 'https://testnet.guilds.injective.dev'
    : 'https://staging.guilds.injective.network')

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
  const guildsRoutes = (guilds || []).map(
    // @ts-ignore
    (guild) => `/guild/${guild.id}`
  )

  return [...staticRoutes, ...guildsRoutes]
}

module.exports = routes
