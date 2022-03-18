<template>
  <div class="text-white">
    <span class="font-logo text-9xl"> {{ $t('tradingGuild') }}</span>
    <span @click="logout">Temp logout button</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    logout() {
      this.$accessor.wallet.logout()
    }
  }
})
</script>
