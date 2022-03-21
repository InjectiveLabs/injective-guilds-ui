<template>
  <v-modal
    :is-open="isModalOpen"
    accent
    sm
    :title="$t('guildModal.title')"
    @modal-closed="closeModal"
  >
    <section>
      <p class="text-2xl font-bold leading-8">
        {{ $t('guildModal.leaveDescription', { guild: guild.name }) }}
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
import { Modal, MyGuild } from '~/types'

export default Vue.extend({
  components: {
    VModal
  },

  props: {
    guild: {
      type: Object as PropType<MyGuild>,
      default: () => {}
    }
  },

  computed: {
    isModalOpen(): boolean {
      return this.$accessor.modal.modals[Modal.LeaveGuild]
    }
  },

  methods: {
    closeModal() {
      this.$accessor.modal.closeModal(Modal.LeaveGuild)
    },

    handleConfirm() {
      this.closeModal()
    },

    handleCancel() {
      this.closeModal()
    }
  }
})
</script>
