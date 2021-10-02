<template>
  <el-container>
    <TheHeader />
    <el-main>
      <i class="ti ti-home"></i>
      <router-view v-slot="{ Component }">
        <transition name="slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
// import { useStore } from 'vuex';
import TheHeader from '@/components/app/TheHeader.vue';

// const store = useStore();
// console.log(store.state.coins);
</script>

<style lang="scss">
@import "./assets/scss/base.scss";
@import "./assets/scss/element_plus_override.scss";

.el-container {
  flex-direction: column !important;
  overflow-x: hidden;
}

// TODO
// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.5s;
// }
// .fade-enter,
// .fade-leave-to {
//   opacity: 0;
// }

// .slide-left-enter-active,
// .slide-left-leave-active,
// .slide-right-enter-active,
// .slide-right-leave-active {
//   transition-duration: 0.5s;
//   transition-property: height, opacity, transform;
//   transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
//   overflow: hidden;
// }

// .slide-left-enter,
// .slide-right-leave-active {
//   opacity: 0;
//   transform: translate(2em, 0);
// }

// .slide-left-leave-active,
// .slide-right-enter {
//   opacity: 0;
//   transform: translate(-2em, 0);
// }
</style>
