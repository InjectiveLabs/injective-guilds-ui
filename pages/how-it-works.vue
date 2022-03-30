<template>
  <div class="container py-16 text-white">
    <h1 class="text-5xl xs:text-7xl tracking-tight font-bold mb-16">
      {{ $t('howItWorks.title') }}
    </h1>

    <div class="grid md:grid-cols-4 gap-4">
      <div>
        <div class="mt-2 hidden md:block">
          <nuxt-link
            class="leading-5 block tracking-wide"
            :to="{ name: 'how-it-works', hash: '#what-is-trading-guilds' }"
          >
            {{ $t('howItWorks.headerOne') }}
          </nuxt-link>
          <nuxt-link
            class="leading-5 block tracking-wide mt-6"
            :to="{ name: 'how-it-works', hash: '#why-use-trading-guilds' }"
          >
            {{ $t('howItWorks.headerTwo') }}
          </nuxt-link>
          <nuxt-link
            class="leading-5 block tracking-wide mt-6"
            :to="{ name: 'how-it-works', hash: '#are-there-any-fees' }"
          >
            {{ $t('howItWorks.headerThree') }}
          </nuxt-link>
          <nuxt-link
            class="leading-5 block tracking-wide mt-6"
            :to="{
              name: 'how-it-works',
              hash: '#how-is-authorization-granted-to-the-guild-master'
            }"
          >
            {{ $t('howItWorks.headerFour') }}
          </nuxt-link>
          <nuxt-link
            class="leading-5 block tracking-wide mt-6"
            :to="{
              name: 'how-it-works',
              hash: '#how-can-I-create-a-guild'
            }"
          >
            {{ $t('howItWorks.headerFive') }}
          </nuxt-link>
        </div>
      </div>
      <div class="col-span-3">
        <div id="what-is-trading-guilds" class="scroll-item">
          <h3 class="font-bold text-3.5xl tracking-tight mb-6">
            {{ $t('howItWorks.headerOne') }}
          </h3>
          <p class="text-lg leading-7">{{ $t('howItWorks.descriptionOne') }}</p>
        </div>
        <div id="why-use-trading-guilds" class="scroll-item mt-12">
          <h3 class="font-bold text-3.5xl tracking-tight mb-6">
            {{ $t('howItWorks.headerTwo') }}
          </h3>
          <p class="text-lg leading-7">{{ $t('howItWorks.descriptionOne') }}</p>
        </div>
        <div id="are-there-any-fees" class="scroll-item mt-12">
          <h3 class="font-bold text-3.5xl tracking-tight mb-6">
            {{ $t('howItWorks.headerThree') }}
          </h3>
          <p class="text-lg leading-7">
            {{ $t('howItWorks.descriptionThree') }}
          </p>
        </div>
        <div
          id="how-is-authorization-granted-to-the-guild-master"
          class="scroll-item mt-12"
        >
          <h3 class="font-bold text-3.5xl tracking-tight mb-6">
            {{ $t('howItWorks.headerFour') }}
          </h3>
          <p class="text-lg leading-7">
            {{ $t('howItWorks.descriptionFour') }}
          </p>
        </div>
        <div id="how-can-I-create-a-guild" class="scroll-item mt-12">
          <h3 class="font-bold text-3.5xl tracking-tight mb-6">
            {{ $t('howItWorks.headerFive') }}
          </h3>
          <i18n
            path="howItWorks.descriptionFive"
            tag="p"
            class="text-lg leading-7"
          >
            <template #link>
              <a
                href="https://injective.typeform.com/to/oXmYUpfO."
                target="_blank"
                class="text-primary-500 hover:text-primary-600 -mr-1"
              >
                https://injective.typeform.com/to/oXmYUpfO
              </a>
            </template>
          </i18n>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
    if (this.$route.hash) {
      this.scrollToElement(this.$route.hash)
    }
  },

  methods: {
    scrollToElement(hash: string) {
      const el = document.getElementById(hash.replace('#', ''))?.offsetTop

      window.scrollTo({
        top: el ? el - 12 : 0,
        behavior: 'smooth'
      })
    }
  }
})
</script>
