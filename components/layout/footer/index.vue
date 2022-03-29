<template>
  <div class="lg:h-footer w-full shadow-md border-t border-primary-500 py-6">
    <div
      class="container grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4"
    >
      <div class="text-gray-400 text-center sm:text-left">
        <span>&copy; {{ new Date().getFullYear() }} Open DeFi Foundation</span>
      </div>

      <div class="flex gap-8 justify-center sm:justify-end lg:justify-start">
        <a
          v-if="false"
          class="cursor-pointer text-primary-500 hover:text-primary-600 uppercase"
          href="https://injectivelabs.org/privacy-policy"
          target="_blank"
        >
          {{ $t('footer.startAGuild') }}
        </a>

        <a
          class="cursor-pointer text-gray-400 hover:text-primary-500"
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
          class="mr-4 hover:text-primary-500"
        >
          <v-icon-twitter class="w-6 h-6" />
        </a>
        <a
          href="https://discord.gg/injective"
          target="_blank"
          class="mr-4 hover:text-primary-500"
        >
          <v-icon-discord class="w-6 h-6" />
        </a>
        <a
          href="https://t.me/joininjective"
          target="_blank"
          class="mr-4 hover:text-primary-500"
        >
          <v-icon-telegram class="w-6 h-6" />
        </a>
        <a
          href="https://www.reddit.com/r/injective/"
          target="_blank"
          class="hover:text-primary-500"
        >
          <v-icon-reddit class="w-6 h-6" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
