<template>
  <div class="bg-black min-h-screen">
    <VHOCLoading :status="status">
      <client-only>
        <div>
          <TopBar />
          <main class="min-h-screen-excluding-header-footer text-primary-500">
            <nuxt />
          </main>
          <v-modal-join-a-guild-warning />
          <v-modal-leave-guild
            v-if="currentGuildToLeave"
            :guild="currentGuildToLeave"
          />
          <v-modal-join-guild
            v-if="currentGuildToJoin"
            :guild="currentGuildToJoin"
          />
          <Footer />
        </div>
      </client-only>
    </VHOCLoading>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Status, StatusType } from '@injectivelabs/utils'
import TopBar from '~/components/layout/topbar.vue'
import Footer from '~/components/layout/footer/index.vue'
import VModalJoinAGuildWarning from '~/components/partials/modals/join-a-guild-warning.vue'
import VModalLeaveGuild from '~/components/partials/modals/leave-guild.vue'
import VModalJoinGuild from '~/components/partials/modals/join-guild.vue'
import { UiGuildToJoinModal, UiGuildToLeaveModal } from '~/types'

export default Vue.extend({
  components: {
    TopBar,
    Footer,
    VModalJoinGuild,
    VModalJoinAGuildWarning,
    VModalLeaveGuild
  },

  data() {
    return {
      status: new Status(StatusType.Idle)
    }
  },

  head: {
    bodyAttrs: {
      class: 'overflow-fix'
    }
  },

  computed: {
    currentGuildToJoin(): UiGuildToJoinModal {
      return this.$accessor.guild.currentGuildToJoin
    },

    currentGuildToLeave(): UiGuildToLeaveModal {
      return this.$accessor.guild.currentGuildToLeave
    }
  },

  mounted() {
    Promise.all([
      this.$accessor.wallet.init(),
      this.$accessor.wallet.initPage()
    ])
      .then(() => {
        //
      })
      .catch(this.$onError)
      .finally(() => {
        this.status.setIdle()
      })
  },

  beforeDestroy() {
    //
  },

  methods: {
    //
  }
})
</script>
