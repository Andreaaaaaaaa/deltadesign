<template>
  <div class="t-data-grid-drawer">
    <div class="t-data-grid-drawer-header">
      <span v-if="showBack" class="t-data-grid-drawer-header-icon" @click="handleBack">
        <ChevronLeftSIcon size="20px" />
      </span>
      <div class="t-data-grid-drawer-header-title">{{ title }}</div>
      <span class="t-data-grid-drawer-header-clear t-data-grid-drawer-header-icon" @click="handleClose">
        <CloseIcon size="16px" />
      </span>
    </div>
    <div class="t-data-grid-drawer-body">
      <slot />
    </div>
    <div class="t-data-grid-drawer-footer">
      <div v-if="dataPreview" class="t-data-grid-drawer-footer-preview">
        {{ locale.dataPreview }}：{{ dataPreview }}
      </div>
      <div class="t-data-grid-drawer-footer-control">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable vue/no-dupe-keys -->
<script lang="ts">
import { CloseIcon, ChevronLeftSIcon } from 'tdesign-icons-vue-next';
import { PropType, computed, defineComponent, toRefs } from 'vue';
import { useLocale } from '../../hooks';

export default defineComponent({
  components: { CloseIcon, ChevronLeftSIcon },
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
      defult: '',
    },
    showBack: {
      type: Boolean,
      default: false,
    },
    preview: {
      type: String,
      default: '',
    },
  },
  emits: ['close', 'back'],
  setup(props, { emit }) {
    const { title, preview, showBack } = toRefs(props);

    const dataPreview = computed(() => preview.value?.toString() || '');

    const { locale } = useLocale();

    const handleClose = () => emit('close');

    const handleBack = () => emit('back');

    return {
      title,
      locale,
      showBack,
      dataPreview,
      handleBack,
      handleClose,
    };
  },
});
</script>

<style lang="scss">
.t-data-grid-drawer-footer {
  .t-data-grid-drawer-footer-control {
    .t-button__text {
      font-size: 12px;
    }
  }
}
.t-data-grid-drawer-body {
  label,
  input,
  .t-radio__label {
    font-size: 12px;
    color: #202020;
  }
  .color-render-list {
    span {
      font-size: 12px;
      color: #202020;
      opacity: 0.6;
    }
  }
}
.t-data-grid-drawer {
  width: 100%;
  background-color: #fff;
  display: flex;
  height: 100%;
  flex-direction: column;

  &-header {
    position: relative;
    display: flex;
    align-items: center;
    padding: 16px 8px 8px;
    color: rgba(32, 32, 32, 1);
    // box-shadow: 0 2px 2px 0 rgba($color: #a7a7a7, $alpha: 0.2);

    &-title {
      font-size: 12px;
      font-weight: 600;
      line-height: 18px;
      color: #202020;
    }

    &-icon {
      cursor: pointer;
      padding: 2px;
      &:hover {
        background-color: #f3f3f3;
      }
    }

    &-clear {
      position: absolute;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &-body {
    flex: 1;
    padding: 8px;
    overflow-y: auto;
  }

  &-footer {
    display: flex;
    flex-direction: column;
    box-shadow: 0px -3px 5px 0px rgba(209, 213, 230, 0.3);

    &-preview {
      padding: 0 12px;
      font-size: 12px;
      line-height: 18px;
      margin-top: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      overflow: hidden;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      color: rgba(32, 32, 32, 1);
    }

    &-control {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
      padding: 16px 8px;
    }
  }
}
</style>
