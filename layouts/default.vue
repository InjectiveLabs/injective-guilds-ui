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
          <v-modal-leave-guild />
          <Footer />
        </div>
      </client-only>
    </VHOCLoading>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Status, StatusType } from '@injectivelabs/utils'
import TopBar from '~/components/elements/layout/topbar.vue'
import Footer from '~/components/elements/layout/footer/index.vue'
import VModalJoinAGuildWarning from '~/components/partials/modals/join-a-guild-warning.vue'
import VModalLeaveGuild from '~/components/partials/modals/leave-guild.vue'

export default Vue.extend({
  components: {
    TopBar,
    Footer,
    VModalJoinAGuildWarning,
    VModalLeaveGuild
  },

  data() {
    return {
      status: new Status(StatusType.Idle)
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
