import { computed } from 'vue';
import { localeStore } from '../locale';

export const useLocale = () => {
  const locale = computed(() => localeStore.getLocals());
  return { locale };
};
