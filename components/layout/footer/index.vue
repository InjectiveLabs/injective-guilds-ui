<template>
  <div class="lg:h-footer w-full shadow-md border-t border-primary-500 py-6">
    <div
      class="container grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4"
    >
      <div class="text-gray-400 text-center sm:text-left">
        <span>&copy; {{ new Date().getFullYear() }} All rights reserved</span>
      </div>

      <div
        class="flex gap-8 justify-center sm:justify-end lg:justify-center text-gray-400 uppercase"
      >
        <a
          class="cursor-pointer hover:text-primary-500"
          href="https://injective.typeform.com/to/oXmYUpfO"
          target="_blank"
        >
          {{ $t('footer.createAGuild') }}
        </a>

        <a
          v-if="false"
          class="cursor-pointer hover:text-primary-500"
          href="https://injectivelabs.org/privacy-policy"
          target="_blank"
        >
          {{ $t('footer.privacyPolicy') }}
        </a>
      </div>

      <div
        class="sm:col-span-2 lg:col-span-1 flex items-center text-gray-400 justify-center lg:justify-end"
      >
        <a
          href="https://twitter.com/InjectiveLabs"
          target="_blank"
          class="hover:text-primary-500"
        >
          <v-icon-twitter class="w-6 h-6" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
