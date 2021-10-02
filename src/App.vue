<template>
  <el-container>
    <TheHeader />
    <el-main>
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
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
</style>
