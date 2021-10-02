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
  padding: 1.6rem;
  border: 2px solid var(--border-color);
  background: var(--white);
  border-radius: var(--border-radius);
  box-shadow: 4px 4px 1.2rem var(--shadow-color);
  transition: var(--transition);

  &:hover {
    border-color: var(--primary-200);
    box-shadow: 3px 3px 1.2rem 6px var(--primary-50),
      -1px -1px 1.2rem var(--primary-50);
  }
}
</style>
