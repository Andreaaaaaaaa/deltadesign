import { provide, inject, ref, Ref } from 'vue';

const TEMP_TIME_KEY = Symbol('tempTime');
const CHANGE_TEMP_TIME_KEY = Symbol('changeTempTime');

// time选择器临时时间
export const useInjectTempTime = () => {
  const tempTime = inject<Ref<Date[] | undefined>>(TEMP_TIME_KEY);
  const changeTempTime = inject<((time: Date[] | undefined) => void)>(CHANGE_TEMP_TIME_KEY, () => {});

  return {
    tempTime,
    changeTempTime,
  };
};

export const useProvideTempTime = () => {
  const tempTime = ref<Date[] | undefined>(undefined);
  const changeTempTime = (time: Date[] | undefined) => {
    tempTime.value = time;
  };

  provide(TEMP_TIME_KEY, tempTime);
  provide(CHANGE_TEMP_TIME_KEY, changeTempTime);

  return {
    tempTime,
    changeTempTime,
  };
};
