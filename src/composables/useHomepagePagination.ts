import { ref, computed, readonly } from 'vue';

const PER_PAGE = 12;

const currentPage = ref<number>(1);
const perPage = ref<number>(PER_PAGE);
const totalCount = ref<number>(0);

export default () => {
  const totalPages = computed(() => totalCount.value / perPage.value);

  const setPage = (page: number) => {
    currentPage.value = page;
  };

  const setTotalCount = (count: number) => {
    totalCount.value = count;
  };

  const setPerPage = (count: number) => {
    perPage.value = count;
  };

  return {
    totalPages: readonly(totalPages),
    currentPage: readonly(currentPage),
    perPage: readonly(perPage),
    totalCount: readonly(totalCount),
    setPage,
    setTotalCount,
    setPerPage,
  };
};
