import { getAccessorType } from 'typed-vuex'

import * as bank from '~/store/bank'
import * as exchange from '~/store/exchange'
import * as guild from '~/store/guild'
import * as modal from '~/store/modal'
import * as member from '~/store/member'
import * as wallet from '~/store/wallet'

export const accessorType = getAccessorType({
  modules: {
    bank,
    guild,
    exchange,
    modal,
    member,
    wallet
  }
})
