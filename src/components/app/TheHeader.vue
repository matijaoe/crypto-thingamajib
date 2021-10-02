<template>
  <el-header class="header">
    <nav class="nav">
      <ul class="nav__list">
        <li class="nav__item" v-for="(link, i) in navLinks" :key="i">
          <el-tooltip
            :content="link.name"
            placement="bottom"
            effect="light"
            v-if="!isCurrentRoute(link.name)"
            popper-class="font-primary"
            enterable
          >
            <router-link class="nav__link" :to="link.to">
              <base-icon :name="link.icon" size="md" />
              <span class="nav__link--name" v-show="isCurrentRoute(link.name)">{{ link.name }}</span>
            </router-link>
          </el-tooltip>
          <router-link class="nav__link" :to="link.to" v-else>
            <base-icon :name="link.icon" size="md" />
            <span class="nav__link--name" v-show="isCurrentRoute(link.name)">{{ link.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </el-header>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const navLinks = [
  {
    name: 'Home',
    to: '/',
    icon: 'home-2',
  },
  {
    name: 'Personal',
    to: '/personal',
    icon: 'activity',
  },
  {
    name: 'Settings',
    to: '/settings',
    icon: 'settings',
  },
  {
    name: 'About',
    to: '/about',
    icon: 'info-square',
  },
];

const isCurrentRoute = (name: string) => route.name === name;

</script>

<style lang="scss">
.el-header {
  width: 100%;
}

.nav {
  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    gap: 2rem;
    padding-left: 0;
  }

  &__item {
  }

  &__link {
    display: inline-block;
    padding: 0.8rem 1.4rem;
    border-radius: var(--border-radius);
    transition: var(--transition);
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.8rem;

    &:hover {
      background: var(--gray-100);
    }

    &--name {
      transform: scaleX(1);
      transition: all 2s;
      &.hidden {
        transform: scaleX(0);
      }
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
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
