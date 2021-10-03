<template>
  <el-date-picker
    class="date-picker"
    v-model="date"
    format="DD.MM.YYYY."
    type="date"
    placeholder="Pick a day"
    :disabled-date="datePicker.disabledDate"
    :shortcuts="datePicker.shortcuts"
    style="margin-left:auto"
  ></el-date-picker>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { getDateDaysAgo, getDateYearsAgo } from '../utils/dates';
import useDatePicker from '@/composables/useDatePicker';

const { date } = useDatePicker();

const datePicker = reactive({
  disabledDate: (time: Date) => time.getTime() > Date.now(),
  shortcuts: [
    {
      text: 'Today',
      value: new Date(),
    },
    {
      text: 'Yesterday',
      value: () => getDateDaysAgo(1),
    },
    {
      text: 'A week ago',
      value: () => getDateDaysAgo(7),
    },
    {
      text: 'A year ago',
      value: () => getDateYearsAgo(1),
    },
    {
      text: 'Three years ago',
      value: () => getDateYearsAgo(3),
    },
  ],
});
</script>

<style lang="scss">
// TODO: check if needed
.el-input__inner {
  border-width: 2px !important;
  border-color: var(--border-color) !important;
  font-family: var(--font-mono) !important;
}
</style>
