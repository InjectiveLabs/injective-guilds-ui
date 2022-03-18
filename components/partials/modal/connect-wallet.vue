<template>
  <v-modal :is-open="isModalOpen" sm @modal-closed="handleModalClosed" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Modal } from '~/types/enums'
import VModal from '~/components/partials/modal/modal.vue'

export default Vue.extend({
  components: {
    VModal,
  },

  data() {
    return {}
  },

  computed: {
    isModalOpen(): boolean {
      return this.$accessor.modal.modals[Modal.ConnectWallet]
    },
  },

  methods: {
    handleModalClosed() {
      this.$accessor.modal.closeModal(Modal.ConnectWallet)
    },
  },
})
</script>
