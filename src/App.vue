<template>
  <el-container>
    <TheHeader />
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import TheHeader from '@/components/app/TheHeader.vue';
</script>

<style lang="scss">
@import "./assets/scss/base.scss";
@import "./assets/scss/element_plus_override.scss";

.el-container {
  flex-direction: column !important;
  overflow-x: hidden;
}
</style>
