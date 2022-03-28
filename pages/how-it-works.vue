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
            :to="{ name: 'how-it-works', hash: '#one' }"
          >
            {{ $t('howItWorks.headerOne') }}
          </nuxt-link>
          <nuxt-link
            class="leading-5 block tracking-wide mt-6"
            :to="{ name: 'how-it-works', hash: '#two' }"
          >
            {{ $t('howItWorks.headerTwo') }}
          </nuxt-link>
          <nuxt-link
            class="leading-5 block tracking-wide mt-6"
            :to="{ name: 'how-it-works', hash: '#three' }"
          >
            {{ $t('howItWorks.headerThree') }}
          </nuxt-link>
          <nuxt-link
            class="leading-5 block tracking-wide mt-6"
            :to="{ name: 'how-it-works', hash: '#four' }"
          >
            {{ $t('howItWorks.headerFour') }}
          </nuxt-link>
        </div>
      </div>
      <div class="col-span-3">
        <div id="one" class="scroll-item">
          <h3 class="font-bold text-3.5xl tracking-tight mb-6">
            {{ $t('howItWorks.headerOne') }}
          </h3>
          <p class="text-lg leading-7">{{ $t('howItWorks.descriptionOne') }}</p>
          <p class="text-lg leading-7">{{ $t('howItWorks.descriptionOne') }}</p>
          <p class="text-lg leading-7">{{ $t('howItWorks.descriptionOne') }}</p>
          <p class="text-lg leading-7">{{ $t('howItWorks.descriptionOne') }}</p>
          <p class="text-lg leading-7">{{ $t('howItWorks.descriptionOne') }}</p>
        </div>
        <div id="two" class="scroll-item mt-12">
          <h3 class="font-bold text-3.5xl tracking-tight mb-6">
            {{ $t('howItWorks.headerOne') }}
          </h3>
          <p class="text-lg leading-7">{{ $t('howItWorks.descriptionOne') }}</p>
          <p class="text-lg leading-7">{{ $t('howItWorks.descriptionTwo') }}</p>
          <p class="text-lg leading-7">{{ $t('howItWorks.descriptionTwo') }}</p>
          <p class="text-lg leading-7">{{ $t('howItWorks.descriptionTwo') }}</p>
          <p class="text-lg leading-7">{{ $t('howItWorks.descriptionTwo') }}</p>
        </div>
        <div id="three" class="scroll-item mt-12">
          <h3 class="font-bold text-3.5xl tracking-tight mb-6">
            {{ $t('howItWorks.headerThree') }}
          </h3>
          <p class="text-lg leading-7">
            {{ $t('howItWorks.descriptionThree') }}
          </p>
          <p class="text-lg leading-7">
            {{ $t('howItWorks.descriptionThree') }}
          </p>
          <p class="text-lg leading-7">
            {{ $t('howItWorks.descriptionThree') }}
          </p>
          <p class="text-lg leading-7">
            {{ $t('howItWorks.descriptionThree') }}
          </p>
          <p class="text-lg leading-7">
            {{ $t('howItWorks.descriptionThree') }}
          </p>
        </div>
        <div id="four" class="scroll-item mt-12">
          <h3 class="font-bold text-3.5xl tracking-tight mb-6">
            {{ $t('howItWorks.headerFour') }}
          </h3>
          <p class="text-lg leading-7">
            {{ $t('howItWorks.descriptionFour') }}
          </p>
          <p class="text-lg leading-7">
            {{ $t('howItWorks.descriptionFour') }}
          </p>
          <p class="text-lg leading-7">
            {{ $t('howItWorks.descriptionFour') }}
          </p>
          <p class="text-lg leading-7">
            {{ $t('howItWorks.descriptionFour') }}
          </p>
          <p class="text-lg leading-7">
            {{ $t('howItWorks.descriptionFour') }}
          </p>
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
