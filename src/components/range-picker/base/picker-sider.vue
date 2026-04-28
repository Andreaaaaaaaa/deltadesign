<template>
  <div class="aw-range-picker-side">
    <div v-if="btnCustomRangeOptions.length" class="aw-range-picker-side-tab">
      <div class="aw-range-picker-side-tab-item" :class="{ 'aw-range-picker-side-tab-item-active': activeTab === 'quick' }" @click="handleChangeActiveTab('quick')">{{ globalConfig.quickOptionsLabel }}</div>
      <div class="aw-range-picker-side-tab-divider"></div>
      <div class="aw-range-picker-side-tab-item" :class="{ 'aw-range-picker-side-tab-item-active': activeTab === 'custom' }" @click="handleChangeActiveTab('custom')">{{ globalConfig.businessCalendarLabel }}</div>
    </div>
    <div v-if="activeTab === 'custom'" class="aw-range-picker-side-search">
      <t-input size="small" :placeholder="globalConfig.searchCalendarPlaceholder" :value="searchText" @change="handleSearch">
        <template #prefixIcon>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 1.5C3.96245 1.5 1.5 3.96245 1.5 7C1.5 10.0376 3.96245 12.5 7 12.5C8.38797 12.5 9.65586 11.9859 10.6236 11.1377L13.6914 14.1983C13.8868 14.3934 14.2034 14.393 14.3985 14.1975C14.5935 14.002 14.5931 13.6855 14.3976 13.4904L11.3132 10.413C12.0563 9.47524 12.5 8.28944 12.5 7C12.5 3.96245 10.0376 1.5 7 1.5ZM2.5 7C2.5 4.51473 4.51473 2.5 7 2.5C9.48527 2.5 11.5 4.51473 11.5 7C11.5 9.48527 9.48527 11.5 7 11.5C4.51473 11.5 2.5 9.48527 2.5 7Z" fill="#202020" fill-opacity="0.6"/>
          </svg>
        </template>
      </t-input>
    </div>
    <div class="aw-range-picker-side-time-container">
      <div ref="sideTimeContainerRef" class="aw-range-picker-side-time" @mouseenter="handleMouseEnterSideTime" @mouseleave="handleMouseLeaveSideTime">
        <template v-if="activeTab === 'quick'">
          <template v-if="isPrivateCompare">
            <div class="aw-range-picker-side-title">
              <span class="aw-range-picker-side-title-text">{{ globalConfig.baseBaseLabel }}</span>
              <span class="aw-range-picker-side-title-line"></span>
            </div>
            <!-- 前一时间段 -->
            <range-picker-button
              :inner-type="innerValue.type"
              :option="{
                ...CONST.RANGE_COMPARE_TIME[0],
                regex: undefined
              }"
              @click-side-btn="handleSideTimeBtnClick"
            />
            <range-picker-button
              :inner-type="innerValue.type"
              :active="sideTimeCompareActive"
              :option="{
                ...CONST.RANGE_COMPARE_TIME[0],
                title: CONST.globalConfig.dynamicCompareLabel,
                type: innerValue.type,
              }"
              @click-side-btn="handleSideTimeRelativeClick(CONST.RANGE_COMPARE_TIME[0])"
            />
            <range-picker-button
              v-for="(rangeTimeItem, rangeTimeItemIndex) in btnCompareOptions"
              :key="rangeTimeItemIndex"
              :inner-type="innerValue.type"
              :option="rangeTimeItem"
              :active="sideTimeBtnActive && !sideTimeCompareActive"
              @click-side-btn="handleSideTimeBtnClick"
            />
          </template>
          <div v-if="isPrivateCompare" class="aw-range-picker-side-title">
            <span class="aw-range-picker-side-title-text">{{ globalConfig.baseCurrentLabel }}</span>
            <span class="aw-range-picker-side-title-line"></span>
          </div>
          <range-picker-button
            v-for="(rangeTimeItem, rangeTimeItemIndex) in btnFixedOptions"
            :key="rangeTimeItemIndex"
            :inner-type="innerValue.type"
            :option="rangeTimeItem"
            :active="sideTimeBtnActive"
            @click-side-btn="handleSideTimeBtnClick"
          />
          <range-picker-button
            v-if="showDynamic"
            :inner-type="innerValue.type"
            :option="{
              title: globalConfig.dynamicTimeLabel,
              type: innerValue.type,
              time: () => []
            }"
            :active="sideTimeDynamicActive"
            @click-side-btn="handleSideTimeDynamicClick"
          />
        </template>
        <div v-if="activeTab === 'custom'" ref="customTreeRef" class="aw-range-picker-side-custom-tree">
          <template v-if="filterBtnCustomRangeOptions.length">
            <!-- @vue-ignore -->
            <range-picker-button
              v-for="(rangeTimeItem, rangeTimeItemIndex) in filterBtnCustomRangeOptions"
              :key="rangeTimeItemIndex"
              :inner-type="innerValue.type"
              :option="rangeTimeItem"
              :active="sideTimeBtnActive"
              :enable-tooltip="true"
              :get-option-value-text="getOptionValueText"
              :expand-group-ids="expandGroupIds"
              :exist-tree="existTree"
              @click-side-btn="handleSideTimeBtnClick"
              @expand-group="handleExpandGroup"
            />
          </template>
          <div v-else class="aw-range-picker-side-empty">{{ globalConfig.noSearchResult }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, PropType } from 'vue';
import { default as TInput } from 'tdesign-vue-next/esm/input';
import { debounce } from 'lodash';
import RangePickerButton from './picker-button.vue';
import {
  useRangeGlobalConfig,
  HIGHLIGHT_CLASS
} from '../constants';
import { useSideMouse } from '../hooks/useSideMouse';
import { useHighlight } from '../hooks/useHighlight';
import type { SingleRangeValue, RangeValue, RangeTimeOption, SingleRangeTimeOption, GroupOption } from '../type';

defineOptions({
  name: 'PickerSider',
})

const emit = defineEmits(['click-side-btn', 'click-relative-btn', 'click-dynamic-btn', 'update:tab-active'])

const props = defineProps({
  isPrivateCompare: {
    type: Boolean,
    default: false,
  },
  innerValue: {
    type: Object as PropType<SingleRangeValue | RangeValue>,
    required: true,
  },
  sideTimeCompareActive: {
    type: Boolean,
    default: false,
  },
  sideTimeBtnActive: {
    type: Boolean,
  },
  showDynamic: {
    type: Boolean,
    default: false,
  },
  btnCompareOptions: {
    type: Array as PropType<RangeTimeOption[]>,
    default: () => [],
  },
  btnFixedOptions: {
    type: Array as PropType<(RangeTimeOption | SingleRangeTimeOption | GroupOption)[]>,
    default: () => [],
  },
  sideTimeDynamicActive: {
    type: Boolean,
    default: false,
  },
  btnCustomRangeOptions: {
    type: Array as PropType<(RangeTimeOption | SingleRangeTimeOption | GroupOption)[]>,
    default: () => [],
  },
  getOptionValueText: {
    type: Function as PropType<(option: RangeTimeOption | SingleRangeTimeOption | GroupOption) => string[]>,
    default: () => '',
  },
})

const CONST = useRangeGlobalConfig();
const { globalConfig } = CONST;

const {
  handleMouseEnterSideTime,
  handleMouseLeaveSideTime
} = useSideMouse()

const handleSideTimeBtnClick = (option: RangeTimeOption) => {
  emit('click-side-btn', option)
}

const handleSideTimeRelativeClick = (option: RangeTimeOption) => {
  emit('click-relative-btn', option)
}

const handleSideTimeDynamicClick = () => {
  emit('click-dynamic-btn')
}

const expandGroupIds = ref<string[]>([])


const handleExpandGroup = (groupId: string) => {
  const index = expandGroupIds.value.indexOf(groupId)

  if (index !== -1) {
    expandGroupIds.value = expandGroupIds.value.filter(id => id !== groupId)
  } else {
    expandGroupIds.value = [...expandGroupIds.value, groupId]
  }
}

const activeTab = ref<'quick' | 'custom'>('quick')

const customTreeRef = ref<HTMLElement>()

const searchText = ref('')

const filterBtnCustomRangeOptions = computed(() => {
  const filterTree = (nodes: (RangeTimeOption | SingleRangeTimeOption | GroupOption)[]): (RangeTimeOption | SingleRangeTimeOption | GroupOption)[] => {
    return nodes
      .map((node: any) => {
        // 如果当前节点匹配搜索文本，保留所有原始子节点
        if (searchText.value && node.title.toLowerCase().includes(searchText.value.toLowerCase())) {
          return {
            ...node,
            children: node.children // 直接保留原始子节点，不进行过滤
          };
        }

        // 否则继续递归过滤子节点
        return {
          ...node,
          children: node.children ? filterTree(node.children) : undefined,
        };
      })
      .filter((node) => {
        // 如果有符合条件的子节点，则保留当前节点
        if (node.children?.length) {
          return true;
        }

        // 先检查搜索值
        if (searchText.value && !node.title.toLowerCase().includes(searchText.value.toLowerCase())) {
          return false;
        }

        return true;
      });
  }

  return filterTree(props.btnCustomRangeOptions);
})

const existTree = computed(() => {
  return filterBtnCustomRangeOptions.value.some(item => {
    return (item as GroupOption).children
  })
})

const highlightSearch = debounce((keyWord: string) => {
  const el = customTreeRef.value
  if (!el || !(el instanceof HTMLElement)) {
    return
  }

  useHighlight({ keyWord, selector: HIGHLIGHT_CLASS, rootNode: el, cssName: HIGHLIGHT_CLASS })
}, 200)

const handleSearch = (value: any) => {
  searchText.value = value

  expandGroupIds.value = filterBtnCustomRangeOptions.value.reduce((acc: string[], item) => {
    if ((item as GroupOption).children) {
      return [...acc, (item as GroupOption).id]
    }

    return acc
  }, [])
  highlightSearch(value)
}

const handleChangeActiveTab = (value: 'quick' | 'custom') => {
  if (value !== activeTab.value) {
    activeTab.value = value
    searchText.value = ''

    if (activeTab.value === 'custom') {
      const findItem = filterBtnCustomRangeOptions.value.find(item => {
        if ((item as GroupOption).children) {
          return (item as GroupOption).children.some(child => child.type === props.innerValue.type)
        }

        return false;
      })
      expandGroupIds.value = findItem ? [(findItem as GroupOption).id] : []
    }
  }
}

const initActiveTab = () => {
  const flag = props.btnCustomRangeOptions.some(item => {
    if ((item as GroupOption).children) {
      return (item as GroupOption).children.some(child => child.type === props.innerValue.type)
    } else {
      return (item as RangeTimeOption).type === props.innerValue.type
    }
  })

  handleChangeActiveTab(flag ? 'custom' : 'quick')
}

onMounted(() => {
  initActiveTab()
})

defineExpose({
  initActiveTab
})
</script>