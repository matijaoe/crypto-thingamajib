<template>
  <div class="card">
    <slot />
  </div>
</template>

<script lang="ts" setup>
// import { defineProps } from 'vue';
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  padding: 1.6rem;
  border: 2px solid var(--border-color);
  background: var(--white);
  border-radius: var(--border-radius);
  box-shadow: 4px 4px 1.2rem var(--shadow-color);
  transition: var(--transition);

  &:hover {
    border-color: var(--primary-200);
    box-shadow: 0 0 2rem 0 var(--primary-100);
  }
}
</style>
