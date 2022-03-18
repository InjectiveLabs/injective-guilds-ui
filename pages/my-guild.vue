<template>
  <div>
    <v-banner class="h-banner">
      <div class="text-white">
        <p class="font-logo text-9xl">{{ $t('myGuild.title') }}</p>
        <p class="text-lg mt-8 max-w-lg">
          {{ $t('myGuild.description') }}
        </p>
      </div>
    </v-banner>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VBanner from '~/layouts/child-page-banner.vue'
// linear-gradient(90.56deg, rgba(0, 0, 0, 0.5) 15.79%, rgba(0, 0, 0, 0.5) 56.03%);

export default Vue.extend({
  components: {
    VBanner
  }
})
</script>
