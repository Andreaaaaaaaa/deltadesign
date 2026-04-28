<script lang="ts" name="CalendarBar">
import { defineComponent, toRefs, reactive, computed, onBeforeUnmount, onMounted, toRaw, PropType } from 'vue';
import dayjs from 'dayjs';
import TooltipItem from './tooltip-item/index.vue';
import { TooltipListItem } from './tooltip-item/const';
import {
  CalendarItemType,
  CalendarDetailValueItem,
  CalendarDetailItem,
  CalendarDetailItemFormat,
  CalendarItem,
  NewCalendarItem,
  DropdownOptionsItem,
} from './types';
import { Icon } from '../icon';
import { Popup } from '../popup';
import { Dropdown, DropdownOption } from 'tdesign-vue-next/esm/dropdown';
import { cloneDeep } from 'lodash';

const MAINCOLOR = '77, 93, 178';
const colorsPanel = ['#FF8F6C', '#6690F1', '#59CEF5', '#9B82FF', '#4EB596', '#FCC04D', '#A5CF67', '#7A88A7'];
export default defineComponent({
  name: 'CalendarBar',
  components: {
    TooltipItem,
    Icon,
    Popup,
    Dropdown,
  },
  props: {
    data: {
      type: Array as PropType<CalendarItem[]>,
      default: () => [],
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    timeFormat: {
      type: String as PropType<string>,
      default: 'MM-DD',
    },
    onChange: Function,
  },
  setup(props) {
    const innerData: {
      step: number;
      totalLength: number;
      time: number[];
      showDetailSwitch: boolean;
      detailList: CalendarDetailItemFormat | undefined;
      detailOptionList: CalendarDetailItemFormat | undefined;
      currentDetail: CalendarDetailValueItem | undefined;
      currentTooltipKey: string;
      currentSwitchKey: string;
      showDetailTitleSwitch: boolean;
      typeList: string[];
    } = reactive({
      step: 3600 * 24, // 初始化的最小间隔为1天
      totalLength: 0,
      time: [],
      showDetailSwitch: false,
      detailList: undefined,
      detailOptionList: undefined,
      currentDetail: undefined,
      currentTooltipKey: '', // 当前悬浮甬道的key
      currentSwitchKey: '', // 当前点击下拉菜单的key
      showDetailTitleSwitch: false, // 当前是否展开详情下拉菜单
      typeList: [],
    });

    const { disabled, onChange } = toRefs(props);
    const disabledProp = reactive({
      value: disabled,
    });
    const onChangeProp = reactive({
      value: onChange,
    });
    // 计算间隔的数组数据源
    const stepArray = props.data.length ? props.data[0].value : [];
    // 计算间隔的数组数据源的计算结果,正序
    const stepArrayResult = stepArray.length ? [stepArray[0].start, stepArray[stepArray.length - 1].end] : [];
    // 确定基准展示范围
    const baseline: number[] = [stepArray[0].start, stepArray[stepArray.length - 1].end];
    const totalLength = reactive({
      value: computed(() => (baseline[1] - baseline[0]) / innerData.step),
    });

    // format时间方法
    const formatTimeStempToString = (timestamp: number, format: string = props.timeFormat) =>
      dayjs.unix(timestamp).format(format);

    // 拼接名称文案，带时间
    const functionCalcText = (name: string, start: number, end: number) => {
      const from = formatTimeStempToString(start);
      const to = formatTimeStempToString(end - 1);
      return `${name}（${from}至${to}）`;
    };

    // 计算开区间显示函数,返回border-radius样式
    const functionCalcRadius = (value: CalendarDetailValueItem) => {
      const style: string[] = [];
      if (value.oriStart !== value.start) {
        style.push('border-top-left-radius: 0px;border-bottom-left-radius: 0px;');
      }
      if (value.oriEnd !== value.end) {
        style.push('border-top-right-radius: 0px;border-bottom-right-radius: 0px;');
      }
      return style.join(';');
    };

    // 计算宽度函数,返回百分比宽度
    const functionCalcWidth = (start: number, end: number) => {
      const widthNumber = (end - start) / innerData.step; // 计算宽度间隔单位
      const widthPercent = (widthNumber / totalLength.value) * 100; // 计算总宽度比例
      return `width: ${widthPercent}%;`;
    };
    const functionCalcLeft = (start: number) => {
      const leftNumber = (start - stepArrayResult[0]) / innerData.step; // 计算左侧间隔的单位
      const leftPercent = (leftNumber / totalLength.value) * 100; // 计算左侧间隔的百分比
      return `left: ${leftPercent}%;`;
    };
    // 计算宽度函数,返回颜色权重
    const functionCalcColor = (value: number) => {
      const text = `color: ${value > 5 ? '#FFFFFF' : '#202020'};`;
      if (value < 10) {
        return `background-color: rgba(${MAINCOLOR}, ${value * 10}%);${text}`;
      }
      return `background-color: rgba(${MAINCOLOR}, 1);${text}`;
    };

    // 计算权重函数,返回样式权重
    const functionCalcZIndex = (value: number) => {
      const baseIndex = 2; // 基础Index权重
      return `z-index: ${value + baseIndex};`;
    };

    // 计算时间更新文案
    const formatEventText = (barItem: CalendarDetailItemFormat) => {
      if (barItem.overlapText !== undefined) {
        return barItem.overlapText;
      }
      // 拼接原始字符串展示
      return `${functionCalcText(barItem.name, barItem.oriStart || 0, barItem.oriEnd || 0)}`;
    };

    // 详情面板点击某条详情的回调函数，用于组件外调用
    const onChangeDetail = (val: CalendarDetailValueItem) => {
      innerData.currentDetail = val;
      if (onChangeProp.value) {
        onChangeProp.value(toRaw(innerData.currentDetail));
      }
    };

    // 处理模块的点击跳转
    const showDetail = (value: CalendarDetailItemFormat, type: CalendarItemType) => {
      if (!value.value.length) {
        // 子级列表为空时不可点击跳转
        return;
      }
      if (value.options?.length) {
        // 子级选项为多个时应出现下拉菜单而不展示跳转
        return;
      }
      innerData.showDetailSwitch = true;
      innerData.detailList = {
        ...value,
        rootType: type,
      };
      // 默认选中第一条子内容
      onChangeDetail(innerData.detailList.value[0]);
    };

    // 点击下拉菜单函数
    const showEventDetail = (
      val: DropdownOptionsItem | DropdownOption,
      value?: CalendarDetailItemFormat,
      type?: CalendarItemType,
    ) => {
      // 展示详情面板
      if (!value?.options) {
        return;
      }
      // 记录下拉状态
      innerData.showDetailSwitch = true;
      innerData.currentSwitchKey = (val as DropdownOptionsItem).value;
      // 不影响数据原始数据，选中态仅在下钻面板存在
      const detailOptionListValue = cloneDeep(value);
      // 调整下拉菜单选中态
      if (detailOptionListValue.options) {
        for (const item of detailOptionListValue.options) {
          item.active = item.origin?.key === innerData.currentSwitchKey;
        }
        innerData.detailOptionList = detailOptionListValue;
      }

      // 多重选择情况赋值,需要根据value重组展示数组
      for (const item of value.options) {
        if (item.value === val.value) {
          innerData.detailList = {
            ...(item.origin as CalendarDetailItem),
            rootType: type,
          };
        }
      }
      if (!innerData.detailList) {
        return;
      }
      // 默认选中第一条子内容
      onChangeDetail(innerData.detailList.value[0]);
    };

    // click点击后的回调函数
    const onVisibleChange = (visible: boolean, val: CalendarDetailValueItem) => {
      if (visible) {
        innerData.currentTooltipKey = val.key;
      } else {
        innerData.currentTooltipKey = '';
      }
    };

    // click点击详情后的回调函数
    const onDetailVisibleChange = (visible: boolean) => {
      if (visible) {
        innerData.showDetailTitleSwitch = true;
      } else {
        innerData.showDetailTitleSwitch = false;
      }
    };

    // 页面点击回调函数，主要用于取消下拉菜单的监控
    const onClick = (e: Event) => {
      const id = (e.target as HTMLElement).getAttribute('id');
      if (!id) {
        // 点击bar-block之外的地方重置下拉面板的key
        innerData.currentSwitchKey = '';
        innerData.currentTooltipKey = '';
      }
    };

    const formatCalcVisible = (key: string): boolean => {
      // 判断当前条目是否为悬浮条目
      if (!innerData.currentTooltipKey || innerData.currentTooltipKey !== key) {
        return false;
      }
      if (innerData.currentSwitchKey && innerData.currentTooltipKey === innerData.currentSwitchKey) {
        return false;
      }
      return true;
    };
    const chooseChange = (val: CalendarDetailValueItem) => {
      if (innerData.currentSwitchKey === val.key) {
        // 说明为取消菜单,重置data.currentSwitchKey
        innerData.currentSwitchKey = '';
      } else {
        innerData.currentSwitchKey = val.key;
      }
    };

    // 回到主面板函数
    const backToMain = () => {
      innerData.showDetailSwitch = false;
      // 参数重置
      innerData.detailOptionList = undefined;
      innerData.detailList = undefined;
      innerData.currentDetail = undefined;
      innerData.currentTooltipKey = '';
      innerData.currentSwitchKey = '';
      if (onChangeProp.value) {
        onChangeProp.value(() => undefined);
      }
    };

    // 计算一个数字在数组中出现的次数函数
    const functionCalcNumInArray = (value: number, array: number[]) => {
      let num = 0;
      for (const item of array) {
        if (value === item) {
          num += 1;
        }
      }
      return num;
    };

    // 计算每条事件类型bar的额外参数如：重叠系数zIndex、重叠文案overlap、重叠选项options
    const functionCalcOverlap = (value: CalendarDetailItem[]): CalendarDetailItemFormat[] => {
      const newValue: CalendarDetailItemFormat[] = cloneDeep(value);
      const startArray: number[] = [];
      const startSameArray: number[] = [];
      const resultMap: {
        [key: string]: CalendarDetailItem[];
      } = {};
      // 生成开始时间集合
      value.forEach((item: CalendarDetailItem) => {
        startArray.push(item.start);
      });
      // 判断是否有相同日期，有相同日期则取出日期
      startArray.forEach((start: number) => {
        if (functionCalcNumInArray(start, startArray) > 1) {
          startSameArray.push(start);
          resultMap[start] = []; // 初始化同日期地图
        }
      });
      // 将时间重叠日期的相关内容整理
      for (const item of newValue) {
        // 将开始日期相同的归为一组
        if (startSameArray.indexOf(item.start) > -1) {
          // 此项含有相同时间项，需要调整zIndex以及text展示
          resultMap[item.start].push(item);
        }
      }

      if (Object.keys(resultMap).length) {
        // 遍历含权重的内容，对原数组的值进行映射和整理
        Object.keys(resultMap).forEach((start: string) => {
          // start为重复时间数组的key，所包含项应至少为2，且每组中开始日期相同，需要比较截止时间，按照截止时间降排列
          resultMap[start].sort((a, b) => b.end - a.end);
        });
      }
      for (const item of newValue) {
        // 遍历进行权重判断
        const optionsData: DropdownOptionsItem[] = [];
        const array = resultMap[item.start.toString()];
        if (array) {
          // 此项含有相同时间项，需要调整zIndex以及text展示
          // 截止时间越短的事件权重越高，显示在最上层，
          const zIndex = array.indexOf(item);
          // 生成开始聚合原始数组
          array.forEach((a) => {
            optionsData.push({
              content: `${functionCalcText(a.name, a.oriStart || 0, a.oriEnd || 0)}`,
              value: a.key,
              origin: cloneDeep(a),
              active: false,
              disabled: !a.value.length,
            });
          });
          item.zIndex = zIndex;
          // 且如果是最高层，则需要做文案的聚合、下拉框内容的处理
          if (zIndex === array.length - 1) {
            const text: string[] = [];
            for (const optionsDataItem of optionsData) {
              text.push(optionsDataItem.origin?.name as string);
            }
            item.overlapText = text.reverse().join('/');
            item.options = optionsData.reverse();
          } else {
            item.overlapText = '';
          }
        }
      }
      // 返回带权重的新数组
      return newValue;
    };

    // 计算宽度函数,返回颜色权重
    const formatBarBlockStyle = (barItem: CalendarDetailItem, index: number, value: CalendarDetailItem[]) => {
      const newValue = functionCalcOverlap(value);
      const zIndex: number = newValue[index].zIndex || 0;
      return `${functionCalcWidth(barItem.start, barItem.end)}${functionCalcLeft(barItem.start)}${functionCalcColor(
        barItem.value.length,
      )}${functionCalcZIndex(zIndex)}`;
    };

    // 格式化原始时间和展示时间函数
    const formatOriginTime = (
      item: (CalendarDetailItem | CalendarDetailValueItem)[],
      baseStart: number,
      baseEnd: number,
      main = true,
    ): (CalendarDetailItem | CalendarDetailValueItem)[] => {
      // 先对原始数据中的时间进行存储
      const area: {
        [key: string]: number[];
      } = {};
      item.forEach((subItem: CalendarDetailItem | CalendarDetailValueItem) => {
        area[subItem.key] = [subItem.start, subItem.end];
      });
      const newItem = item.map((subItem: CalendarDetailItem | CalendarDetailValueItem) => {
        // 主面板格式化
        const newSubItem = cloneDeep(subItem);
        const oriStart: number = Math.max(subItem.start, baseStart);
        let oriEnd: number = Math.min(subItem.end, baseEnd);
        // 增加主面板对结束时间的处理加入重叠情况的逻辑
        if (main && Object.keys(area).length) {
          for (const areaKey of Object.keys(area)) {
            const start = area[areaKey][0];
            const end = area[areaKey][1];
            if (oriStart < start && oriEnd > start && oriEnd <= end) {
              // 若在时间段地图中，存在开始时间大于某条，结束时间在条目中的情况则重置结束时间
              oriEnd = start;
              break;
            }
          }
        }
        if ((subItem as CalendarDetailItem).value?.length) {
          // 含有详情，对子甬道也需要做处理
          (newSubItem as CalendarDetailItem).value = formatOriginTime(
            (subItem as CalendarDetailItem).value,
            baseStart,
            baseEnd,
            false,
          );
        }
        return {
          ...newSubItem,
          oriStart: subItem.start,
          oriEnd: subItem.end,
          start: oriStart,
          end: oriEnd,
        };
      });

      return newItem;
    };

    // 将传值初始化后给页面渲染使用
    const formatValue = reactive({
      data: computed(() => {
        const items: NewCalendarItem[] = [];
        // 首先对超出基准甬道的时间做处理，即按照基准展示图形，但显示真实文案，所以将start改为有效值，另设置oriStart展示真实时间，结束时间同理，有溢出区间的甬道做特殊UI处理
        props.data.forEach((origin: CalendarItem) => {
          const newItem = cloneDeep(origin);
          // 在每条bar初始之前，根据时间基准展示范调整时间
          // 主面板时间格式化
          const baseStart = baseline[0];
          const baseEnd = baseline[1];
          newItem.value = formatOriginTime(newItem.value, baseStart, baseEnd) as CalendarDetailItem[];
          // 对每一条bar的处理
          // 先对事件类型的详情数据进行处理
          // @ts-ignore
          if (origin.type === CalendarItemType.EventUnity) {
            // @ts-ignore
            newItem.value = functionCalcOverlap(newItem.value);
          }

          // 对每一条主面板bar进行处理
          newItem.value = newItem.value.map((subOrigin: CalendarDetailItem) => {
            // 生成宽度、权重系数、距左边的位置等样式参数
            const subItems: CalendarDetailItemFormat = cloneDeep(subOrigin);

            // 生成tooltip悬浮列表内容
            const tooltipList: TooltipListItem[] = [];
            // @ts-ignore
            if (origin.type === CalendarItemType.DayByDay) {
              // 按天时列表内容为子活动参数拼接
              subItems.value = subItems.value.map((subItemsValue) => {
                // 初始化类型数组，对类型和颜色进行计算复制
                const newSubItemsValue = cloneDeep(subItemsValue);
                const types: string[] = [];
                const colors: string[] = [];
                if (subItemsValue.type) {
                  for (let i = 0; i < subItemsValue.type.length; i += 1) {
                    let typeIndex = innerData.typeList.indexOf(subItemsValue.type[i]);
                    if (typeIndex === -1) {
                      // 事件类型在全局未注册，则推入
                      innerData.typeList.push(subItemsValue.type[i]);
                      typeIndex = innerData.typeList.indexOf(subItemsValue.type[i]);
                    }
                    types[i] = subItemsValue.type[i];
                    colors[i] = colorsPanel[typeIndex];
                  }
                }
                tooltipList.push({
                  text: functionCalcText(subItemsValue.name, subItemsValue.oriStart || 0, subItemsValue.oriEnd || 0),
                  color: colors,
                  type: types,
                });
                newSubItemsValue.type = types;
                newSubItemsValue.color = colors;

                return newSubItemsValue;
              });
            } else if (subItems.overlapText && subItems.options) {
              // 按事件时有聚合显示聚合列表
              subItems.options.forEach((subItemsValue) => {
                const newSubItemsValue = cloneDeep(subItemsValue);
                if (!newSubItemsValue.origin || !newSubItemsValue.origin?.value) {
                  return newSubItemsValue;
                }
                newSubItemsValue.origin.value = newSubItemsValue.origin?.value.map((ori) => {
                  const newOri = cloneDeep(ori);
                  const types: string[] = [];
                  const colors: string[] = [];
                  if (ori.type) {
                    for (let i = 0; i < ori.type.length; i += 1) {
                      let typeIndex = innerData.typeList.indexOf(ori.type[i]);
                      if (typeIndex === -1) {
                        // 事件类型在全局未注册，则推入
                        innerData.typeList.push(ori.type[i]);
                        typeIndex = innerData.typeList.indexOf(ori.type[i]);
                      }
                      types[i] = ori.type[i];
                      colors[i] = colorsPanel[typeIndex];
                    }
                  }
                  newOri.color = colors;
                  newOri.type = types;

                  return newOri;
                });
                tooltipList.push({
                  text: subItemsValue.content,
                  color: [],
                  type: [],
                });

                return newSubItemsValue;
              });
            } else {
              // 按事件时无聚合，显示单条内容
              subItems.value = subItems.value.map((subItemsValue) => {
                const newSubItemsValue = cloneDeep(subItemsValue);
                const types: string[] = [];
                const colors: string[] = [];
                if (subItemsValue.type) {
                  for (let i = 0; i < subItemsValue.type.length; i += 1) {
                    let typeIndex = innerData.typeList.indexOf(subItemsValue.type[i]);
                    if (typeIndex === -1) {
                      // 事件类型在全局未注册，则推入
                      innerData.typeList.push(subItemsValue.type[i]);
                      typeIndex = innerData.typeList.indexOf(subItemsValue.type[i]);
                    }
                    types[i] = subItemsValue.type[i];
                    colors[i] = colorsPanel[typeIndex];
                  }
                }
                newSubItemsValue.color = colors;
                newSubItemsValue.type = types;

                return newSubItemsValue;
              });
              tooltipList.push({
                text: functionCalcText(subItems.name, subItems.oriStart || 0, subItems.oriEnd || 0),
                color: [],
                type: [],
              });
            }
            subItems.tooltipList = tooltipList;

            const zIndex = subItems.zIndex || 0;
            subItems.style = `${functionCalcWidth(subItems.start, subItems.end)}${functionCalcLeft(
              subItems.start,
            )}${functionCalcColor(Math.max(subItems.tooltipList.length, 1))}${functionCalcZIndex(zIndex)}`;

            return subItems;
          });

          items.push(newItem);
        });

        return items;
      }),
    });

    onMounted(() => {
      window.addEventListener('click', (e: Event) => onClick(e));
    });
    onBeforeUnmount(() => {
      window.removeEventListener('click', (e: Event) => onClick(e));
    });

    return {
      disabledProp,
      onChangeProp,
      formatValue,
      innerData,
      totalLength,
      functionCalcWidth,
      functionCalcLeft,
      functionCalcColor,
      functionCalcText,
      functionCalcRadius,
      formatBarBlockStyle,
      formatTimeStempToString,
      formatEventText,
      showDetail,
      showEventDetail,
      backToMain,
      onChangeDetail,
      onVisibleChange,
      onDetailVisibleChange,
      chooseChange,
      formatCalcVisible,
    };
  },
});
</script>

<template>
  <div
    :class="['delta-ui-calendar-container', disabledProp.value ? 'delta-ui-calendar-container-disabled' : '']"
    ref="chartRef"
    id="chartRef"
  >
    <div v-if="disabledProp.value" class="mask"></div>
    <div v-if="innerData && !innerData.showDetailSwitch">
      <div v-for="item in formatValue.data" :key="item.key" class="chart">
        <div class="row">
          <div class="title">{{ item.name }}</div>
          <div class="bar">
            <div
              v-for="barItem in item.value"
              :key="barItem.key"
              :class="[
                barItem.tooltipList && barItem.tooltipList.length ? 'bar-block' : '',
                item.type === 'DayByDay' ? 'bar-block-day' : '',
              ]"
              :style="barItem.style"
              @click="showDetail(barItem, item.type)"
            >
              <Popup
                v-if="barItem.tooltipList && barItem.tooltipList.length"
                :visible="formatCalcVisible(barItem.key)"
                placement="top-left"
                :overlayStyle="{
                  'margin-left': '-2px',
                }"
                overlayClassName="delta-ui-popup"
                showArrow
                @visibleChange="(val) => onVisibleChange(val, barItem)"
              >
                <template #content>
                  <!-- 不同类型展示的list由数据处理决定 -->
                  <div>
                    <p class="popup-item" v-for="listItem in barItem.tooltipList" :key="listItem.text">
                      <TooltipItem :value="listItem" :isWhite="true"></TooltipItem>
                    </p>
                  </div>
                </template>
                <div class="bar-block-box" @click="chooseChange(barItem)">
                  <!-- 只有事件聚合类型才展示名称 -->
                  <Dropdown
                    v-if="item.type === 'EventUnity'"
                    attach="#chartRef"
                    overlayClassName="dropdown"
                    :overlayStyle="{
                      'margin-top': '2px',
                      'margin-left': '-4px',
                    }"
                    placement="bottom-left"
                    trigger="click"
                    :options="barItem.options"
                    @click="(val) => showEventDetail(val, barItem, item.type)"
                  >
                    <span :id="`bar-block-${barItem.key}`" class="bar-block-box-title">{{
                      formatEventText(barItem)
                    }}</span>
                  </Dropdown>
                  <!-- test专用文案 -->
                  <!-- <span v-else>
                    {{ barItem.name.slice(2, 5) }}
                  </span> -->
                </div>
              </Popup>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="innerData && innerData.showDetailSwitch" class="detail-chart" id="detailChartRef">
      <div class="detail-top">
        <Icon name="arrow-left" class="back-icon" @click="backToMain" />
        <div v-if="!innerData.detailOptionList && innerData.detailList" class="detail-top-box">
          <span class="detailTitle">{{
            functionCalcText(innerData.detailList.name, innerData.detailList.oriStart, innerData.detailList.oriEnd)
          }}</span>
        </div>
        <Dropdown
          v-else
          attach="#detailChartRef"
          overlayClassName="dropdown"
          :overlayStyle="{ 'margin-top': '4px', 'margin-left': '0' }"
          placement="bottom-left"
          trigger="click"
          :options="innerData.detailOptionList?.options"
          @visibleChange="onDetailVisibleChange"
          @click="(val) => showEventDetail(val, innerData.detailOptionList)"
        >
          <div :class="['detail-top-box', innerData.showDetailTitleSwitch ? 'detail-top-border-box' : '']">
            <span class="bar-block-box-title" v-if="innerData.detailList">{{
              functionCalcText(innerData.detailList.name, innerData.detailList.oriStart, innerData.detailList.oriEnd)
            }}</span>
            <span class="title-dropdown-icon">
              <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.39877 0C5.82835 -3.74878e-08 6.05794 0.505961 5.77506
                  0.829252L3.37694 3.56996C3.17773 3.79762 2.82357 3.79762
                  2.62436 3.56996L0.226247 0.829252C-0.056633 0.505961 0.172956
                  4.56038e-07 0.602536 4.1855e-07L5.39877 0Z"
                  fill="#202020"
                  fill-opacity="0.6"
                />
              </svg>
            </span>
          </div>
        </Dropdown>
      </div>
      <div
        v-if="innerData && innerData.detailList && innerData.currentDetail"
        :class="['detail-list', innerData.detailList.value.length > 4 ? 'scroll-box' : '']"
      >
        <div class="detail-bar" v-for="(detail, detailIndex) in innerData.detailList.value" :key="detail.key">
          <div
            :class="[detail.key === innerData.currentDetail.key ? 'first-detail' : 'other-detail', 'detail-box']"
            :style="`${functionCalcWidth(detail.start, detail.end)}${functionCalcLeft(
              detail.start,
            )}${functionCalcRadius(detail)}`"
            @click="onChangeDetail(detail)"
          >
            <Popup
              placement="top-left"
              overlayClassName="delta-ui-popup"
              showArrow
              :overlayStyle="{
                'margin-left': '-4px',
              }"
            >
              <template #content>
                <!-- 不同类型展示的list由数据处理决定 -->
                <div>
                  <TooltipItem
                    :value="{
                      text: formatEventText({ ...detail, value: [] }),
                      color: detail.color ? detail.color : [],
                      type: detail.type ? detail.type : [],
                    }"
                    :isWhite="true"
                  ></TooltipItem>
                </div>
              </template>
              <div class="detail-box-title">
                <TooltipItem
                  :value="{
                    text: formatEventText({ ...detail, value: [] }),
                    color: detail.color ? detail.color : [],
                    type: detail.type ? detail.type : [],
                  }"
                  :isFollow="true"
                  :index="detailIndex"
                ></TooltipItem>
              </div>
            </Popup>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scope>
.delta-ui-calendar-container {
  position: relative;
  width: calc(100%);
  height: 100%;
  text-align: left;
  font-size: 12px;
  color: #202020;

  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 99;
    cursor: not-allowed;
  }

  .chart {
    width: 100%;
    height: 100%;
  }
  .detail-chart {
    width: 100%;
    height: 100%;
  }
  .row {
    box-sizing: border-box;
    margin-top: 12px;
  }
  .title {
    line-height: 18px;
    font-size: 12px;
    color: rgba(#202020, 0.6);
    margin-bottom: 4px;
  }
  .bar {
    background-color: #f6f8fa;
    width: 100%;
    height: 20px;
    position: relative;
  }
  .bar-block {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 20px;
    cursor: default;
    border: 1px solid transparent;
    box-sizing: border-box;
    background-color: #495db2;
    .t-popup__reference {
      width: 100%;
      height: 100%;
    }
  }
  .bar-block-day:last-child {
    border-right: none;
  }
  .bar-block-box {
    width: 100%;
    height: 20px;
    padding: 0 3px;
    line-height: 18px;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .bar-block-box::before {
    content: '';
    position: absolute;
    top: -1px;
    right: -1px;
    height: 20px;
    width: 1px;
    background-color: #f6f8fa;
  }
  .bar-block:hover {
    border: 1px solid #202020;
    box-shadow: 0 0 0 2px #e9e9e9;
    cursor: pointer;
    .bar-block-box {
      box-shadow: none;
      line-height: 18px;
      padding: 0 4px 0 3px;
    }
    .bar-block-box::before {
      content: '';
      position: absolute;
      top: -1px;
      right: -1px;
      height: 18px;
      width: 1px;
      background-color: #202020;
    }
  }
  .bar-block-box-title {
    width: 100%;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .dropdown {
    padding: 4px 0;
    width: fit-content;
    .t-dropdown__item {
      height: 30px;
      padding: 0 10px 0 6px;
      margin: 0;
      border-radius: 0;
      line-height: 30px;
      font-size: 12px;
    }
    .t-dropdown__item:hover {
      background-color: #e8eaf1;
    }
    .t-dropdown__menu-column {
      max-width: none !important;
      min-width: none !important;
      max-height: none !important;
    }
    .t-dropdown__item.t-is-active {
      color: #202020;
      background-color: #e8eaf1;
    }
  }
  /* 详情面板 */
  .detail-top {
    position: relative;
    padding: 0 18px;
    width: auto;
  }
  .back-icon {
    position: absolute;
    cursor: pointer;
    font-size: 14px;
    left: 0;
    top: 7px;
  }
  .detail-top-box {
    position: relative;
    width: fit-content;
    padding: 6px 22px 2px 4px;
    border: 1px solid transparent;
  }
  .detail-top-border-box {
    cursor: pointer;
    border: 1px solid #202020;
    border-radius: 4px;
    box-shadow: 0 0 0 2px #e8eaf1;
  }
  .title-dropdown-icon {
    position: absolute;
    top: 10px;
    right: 11px;
    color: rgba(32, 32, 32, 0.6);
  }
  .detail-list {
    margin-top: 10px;
    padding: 6px 0;
    box-sizing: border-box;
    border-radius: 4px;
    max-height: 124px;
    overflow-y: auto;
  }
  .scroll-box {
    border: 1px solid #e8eaf1;
  }
  .first-detail {
    background-color: #202020;
    color: #ffffff;
  }
  .detail-bar {
    position: relative;
    width: 100%;
    height: 22px;
    margin-bottom: 4px;
  }
  .detail-box {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    border-radius: 4px;
    line-height: 20px;
    padding: 0 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    // .t-popup__reference {
    //   width: 100%;
    //   height: 100%;
    // }
  }
  .detail-box-title {
    width: 100%;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .other-detail {
    background-color: rgba(#495db2, 0.1);
  }
}

.delta-ui-calendar-container-disabled {
  opacity: 0.6;
}

.delta-ui-popup {
  // background: rgba(#202020, 0.9);
  // border-radius: 4px;
  // padding: 8px;
  // color: #ffffff;
  // border-color: rgba(#202020, 0.9);
  font-size: 12px;
  // .t-popup__content {
  //   margin: 0;
  //   font-size: 12px;
  //   line-height: 20px;
  //   box-shadow: none;
  // }
  .popup-item {
    margin: 0;
    line-height: 20px;
  }
}

// .t-popup[data-popper-placement^="top"] {
//   .delta-ui-popup.t-popup__content--arrow {
//     margin-bottom: 8px;
//     box-shadow: none;
//   }
//   .delta-ui-popup {
//     .t-popup__arrow::before {
//       box-shadow: none;
//       border-bottom-right-radius: 2px;
//     }
//     .t-popup__arrow::before {
//       background: linear-gradient(
//         -45deg,
//         rgba(#202020, 0.9) 6px,
//         transparent 0
//       );
//     }
//     .t-popup__arrow::before {
//       background: linear-gradient(
//         -45deg,
//         transparent 5.5px,
//         rgba(32, 32, 32, 0.9) 0
//       );
//     }
//   }
// }
// .t-popup[data-popper-placement^="bottom"] {
//   .delta-ui-popup.t-popup__content--arrow {
//     margin-top: 8px;
//     box-shadow: none;
//   }
//   .delta-ui-popup {
//     .t-popup__arrow::before {
//       box-shadow: none;
//       border-top-left-radius: 2px;
//     }
//     .t-popup__arrow::before {
//       background: linear-gradient(
//         -45deg,
//         transparent 5.5px,
//         rgba(32, 32, 32, 0.9) 0
//       );
//     }
//   }
// }
</style>
