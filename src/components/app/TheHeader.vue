<template>
  <el-header class="header">
    <nav class="nav">
      <ul class="nav__list">
        <li class="nav__item">
          <router-link class="nav__link" to="/">Home</router-link>
        </li>
        <li>
          <router-link class="nav__link" to="/about">About</router-link>
        </li>
      </ul>
    </nav>
  </el-header>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
.el-header {
  width: 100%;
}

.nav {
  &__list {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding-left: 0;
  }

  &__item {
  }

  &__link {
    display: inline-block;
    padding: 0.4rem 1.4rem;
    border-radius: var(--border-radius);
    transition: var(--transition);
    font-weight: bold;

    &:hover {
      background: var(--gray-100);
    }
  }
}

.router-link-exact-active {
  //your desired design when link is clicked
  background: var(--primary-100);
  color: var(--primary-800);
  border-color: transparent;

  &:hover {
    background: var(--primary-200);
  }
}
</style>
