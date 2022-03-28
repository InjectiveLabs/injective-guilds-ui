export interface GuildAsset {
  card: string
  banner: string
  thumbnail: string
  story: string
  strategy: string
}

export const guildImageMappings = {
  akukx: {
    card: '/guilds/one/card.png',
    banner: '/guilds/one/banner.png',
    thumbnail: '/guilds/one/thumbnail.png',
    story:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    strategy:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  schneider: {
    card: '/guilds/two/card.png',
    banner: '/guilds/two/banner.png',
    thumbnail: '/guilds/two/thumbnail.png',
    story:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    strategy:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  ethixx: {
    card: '/guilds/three/card.png',
    banner: '/guilds/three/banner.png',
    thumbnail: '/guilds/three/thumbnail.png',
    story:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    strategy:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  default: {
    card: '/guilds/four/card.png',
    banner: '/guilds/four/banner.png',
    thumbnail: '/guilds/four/thumbnail.png',
    story: 'Coming soon',
    strategy: 'Coming soon'
  }
} as Record<string, GuildAsset>
