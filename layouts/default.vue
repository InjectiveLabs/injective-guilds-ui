<template>
  <div class="bg-black">
    <VHOCLoading :status="status">
      <client-only>
        <div>
          <TopBar />
          <main class="min-h-screen-excluding-header-footer pb-16">
            <nuxt />
          </main>
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

export default Vue.extend({
  components: {
    TopBar,
    Footer
  },

  data() {
    return {
      status: new Status(StatusType.Idle)
    }
  },

  mounted() {
    //
  },

  beforeDestroy() {
    //
  },

  methods: {
    //
  }
})
</script>
