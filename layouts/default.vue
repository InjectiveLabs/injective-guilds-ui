<template>
  <div class="min-h-screen bg-black">
    <HOCLoading :status="status">
      <client-only>
        <div>
          <TopBar />
          <main class="w-full h-full flex flex-col min-h-screen">
            <div class="relative flex-grow">
              <nuxt />
            </div>
          </main>
          <Footer />
        </div>
      </client-only>
    </HOCLoading>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Status, StatusType } from '@injectivelabs/utils'
import HOCLoading from '~/components/hoc/loading.vue'
import TopBar from '~/components/elements/layout/topbar.vue'
import Footer from '~/components/elements/layout/footer/index.vue'

export default Vue.extend({
  components: {
    HOCLoading,
    TopBar,
    Footer,
  },

  data() {
    return {
      status: new Status(StatusType.Idle),
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
  },
})
</script>
