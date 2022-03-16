<template>
  <div class="min-h-screen bg-black">
    <HOCLoading :status="status">
      <client-only>
        <TopBar />
        <main>
          <nuxt />
        </main>
      </client-only>
    </HOCLoading>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Status, StatusType } from '@injectivelabs/utils'
import HOCLoading from '~/components/hoc/loading.vue'
import TopBar from '~/components/elements/layout/topbar.vue'

export default Vue.extend({
  components: {
    HOCLoading,
    TopBar,
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
