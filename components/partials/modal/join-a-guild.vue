<template>
  <v-modal
    :is-open="isModalOpen"
    sm
    :title="$t('joinAGuild.title')"
    @modal-closed="closeModal"
  >
    <section>
      <p class="text-2xl font-bold leading-8">
        {{ $t('joinAGuild.description') }}
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
      return this.$accessor.modal.modals[Modal.JoinAGuild]
    }
  },

  methods: {
    closeModal() {
      this.$accessor.modal.closeModal(Modal.JoinAGuild)
    }
  }
})
</script>
