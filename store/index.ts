import { getAccessorType } from 'typed-vuex'

import * as bank from '~/store/bank'
import * as guild from '~/store/guild'
import * as modal from '~/store/modal'
import * as profile from '~/store/profile'
import * as wallet from '~/store/wallet'

export const accessorType = getAccessorType({
  modules: {
    bank,
    guild,
    modal,
    wallet,
    profile
  }
})
