<template>
  <div
    class="
      h-full
      lg:h-footer
      w-full
      shadow-md
      flex flex-wrap
      lg:justify-between
      border-t border-primary-500
      py-4
      items-center
    "
  >
    <div
      class="
        flex flex-col
        sm:flex-row sm:ml-5
        w-full
        lg:w-auto
        justify-between
        sm:justify-around
        lg:justify-start
        items-center
      "
    >
      <div
        class="
          flex
          items-center
          text-gray-400
          lg:ml-6
          xl:ml-7
          text-base
          h-auto
          sm:h-full
        "
      >
        <span>&copy; {{ new Date().getFullYear() }} Open DeFi Foundation</span>
      </div>
    </div>
    <div
      class="
        justify-center
        flex
        lg:justify-end
        flex-wrap
        lg:flex-no-wrap
        h-full
        w-full
        lg:w-auto
      "
    >
      <!--
      <feature-item class="uppercase" :feature="$t('footer.startAGuild')" />
      <feature-item class="uppercase" :feature="$t('footer.item1')" />
      <feature-item class="uppercase" :feature="$t('footer.item2')" />
      -->
      <div class="flex items-center text-gray-400">
        <a
          class="cursor-pointer"
          href="https://injectivelabs.org/privacy-policy"
          target="_blank"
        >
          {{ $t('footer.privacyPolicy') }}
        </a>
      </div>
    </div>

    <div
      class="
        justify-center
        flex
        lg:justify-end
        flex-wrap
        lg:flex-no-wrap
        h-full
        w-full
        lg:w-auto lg:mr-8
        items-center
      "
    >
      <div class="flex items-center text-gray-400">
        <a
          href="https://twitter.com/InjectiveLabs"
          target="_blank"
          class="mr-4"
        >
          <v-icon-twitter class="w-6 h-6" />
        </a>
        <a href="https://discord.gg/injective" target="_blank" class="mr-4">
          <v-icon-discord class="w-6 h-6" />
        </a>
        <a href="https://t.me/joininjective" target="_blank" class="mr-4">
          <v-icon-telegram class="w-6 h-6" />
        </a>
        <a href="https://www.reddit.com/r/injective/" target="_blank">
          <v-icon-reddit class="w-6 h-6" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import FeatureItem from './feature-item.vue'

export default Vue.extend({
  components: {
    // FeatureItem
  }
})
</script>
