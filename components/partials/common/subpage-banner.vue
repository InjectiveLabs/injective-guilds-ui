<template>
  <section class="relative">
    <section
      :style="{ backgroundImage: `url('/images/subpage-banner-blur.jpg')` }"
      class="py-16 bg-cover bg-right-top h-full absolute inset-0"
    />

    <div class="relative container flex h-full items-center py-16 m-auto z-40">
      <slot />
    </div>
  </section>
</template>
