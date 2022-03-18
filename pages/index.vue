<template>
  <div>
    <section
      :style="{ backgroundImage: `url('/svg/homepage-banner.svg')` }"
      class="py-16 bg-cover bg-right-bottom h-banner"
    >
      <div class="container flex h-full items-center">
        <div class="text-white">
          <p class="font-logo text-9xl">{{ $t('tradingGuild.title') }}</p>
          <p class="text-lg mt-8 max-w-lg">
            {{ $t('tradingGuild.description') }}
          </p>
        </div>
      </div>
    </section>
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
