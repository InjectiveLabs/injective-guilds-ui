<template>
  <v-modal
    :is-open="isModalOpen"
    accent
    sm
    :title="$t('leaveGuildModal.title')"
    @modal-closed="closeModal"
  >
    <VHOCLoading
      :status="fetchStatus"
      accent
      :class="{ 'min-h-[240px] relative z-10': fetchStatus.isLoading() }"
    >
      <section v-if="guild" class="h-64">
        <div
          v-if="joinState === JoinLeaveGuildState.Confirm"
          class="flex flex-col justify-between h-full"
        >
          <div>
            <p class="text-xl font-bold xs:text-2xl xs:leading-8">
              {{ $t('leaveGuildModal.description', { name: guild.name }) }}
            </p>
            <ul class="list-disc ml-4 text-sm mt-2">
              <li>{{ $t('leaveGuildModal.subDescriptionOne') }}</li>
              <li>{{ $t('leaveGuildModal.subDescriptionTwo') }}</li>
              <li>{{ $t('leaveGuildModal.subDescriptionThree') }}</li>
            </ul>
          </div>

          <v-button
            class="w-full"
            accent
            :status="status"
            :disabled="status.isLoading()"
            @click="leaveGuild"
          >
            <span class="m-auto text-lg leading-6">
              {{ $t('common.confirm') }}
            </span>
          </v-button>
        </div>

        <div
          v-else-if="joinState === JoinLeaveGuildState.Success"
          class="flex flex-col justify-between h-full"
        >
          <p class="text-2xl font-bold leading-8">
            {{
              $t('leaveGuildModal.confirmationDescription', {
                name: guild.name
              })
            }}
          </p>

          <v-button class="w-full" accent @click="closeModal">
            <span class="m-auto text-lg leading-6">
              {{ $t('common.OK') }}
            </span>
          </v-button>
        </div>

        <div v-else class="flex flex-col justify-between h-full">
          <p class="text-2xl font-bold leading-8">
            {{ $t('leaveGuildModal.failedDescription', { name: guild.name }) }}
          </p>

          <v-button class="w-full" accent @click="closeModal">
            <span class="m-auto text-lg leading-6">
              {{ $t('common.alright') }}
            </span>
          </v-button>
        </div>
      </section>
    </VHOCLoading>
  </v-modal>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Status, StatusType } from '@injectivelabs/utils'
import VModal from '~/components/partials/common/modal.vue'
import { JoinLeaveGuildState, Modal, UiGuild } from '~/types'

export default Vue.extend({
  components: {
    VModal
  },

  props: {
    guild: {
      required: true,
      type: Object as PropType<UiGuild>
    }
  },

  data() {
    return {
      JoinLeaveGuildState,
      joinState: JoinLeaveGuildState.Confirm,
      status: new Status(StatusType.Idle),
      fetchStatus: new Status(StatusType.Idle)
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

    leaveGuild() {
      const { guild } = this

      if (!guild) {
        return
      }

      this.status.setLoading()

      this.$accessor.guild
        .leaveGuild(guild)
        .then(() => {
          this.joinState = JoinLeaveGuildState.Success
        })
        .catch((e) => {
          this.joinState = JoinLeaveGuildState.Failed
          this.$onError(e)
        })
        .finally(() => {
          this.status.setIdle()
        })
    }
  }
})
</script>
