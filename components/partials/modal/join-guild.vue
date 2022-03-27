<template>
  <v-modal
    :is-open="isModalOpen"
    sm
    :accent="joinStatus === JoinLeaveGuildState.Failed"
    :title="$t('joinGuildModal.title')"
    @modal-closed="closeModal"
  >
    <section class="h-64">
      <div
        v-if="joinStatus === JoinLeaveGuildState.Confirm"
        class="flex flex-col h-full"
      >
        <p class="text-xl font-bold xs:text-2xl xs:leading-8">
          {{ $t('joinGuildModal.description', { name: guild.name }) }}
        </p>

        <div class="flex-grow flex items-center">
          <v-button
            class="w-full"
            :status="status"
            :disabled="!authGranted || status.isLoading()"
            @click="joinGuild"
          >
            <span class="m-auto text-lg leading-6">
              {{ $t('common.confirm') }}
            </span>
          </v-button>
        </div>

        <v-checkbox v-model="authGranted" primary>
          {{ $t('joinGuildModal.grantAuthConfirmationDescription') }}
        </v-checkbox>
      </div>

      <div
        v-else-if="joinStatus === JoinLeaveGuildState.Success"
        class="flex flex-col justify-between h-full"
      >
        <p class="text-2xl font-bold leading-8">
          {{
            $t('joinGuildModal.confirmationDescription', { name: guild.name })
          }}
        </p>

        <v-button class="w-full" @click="closeModal">
          <span class="m-auto text-lg leading-6">
            {{ $t('common.awesome') }}
          </span>
        </v-button>
      </div>

      <div v-else class="flex flex-col justify-between h-full">
        <p class="text-2xl font-bold leading-8">
          {{ $t('joinGuildModal.failedDescription', { name: guild.name }) }}
        </p>

        <v-button class="w-full" accent @click="closeModal">
          <span class="m-auto text-lg leading-6">
            {{ $t('common.alright') }}
          </span>
        </v-button>
      </div>
    </section>
  </v-modal>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Status, StatusType } from '@injectivelabs/utils'
import VModal from '~/components/partials/modal/modal.vue'
import {
  JoinLeaveGuildState,
  Modal,
  UiGuild,
  UiGuildRequirement
} from '~/types'
import { delayPromiseCall } from '~/app/utils/async'

export default Vue.extend({
  components: {
    VModal
  },

  props: {
    guild: {
      type: Object as PropType<UiGuild>,
      required: true
    },

    requirements: {
      type: Array as PropType<UiGuildRequirement[]>,
      required: true
    }
  },

  data() {
    return {
      JoinLeaveGuildState,
      authGranted: false,
      joinStatus: JoinLeaveGuildState.Confirm,
      status: new Status(StatusType.Idle)
    }
  },

  computed: {
    isModalOpen(): boolean {
      const { guild } = this

      return (
        this.$accessor.modal.customModal === `${Modal.JoinGuild}-${guild.id}`
      )
    }
  },

  watch: {
    isModalOpen(isOpen: boolean) {
      if (isOpen) {
        this.authGranted = false
        this.joinStatus = JoinLeaveGuildState.Confirm
      }
    }
  },

  methods: {
    closeModal() {
      this.$accessor.modal.closeCustomModal()
    },

    joinGuild() {
      const { guild } = this

      this.status.setLoading()

      this.grantAuthAndTransferFunds()
        .then(() =>
          delayPromiseCall(
            () => this.$accessor.guild.joinGuild(guild.id),
            3 * 1000
          )
        )
        .then(() => {
          this.joinStatus = JoinLeaveGuildState.Success
        })
        .catch(() => {
          this.joinStatus = JoinLeaveGuildState.Failed
        })
        .finally(() => {
          this.status.setIdle()
        })
    },

    grantAuthAndTransferFunds() {
      // const { requirements } = this

      // const assetsToTransferFromBankToSubaccount = requirements.filter(
      //   ({ outstandingAmountInBase }) => outstandingAmountInBase.gt('0')
      // )

      // console.log(assetsToTransferFromBankToSubaccount)

      return new Promise((resolve) => setTimeout(resolve, 3 * 1000))
    }
  }
})
</script>
