<template>
 <!-- class="t-table--hover--selector" -->
  <Table>
    <template #sortIcon>
      <svg class="aw-text-black-60" width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.39877 0C5.82835 -3.74878e-08 6.05794 0.505961 5.77506 0.829252L3.37694 3.56996C3.17773 3.79762 2.82357 3.79762 2.62436 3.56996L0.226247 0.829252C-0.056633 0.505961 0.172956 4.56038e-07 0.602536 4.1855e-07L5.39877 0Z" fill="currentColor"/>
      </svg>
    </template>
    <template v-for="(_, name) in slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </Table>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';
import { Table } from 'tdesign-vue-next/esm/table';

export default defineComponent({
  name: 'TTable',
  components: {
    Table,
  },
  setup(props, { slots }) {
    // const setBgColor = (arr, color: string) => {
    //   arr.forEach((item: Element) => {
    //     item?.setAttribute('style', color);
    //   });
    // };

    // const setHoverColumn = (target: HTMLElement, isAdd: boolean) => {
    //   if (target.nodeName === 'TD' && target.classList[0]) {
    //     const eles = document.querySelectorAll(`td.${target.classList[0]}`);
    //     setBgColor(eles, isAdd ? 'background-color: #EDEEF7' : '');
    //     target.setAttribute('style', isAdd ? 'background-color: rgba(221, 224, 240, 1)' : '');
    //     const header = document.querySelector(`th.${target.classList[0]}`);
    //     header?.setAttribute('style', isAdd ? 'background-color: rgba(234, 236, 243, 1)' : '');
    //   } else if ((target.parentNode as HTMLElement).nodeName === 'TD' &&
    //     (target.parentNode as HTMLElement).classList[0]
    //   ) {
    //     const eles = document.querySelectorAll(`td.${(target.parentNode as HTMLElement).classList[0]}`);
    //     setBgColor(eles, isAdd ? 'background-color: #EDEEF7' : '');
    //     (target.parentNode as HTMLElement).setAttribute(
    //       'style',
    //       isAdd ? 'background-color: rgba(221, 224, 240, 1)' : '',
    //     );
    //     const header = document.querySelector(`th.${(target.parentNode as HTMLElement).classList[0]}`);
    //     header?.setAttribute('style', isAdd ? 'background-color: rgba(234, 236, 243, 1)' : '');
    //   }
    // };

    // const addHoverEvent = (e: Event) => {
    //   const target = e.target as HTMLElement;
    //   setHoverColumn(target, true);
    // };

    // const removeHoverEvent = (e: Event) => {
    //   const target = e.target as HTMLElement;
    //   setHoverColumn(target, false);
    // };

    // onMounted(() => {
    //   const tableEle = document.querySelector('.t-table--hover--selector:not(.t-size-l)');
    //   tableEle?.addEventListener('mouseover', addHoverEvent);

    //   tableEle?.addEventListener('mouseout', removeHoverEvent);
    // });

    // onUnmounted(() => {
    //   const tableEle = document.querySelector('.t-table--hover--selector:not(.t-size-l)');
    //   tableEle?.removeEventListener('mouseover', addHoverEvent);

    //   tableEle?.removeEventListener('mouseout', removeHoverEvent);
    // });

    return {
      slots,
    };
  },
});
</script>
