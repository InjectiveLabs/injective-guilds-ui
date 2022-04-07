<template>
  <div class="bg-black min-h-screen">
    <VHOCLoading :status="status">
      <client-only>
        <div>
          <SidebarMobile
            :is-sidebar-open="isOpenSidebar"
            @sidebar-closed="closeSideBar"
          />
          <div class="flex flex-col">
            <TopBar @sidebar-opened="isOpenSidebar = true" />
            <main class="min-h-screen-excluding-header-footer text-primary-500">
              <nuxt />
            </main>
            <v-modal-account-restricted />
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
import VModalAccountRestricted from '~/components/partials/modals/account-restricted.vue'
import { UiGuildToJoinModal, UiGuildToLeaveModal } from '~/types'
import SidebarMobile from '~/components/layout/sidebar-mobile.vue'

export default Vue.extend({
  components: {
    TopBar,
    Footer,
    VModalAccountRestricted,
    VModalJoinGuild,
    VModalJoinAGuildWarning,
    VModalLeaveGuild,
    SidebarMobile
  },

  data() {
    return {
      status: new Status(StatusType.Idle),
      isOpenSidebar: false
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
    this.$root.$on('nav-link-clicked', this.closeSideBar)

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

    Promise.all([this.$accessor.app.init()])
      .then(() => {})
      .catch(this.$onError)
  },

  beforeDestroy() {
    //
  },

  methods: {
    //
    closeSideBar() {
      this.isOpenSidebar = false
    }
  }
})
</script>
