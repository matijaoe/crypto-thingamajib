<template>
  <el-date-picker
    v-model="datePicker.date"
    format="DD.MM.YYYY."
    type="date"
    placeholder="Pick a day"
    :disabled-date="datePicker.disabledDate"
    :shortcuts="datePicker.shortcuts"
  ></el-date-picker>
</template>

<script lang="ts" setup>
import {
  reactive, watchEffect, defineEmits,
} from 'vue';
import {
  getDateDaysAgo,
  getDateYearsAgo,
} from '../helpers/dates';

const emits = defineEmits(['dateChange']);

const datePicker = reactive({
  date: new Date(),
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

watchEffect(() => {
  emits('dateChange', datePicker.date);
});

</script>
