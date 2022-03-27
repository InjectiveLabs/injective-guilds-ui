import { getAccessorType } from 'typed-vuex'

import * as bank from '~/store/bank'
import * as derivatives from '~/store/derivatives'
import * as guild from '~/store/guild'
import * as modal from '~/store/modal'
import * as positions from '~/store/positions'
import * as profile from '~/store/profile'
import * as spot from '~/store/spot'
import * as wallet from '~/store/wallet'

export const accessorType = getAccessorType({
  modules: {
    bank,
    derivatives,
    guild,
    modal,
    positions,
    profile,
    spot,
    wallet
  }
})
