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
      <item class="lg:ml-6 xl:ml-7 text-base h-auto sm:h-full">
        <span>&copy; {{ new Date().getFullYear() }} Open DeFi Foundation</span>
      </item>
    </div>
    <ul
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
      <feature-item :feature="$t('footer.startAGuild')" />
      <feature-item :feature="$t('footer.item1')" />
      <feature-item :feature="$t('footer.item2')" />
      <item class="text-footer">
        <a
          class="cursor-pointer"
          href="https://injectivelabs.org/privacy-policy"
          target="_blank"
        >
          {{ $t('footer.privacyPolicy') }}
        </a>
      </item>
    </ul>

    <ul
      class="
        justify-center
        flex
        lg:justify-end
        flex-wrap
        lg:flex-no-wrap
        h-full
        w-full
        lg:w-auto lg:mr-8
      "
    >
      <item>
        <div class="flex">
          <a href="https://twitter.com/InjectiveLabs" class="mr-4">
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
      </item>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Item from './item.vue'
import FeatureItem from './feature-item.vue'

export default Vue.extend({
  components: {
    Item,
    FeatureItem,
  },
})
</script>
