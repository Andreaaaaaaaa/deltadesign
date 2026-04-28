<template>
  <Pagination :class="className" ref="paginationRef" v-bind="$props">
  </Pagination>

</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, nextTick, ref, DefineComponent } from 'vue';
import { Pagination } from 'tdesign-vue-next/esm/pagination';

export default defineComponent({
  name: 'TPagination',
  components: {
    Pagination,
  },
  props: {
    total: {
      type: Number,
      default: () => 0
    },
    pageSize: {
      type: Number,
      default: () => 10
    },
    size: {
      type: String,
      default: () => 'medium'
    },
    theme: {
      type: String,
      default: () => 'default'
    }
  },
  setup(props) {
    const paginationRef = ref<DefineComponent | null>(null)
    let className = '';
    if(props.size === 'small' && props.theme === 'simple'){
      className = 't-size-mini'
    }
    const handleKeyUp = (event: Event) => {
      if (!event) {
        return
      }

      const target = event.currentTarget as HTMLElement;
      if (!target) {
        return
      }

      nextTick(() => {
        const value = Number((target as HTMLInputElement).value)
        if (!value) {
          return
        }
        if (value > props.total / props.pageSize) {
          target.blur()
        }
      })

      // Enter 键盘事件
      if ((event as KeyboardEvent).code === 'Enter') {
        target.blur()
      }
    }

    onMounted(() => {
      if (!paginationRef.value) {
        return
      }
      const paginationEl = paginationRef.value.$el;
      if (!paginationEl) {
        return
      }
      const inputEl = paginationEl.querySelector('.t-pagination__input .t-input__inner');
      if (!inputEl) {
        return
      }

      inputEl.addEventListener('keyup', handleKeyUp)
    })

    onBeforeUnmount(() => {
      if (!paginationRef.value) {
        return
      }
      const paginationEl = paginationRef.value.$el;
      if (!paginationEl) {
        return
      }
      const inputEl = paginationEl.querySelector('.t-pagination__input .t-input__inner');
      if (!inputEl) {
        return
      }

      inputEl.removeEventListener('keyup', handleKeyUp)
    })

    return {
      paginationRef,
      className
    };
  },
});
</script>