<template>
  <el-select
    v-model="selectedCurrency"
    filterable
    placeholder="Select currency"
    @change="selectCurrency"
  >
    <el-option
      v-for="curr in currencies"
      :key="curr"
      :label="curr.toUpperCase()"
      :value="curr"
      class="currency-option"
    >
      <span class="currency-option__code">{{ curr }}</span>
      <base-icon :name="getCurrencyIcon(curr)" size="sm"></base-icon>
    </el-option>
  </el-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { getCurrencyIcon } from '@/utils/currency';

const { state, getters, commit } = useStore();

const selectedCurrency = ref<string | null>(state.currency);
const currencies = getters['currencies/getCurrencyCodes'];

const selectCurrency = () => {
  commit('setCurrency', selectedCurrency.value);
};

</script>

<style lang="scss" scoped>
.currency-option {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__code {
    text-transform: uppercase;
    font-weight: bold;
  }
}
</style>
