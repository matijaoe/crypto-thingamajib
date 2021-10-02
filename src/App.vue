<template>
  <el-container>
    <TheHeader />
    <el-main>
      <router-view />
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

.el-container {
  flex-direction: column !important;
}
</style>
