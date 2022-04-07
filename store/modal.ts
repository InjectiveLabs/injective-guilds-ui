import { getterTree } from 'typed-vuex'
import { Modal } from '~/types/enums'

export type ModalState = Record<Modal, boolean>

const modalValues = Object.values(Modal)
const modalExists = (modal: Modal) => modalValues.includes(modal)

const modals = modalValues.reduce((previous: ModalState, current: Modal) => {
  return { ...previous, [current]: false }
}, {} as ModalState)

const initialStateFactory = () => ({
  modals
})

const initialState = initialStateFactory()

export const state = () => ({
  customModal: undefined as string | undefined,
  modals: initialState.modals as ModalState
})

export type ModalStoreState = ReturnType<typeof state>

export const getters = getterTree(state, {
  //
})

export const mutations = {
  closeModal(state: ModalStoreState, modal: Modal) {
    if (modalExists(modal) && state.modals[modal]) {
      state.modals = { ...state.modals, [modal]: false }
    }
  },

  toggleModal(state: ModalStoreState, modal: Modal) {
    if (modalExists(modal)) {
      state.modals = {
        ...state.modals,
        [modal]: !state.modals[modal]
      }
    }
  },

  openModal(state: ModalStoreState, modal: Modal) {
    if (modalExists(modal)) {
      const initialState = initialStateFactory()

      state.modals = { ...initialState.modals, [modal]: true }
    }
  }
}
