import { getAccessorType } from 'typed-vuex'

import * as modal from '~/store/modal'
import * as wallet from '~/store/wallet'

export const accessorType = getAccessorType({
  modules: {
    modal,
    wallet
  }
})
