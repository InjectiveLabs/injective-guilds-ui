import { getAccessorType } from 'typed-vuex'

import * as modal from '~/store/modal'

export const accessorType = getAccessorType({
  modules: {
    modal,
  },
})
