<template>
  <v-modal
    :is-open="isModalOpen"
    sm
    :title="$t('accountRestrictedWarning.title')"
    @modal-closed="closeModal"
  >
    <section>
      <p class="text-2xl font-bold leading-8">
        {{ $t('accountRestrictedWarning.description') }}
      </p>

      <v-button class="w-full mt-16" @click="closeModal">
        <span class="m-auto text-lg leading-6">
          {{ $t('common.alright') }}
        </span>
      </v-button>
    </section>
  </v-modal>
</template>

<script lang="ts">
import Vue from 'vue'
import VModal from '~/components/partials/common/modal.vue'
import { Modal } from '~/types'

export default Vue.extend({
  components: {
    VModal
  },

  computed: {
    isModalOpen(): boolean {
      return this.$accessor.modal.modals[Modal.AccountRestricted]
    }
  },

  watch: {
    isModalOpen(isOpen) {
      if (isOpen) {
        this.$root.$emit('close-connect-wallet')
      }
    }
  },

  methods: {
    closeModal() {
      this.$accessor.modal.closeModal(Modal.AccountRestricted)
    }
  }
})
</script>
