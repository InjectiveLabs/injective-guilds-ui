<template>
  <v-modal
    :is-open="isModalOpen"
    sm
    :title="$t('joinAGuildWarning.title')"
    @modal-closed="closeModal"
  >
    <section>
      <p class="text-2xl font-bold leading-8">
        {{ $t('joinAGuildWarning.description') }}
      </p>

      <v-button class="w-full mt-16" @click="closeModal">
        <span class="m-auto text-lg leading-6">
          {{ $t('common.OK') }}
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
      return this.$accessor.modal.modals[Modal.JoinAGuildWarning]
    }
  },

  methods: {
    closeModal() {
      this.$accessor.modal.closeModal(Modal.JoinAGuildWarning)
    }
  }
})
</script>
