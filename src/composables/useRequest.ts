import { readonly, ref } from 'vue';

export default () => {
  const loading = ref(false);
  const payload = ref(null);

  const makeRequest = async (url: string) => {
    loading.value = true;
    const res = await fetch(url);
    payload.value = await res.json();
  };

  return {
    payload: readonly(payload),
    loading: readonly(loading),
    makeRequest,
  };
};
