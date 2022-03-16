<template>
  <div class="absolute left-0 top-0 h-full w-full">
    <div class="h-full w-full flex flex-col items-center justify-center">
      <div class="loading-spinner">
        <div />
        <div />
        <div />
        <LogoMini class="logo-mini h-8 w-8" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LogoMini from '~/components/svg/logo-mini.vue'

export default Vue.extend({
  components: {
    LogoMini,
  },

  props: {
    logo: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style scoped>
.loading-spinner {
  display: inline-block;
  position: relative;
  width: 48px;
  height: 48px;
}
.loading-spinner div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 48px;
  height: 48px;
  border: 2.3px solid #01cafd;
  border-radius: 50%;
  animation: loading-spinner 1.2s cubic-bezier(0.5, 0.4, 0.8, 1) infinite;
  border-color: #01cafd #01cafd transparent transparent;
}

.loading-spinner .logo-mini {
  margin-top: 9px;
  margin-left: 8px;
}

.loading-spinner div:nth-child(1) {
  animation-delay: -0.3s;
}
.loading-spinner div:nth-child(2) {
  animation-delay: -0.55s;
}
.loading-spinner div:nth-child(3) {
  animation-delay: -0.8s;
}

@keyframes loading-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
