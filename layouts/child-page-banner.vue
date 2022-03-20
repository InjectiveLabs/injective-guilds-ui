<template>
  <section class="relative">
    <div class="absolute inset-0 h-full w-full banner-overlay z-30" />
    <section
      :style="{ backgroundImage: `url('/svg/child-page-banner.svg')` }"
      class="py-16 bg-cover bg-right-bottom h-full absolute inset-0"
    />

    <div class="relative container flex h-full items-center py-16 m-auto z-40">
      <slot />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.banner-overlay {
  background: linear-gradient(
    90.56deg,
    rgba(0, 0, 0, 0.3) 15.79%,
    rgba(0, 0, 0, 0.3) 56.03%
  );
  backdrop-filter: blur(20px);
}
</style>
