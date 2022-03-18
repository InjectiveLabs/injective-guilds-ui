<template>
  <section class="relative">
    <div class="absolute inset-0 h-full w-full banner-overlay" />
    <section
      :style="{ backgroundImage: `url('/svg/child-page-banner.svg')` }"
      class="py-16 bg-cover bg-right-bottom h-full"
    />

    <div class="container flex h-full items-center absolute inset-0">
      <slot />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.banner-overlay {
  background: linear-gradient(
    90.56deg,
    rgba(0, 0, 0, 0.5) 15.79%,
    rgba(0, 0, 0, 0.5) 56.03%
  );
  backdrop-filter: blur(50px);
}
</style>
