<template>
  <t-popup :visible="visible" destroy-on-close trigger="click" placement="bottom-right" :attach="getAttach">
    <div class="select-color-toggle" variant="outline" @click="visible = !visible">
      <span class="select-color-toggle-value" :style="{ backgroundColor: `${currentValue}` }" />
      <CaretDownSmallIcon />
    </div>
    <template #content>
      <t-radio-group v-model="colorSourceType" size="small" style="margin-bottom: 12px">
        <t-radio-button value="systemColorPannel">{{ locale.systemDefault }}</t-radio-button>
        <t-radio-button value="customColorPannel">{{ locale.custom }}</t-radio-button>
      </t-radio-group>
      <div v-if="colorSourceType === 'systemColorPannel'">
        <div v-for="(row, idx) in SYSTEM_COLORS" :key="idx" class="aw-color-wrap aw-mb-2 aw-flex aw-items-center">
          <template v-for="(color, i) in row" :key="i">
            <t-tooltip :content="color.name" :overlay-style="{ top: '2px' }">
              <span
                :style="{ backgroundColor: `${color.val}` }"
                :class="[
                  'aw-inline-block aw-h-4 aw-w-4 hover:aw-outline hover:aw-outline-1 hover:aw-outline-offset-1 hover:aw-outline-gray-20',
                  colorsEqual(color.val) ? 'aw-outline aw-outline-1 aw-outline-offset-1' : '',
                  i !== 0 ? 'aw-ml-2' : '',
                ]"
                @click="() => handleChangeColor(color.val)"
              >
              </span>
            </t-tooltip>
          </template>
        </div>
      </div>
      <t-color-picker-panel
        v-else
        v-model="currentValue"
        class="select-color-panel"
        style="width: 230px"
        format="HEX"
        :color-modes="['monochrome']"
      />
    </template>
  </t-popup>
</template>

<script lang="ts">
import { ref, PropType, computed, defineComponent } from 'vue';
import { CaretDownSmallIcon } from 'tdesign-icons-vue-next';

import { Popup as TPopup } from '../../../popup';
import { ColorPickerPanel as TColorPickerPanel } from '../../../color-picker';
import { RadioButton as TRadioButton, RadioGroup as TRadioGroup } from '../../../radio';

import { SYSTEM_COLORS } from '../../constant';
import { useAttach, useLocale } from '../../hooks';
import { IAgGridCommon, TEmitEditChange } from '../../types';

export default defineComponent({
  name: 'SelectColor',
  components: {
    TPopup,
    TRadioGroup,
    TRadioButton,
    TColorPickerPanel,
    CaretDownSmallIcon,
  },
  props: {
    modelValue: {
      type: String,
      reuqired: true,
      default: '',
    },
    params: {
      required: true,
      type: Object as PropType<
        IAgGridCommon & {
          onChange: TEmitEditChange;
        }
      >,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const colorSourceType = ref('systemColorPannel');
    const visible = ref(false);
    const { locale } = useLocale();
    const emitEvent = (value: string) => {
      emit('change', value);
      emit('update:modelValue', value);
    };

    const currentValue = computed({
      get() {
        return props.modelValue || '';
      },
      set(value) {
        emitEvent(value);
      },
    });

    const { getAttach } = useAttach('#t-data-grid-create-rules-select-attach', props.params.context.rootRef);

    /**
     * 不同格式颜色值对比
     */
    const colorsEqual = (color1: string) => color1 === currentValue.value;

    const handleChangeColor = (value: string) => {
      visible.value = false;
      emitEvent(value);
    };

    return {
      locale,
      visible,
      getAttach,
      currentValue,
      SYSTEM_COLORS,
      colorSourceType,
      colorsEqual,
      handleChangeColor,
    };
  },
});
</script>

<style lang="scss">
.select-color-toggle {
  min-width: 44px;
  height: 28px;
  width: 100%;
  padding: 4px;
  border: 1px solid #d1d5e6;
  display: flex;
  align-items: center;
  gap: 4px;

  &-value {
    height: 100%;
    flex: 1;
  }
}
.select-color-panel {
  .t-color-picker__head,
  .t-color-picker__swatches-wrap {
    display: none;
  }
  .t-color-picker__body {
    padding: 14px;
  }
}
</style>
