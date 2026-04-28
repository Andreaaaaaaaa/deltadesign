<template>
  <span
    :data-key="innerParams.key"
    :class="{
      'edit-toolbar-item': true,
      active: innerParams.active,
      'edit-toolbar-item--disabled': innerParams?.disabled,
    }"
    @click="() => handleClick()"
  >
    <!-- <img v-if="innerParams?.svgIcon" :src="innerParams?.svgIcon" /> -->
    <Svg v-if="innerParams?.svgIcon === 'COLOR'">
      <path
        d="M5 8.54545L6.00001 6.36364M11 8.54545L9.99999 6.36364M9.99999 6.36364L9.5 5.27273L8 2L6.5 5.27273L6.00001 6.36364M9.99999 6.36364H6.00001"
        stroke="#202020"
        stroke-opacity="0.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <line x1="4.5" y1="12.5" x2="11.5" y2="12.5" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    </Svg>
    <Svg v-if="innerParams?.svgIcon === 'BGCOLOR'">
      <path
        d="M12.875 6.5L13.6342 7.9C13.789 8.18722 13.7886 8.53851 13.633 8.82531C13.4775 9.11212 13.1897 9.29233 12.875 9.3C12.5603 9.29233 12.2725 9.11212 12.1169 8.82531C11.9614 8.53851 11.961 8.18722 12.1158 7.9L12.875 6.5Z"
        fill="#202020"
        fill-opacity="0.6"
      />
      <path
        d="M3.5 12.5C3.5 11.9477 3.94772 11.5 4.5 11.5L11.5 11.5C12.0523 11.5 12.5 11.9477 12.5 12.5C12.5 13.0523 12.0523 13.5 11.5 13.5L4.5 13.5C3.94772 13.5 3.5 13.0523 3.5 12.5Z"
        fill="currentColor"
        stroke="currentColor"
        stroke-linecap="round"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.79044 1.73359C8.93616 0.879316 7.54012 0.890308 6.67229 1.75814L4.15813 4.2723C3.2903 5.14013 3.27931 6.53617 4.13358 7.39044L5.98974 9.2466C6.84401 10.1009 8.24005 10.0899 9.10788 9.22204L11.622 6.70789C12.4899 5.84006 12.5009 4.44401 11.6466 3.58974L9.79044 1.73359ZM7.29101 2.37686C7.81171 1.85616 8.64933 1.84956 9.1619 2.36213L11.0181 4.21828C11.5306 4.73085 11.524 5.56847 11.0033 6.08917L10.6024 6.49011H4.55397C4.26517 5.98642 4.34046 5.32741 4.77685 4.89102L7.29101 2.37686Z"
        fill="#202020"
        fill-opacity="0.6"
      />
    </Svg>
    <icon-font
      v-if="innerParams?.icon"
      :name="innerParams?.icon"
      :style="{
        color: innerParams?.disabled ? 'inhert' : '#202020',
      }"
    />
    <em v-if="innerParams?.name">{{ innerParams?.name }}</em>
    <icon-font
      v-if="innerParams?.childIcon"
      :style="{
        color: innerParams?.disabled ? 'inhert' : '#202020',
      }"
      name="caret-down-small"
    />
  </span>
</template>

<script lang="ts">
import { toRefs, defineComponent, computed, PropType } from 'vue';
import { IconFont } from 'tdesign-icons-vue-next';
import Svg from './Svg.vue';
import { IHeaderEditToolbar } from '../../../types';

export default defineComponent({
  name: 'ToolbarItem',
  components: {
    IconFont,
    Svg,
  },
  props: {
    params: {
      type: Object as PropType<IHeaderEditToolbar>,
      required: true,
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const { params } = toRefs(props);
    const innerParams = computed(() => params.value);

    const handleClick = () => {
      emit('click', {});
    };

    return {
      innerParams,
      handleClick,
    };
  },
});
</script>
