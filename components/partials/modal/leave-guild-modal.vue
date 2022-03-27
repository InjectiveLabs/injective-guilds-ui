<template>
  <v-modal
    :is-open="isModalOpen"
    accent
    sm
    :title="$t('leaveGuildModal.title')"
    @modal-closed="closeModal"
  >
    <section>
      <p class="text-2xl font-bold leading-8">
        {{ $t('leaveGuildModal.leaveDescription', { guild: guild.name }) }}
      </p>

      <v-button class="w-full mt-16" accent @click="handleConfirm">
        <span class="m-auto text-lg leading-6">
          {{ $t('common.confirm') }}
        </span>
      </v-button>
    </section>
  </v-modal>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import VModal from '~/components/partials/modal/modal.vue'
import { Modal, UiGuild } from '~/types'

export default Vue.extend({
  components: {
    VModal
  },

  props: {
    guild: {
      type: Object as PropType<UiGuild>,
      required: true
    }
  },

  computed: {
    isModalOpen(): boolean {
      const { guild } = this

      return (
        this.$accessor.modal.customModal === `${Modal.LeaveGuild}-${guild.id}`
      )
    }
  },

  methods: {
    closeModal() {
      this.$accessor.modal.closeCustomModal()
    },

    handleConfirm() {
      this.closeModal()
    }
  }
})
</script>
