import lodash from 'lodash';
import { GridApi } from 'ag-grid-community';
import { ref, watchEffect, CSSProperties, Ref } from 'vue';
import { localeStore } from '../../locale';
import { isSingleCell, isSpanning } from '../../utils';
import { E_HEADER_EDIT_TOOLBAR_KEY, E_HEADER_EDIT_TOOLBAR_CONTROL, E_FONTSIZE } from '../../enums';
import { IDGContext, IRange, IHeaderEditToolbar, TDeltaConfigContent } from '../../types';

interface IUseFormatStyleByKey {
  change: (css: CSSProperties) => void;
}

export const useFormatStyleByKey = (params: IUseFormatStyleByKey, sameStyle: Ref<CSSProperties>) => {
  // const handleStyleClick = (key: E_HEADER_EDIT_TOOLBAR_KEY, value: string) => {
  //   const style = {} as CSSProperties;

  //   params?.change(style);
  // };

  const handleValueSwitch = (key: E_HEADER_EDIT_TOOLBAR_KEY, option: Array<string> = []) => {
    const style = {} as any;
    if (option.length > 0) {
      const currentValue = (sameStyle.value as any)[key];
      const currentIndex = option.findIndex((item) => item === currentValue);
      const value = option[(currentIndex + 1) % option.length];
      style[key] = value;
    }
    params?.change(style as CSSProperties);
  };

  return {
    // handleStyleClick,
    handleValueSwitch,
  };
};

/**
 * 计算选中范围的相同类型值
 */
export const useCalculateRangeStyle = (rangeContent: Ref<Array<TDeltaConfigContent>>) => {
  const sameStyle = ref({});

  watchEffect(() => {
    if (rangeContent.value.length > 0) {
      const contentFlat = rangeContent.value
        .map((item) => Object.entries(item || {}).map(([_, value]) => value?.cellStyle || {}))
        .flat();
      if (contentFlat.length > 0) {
        sameStyle.value = contentFlat.reduce((acc, curVal) => {
          const sameKey = Object.entries(acc)
            .map(([key, value]) => {
              if (value && lodash.isEqual(value, curVal[key as keyof CSSProperties])) {
                return key;
              }
              return undefined;
            })
            .filter((item) => item) as Array<string>;
          return lodash.pick(acc, sameKey);
        });
      }
    }
  });

  return { sameStyle };
};

const toolbarEditList = (locale: Record<string, string>): Array<IHeaderEditToolbar> => [
  {
    key: E_HEADER_EDIT_TOOLBAR_KEY.UNDO,
    control: E_HEADER_EDIT_TOOLBAR_CONTROL.BTN,
    childIcon: false,
    icon: 'rollback',
  },
  {
    key: E_HEADER_EDIT_TOOLBAR_KEY.REDO,
    control: E_HEADER_EDIT_TOOLBAR_CONTROL.BTN,
    style: { transform: 'scaleX(-100%)' },
    childIcon: false,
    icon: 'rollback',
  },
  {
    key: E_HEADER_EDIT_TOOLBAR_KEY.ROLLBACKDIVIDER,
    control: E_HEADER_EDIT_TOOLBAR_CONTROL.DIVIDER,
    childIcon: false,
  },
  {
    key: E_HEADER_EDIT_TOOLBAR_KEY.FORMAT,
    control: E_HEADER_EDIT_TOOLBAR_CONTROL.DIALOG,
    childIcon: false,
    name: locale.cellFormat,
  },
  {
    key: E_HEADER_EDIT_TOOLBAR_KEY.FORMATDIVIDER,
    control: E_HEADER_EDIT_TOOLBAR_CONTROL.DIVIDER,
    childIcon: false,
  },
  {
    key: E_HEADER_EDIT_TOOLBAR_KEY.BOLD,
    control: E_HEADER_EDIT_TOOLBAR_CONTROL.SWITCHVALUE,
    childIcon: false,
    option: ['bold', 'normal'],
    icon: 'textformat-bold',
  },
  {
    key: E_HEADER_EDIT_TOOLBAR_KEY.ITALIC,
    control: E_HEADER_EDIT_TOOLBAR_CONTROL.SWITCHVALUE,
    childIcon: false,
    option: ['italic', 'unset'],
    icon: 'textformat-italic',
  },
  {
    key: E_HEADER_EDIT_TOOLBAR_KEY.UNDERLINE,
    control: E_HEADER_EDIT_TOOLBAR_CONTROL.SWITCHVALUE,
    childIcon: false,
    option: ['underline', 'normal'],
    icon: 'textformat-underline',
  },
  // 增加字体下拉列表
  {
    key: E_HEADER_EDIT_TOOLBAR_KEY.FONTSIZE,
    control: E_HEADER_EDIT_TOOLBAR_CONTROL.SELECT,
    childIcon: false,
    placeholder: locale.fontSize,
    selectOptions: [
      {
        label: E_FONTSIZE.TWELVE,
        value: E_FONTSIZE.TWELVE,
      },
      {
        label: E_FONTSIZE.FOURTEEN,
        value: E_FONTSIZE.FOURTEEN,
      },
      {
        label: E_FONTSIZE.SIXTEEN,
        value: E_FONTSIZE.SIXTEEN,
      },
      {
        label: E_FONTSIZE.EIGHTEEN,
        value: E_FONTSIZE.EIGHTEEN,
      },
      {
        label: E_FONTSIZE.TWENTY,
        value: E_FONTSIZE.TWENTY,
      },
    ],
  },
  {
    key: E_HEADER_EDIT_TOOLBAR_KEY.COLOR,
    control: E_HEADER_EDIT_TOOLBAR_CONTROL.COLOR,
    childIcon: true,
    svgIcon: 'COLOR',
  },
  {
    key: E_HEADER_EDIT_TOOLBAR_KEY.BGCOLOR,
    control: E_HEADER_EDIT_TOOLBAR_CONTROL.COLOR,
    childIcon: true,
    svgIcon: 'BGCOLOR',
  },
  // {
  //   key: E_HEADER_EDIT_TOOLBAR_KEY.BORDER,
  //   control: E_HEADER_EDIT_TOOLBAR_CONTROL.BTN,
  //   childIcon: true,
  //   disabled: true,
  //   icon: 'frame',
  // },
  {
    key: E_HEADER_EDIT_TOOLBAR_KEY.CELLDIVIDER,
    control: E_HEADER_EDIT_TOOLBAR_CONTROL.DIVIDER,
    childIcon: false,
  },
  {
    key: E_HEADER_EDIT_TOOLBAR_KEY.FORMATVERTICALALIGN,
    control: E_HEADER_EDIT_TOOLBAR_CONTROL.MENU,
    childIcon: true,
    icon: 'format-vertical-align-left',
    subMenu: [
      {
        key: E_HEADER_EDIT_TOOLBAR_KEY.FORMATVERTICALALIGNRIGHTLEFT,
        control: E_HEADER_EDIT_TOOLBAR_CONTROL.BTN,
        option: ['left'],
        name: locale.alignLeft,
        icon: 'format-vertical-align-left',
      },
      {
        key: E_HEADER_EDIT_TOOLBAR_KEY.FORMATVERTICALALIGNCENTER,
        control: E_HEADER_EDIT_TOOLBAR_CONTROL.BTN,
        option: ['center'],
        name: locale.alignCenter,
        icon: 'format-vertical-align-center',
      },
      {
        key: E_HEADER_EDIT_TOOLBAR_KEY.FORMATVERTICALALIGNRIGHT,
        control: E_HEADER_EDIT_TOOLBAR_CONTROL.BTN,
        option: ['right'],
        name: locale.alignRight,
        icon: 'format-vertical-align-right',
      },
    ],
  },
  // {
  //   key: E_HEADER_EDIT_TOOLBAR_KEY.WRAP,
  //   control: E_HEADER_EDIT_TOOLBAR_CONTROL.SWITCHVALUE,
  //   childIcon: false,
  //   option: ['pre-wrap', 'normal'],
  //   icon: 'textformat-wrap',
  // },
  {
    key: E_HEADER_EDIT_TOOLBAR_KEY.MERGE,
    control: E_HEADER_EDIT_TOOLBAR_CONTROL.BTN,
    childIcon: false,
    icon: 'merge-cells',
  },
  // 隐藏显示表头
  {
    key: E_HEADER_EDIT_TOOLBAR_KEY.HIDESHOWHEADER,
    control: E_HEADER_EDIT_TOOLBAR_CONTROL.TIPS,
    childIcon: false,
  },
  {
    key: E_HEADER_EDIT_TOOLBAR_KEY.STYLEDIVIDER,
    control: E_HEADER_EDIT_TOOLBAR_CONTROL.DIVIDER,
    childIcon: false,
  },
  // {
  //   key: E_HEADER_EDIT_TOOLBAR_KEY.PINNING,
  //   control: E_HEADER_EDIT_TOOLBAR_CONTROL.BTN,
  //   childIcon: true,
  //   disabled: true,
  //   icon: 'creditcard-off',
  // },
  // {
  //   key: E_HEADER_EDIT_TOOLBAR_KEY.CONDITIONDIVIDER,
  //   control: E_HEADER_EDIT_TOOLBAR_CONTROL.DIVIDER,
  //   childIcon: false,
  // },
  {
    key: E_HEADER_EDIT_TOOLBAR_KEY.CONDITION,
    control: E_HEADER_EDIT_TOOLBAR_CONTROL.BTN,
    childIcon: false,
    name: locale.conditionalFormat,
    icon: 'data-checked',
  },
];

/**
 * 渲染图片状态
 */
export const useRenderEditList = (
  api: Ref<GridApi>,
  range: Ref<IRange | null>,
  omit: Ref<Array<string>>,
  sameStyle: Ref<CSSProperties>,
  {
    context,
    history,
    allDisabled,
  }: {
    context: Ref<IDGContext>;
    allDisabled: Ref<boolean>;
    history: Ref<Record<string, boolean>>;
  },
) => {
  const renderEditList = ref<Array<IHeaderEditToolbar>>([]);

  watchEffect(() => {
    if (!api.value) {
      return;
    }
    const locale = localeStore.getLocals();
    const disabledList = new Set();
    const isSingle = isSingleCell(api.value, context.value.content);
    const isSpanningRange = isSpanning(api.value, context.value.content);
    /**
     * 合并单元格
     * 选中单个单元格（开始行等于结束行&&列只有1个并没有合并单元格的情况出现）
     */
    if (isSingle && !isSpanningRange) {
      disabledList.add(E_HEADER_EDIT_TOOLBAR_KEY.MERGE);
    }
    const editList = toolbarEditList(locale);
    const cacheEditList = editList
      .map((item) => {
        const currentConfig = editList.find((cof) => cof.key === item.key);

        // undo & redo
        if (history.value?.[item.key] !== undefined) {
          item.disabled = history.value[item.key];
        }

        // disabled
        if (range.value === null || disabledList.has(item.key) || allDisabled.value) {
          return {
            ...item,
            disabled: true,
          };
        }

        item.active =
          currentConfig?.option?.[0] !== undefined && currentConfig.option[0] === (sameStyle.value as any)?.[item.key];

        if (item.key === E_HEADER_EDIT_TOOLBAR_KEY.BGCOLOR) {
          item.style = {
            color: sameStyle.value?.backgroundColor || 'inherit',
          };
        }

        if (item.key === E_HEADER_EDIT_TOOLBAR_KEY.COLOR) {
          item.style = {
            color: sameStyle.value?.color || 'inherit',
          };
        }

        if (item.key === E_HEADER_EDIT_TOOLBAR_KEY.FORMATVERTICALALIGN) {
          item.icon = `format-vertical-align-${sameStyle.value?.['text-align'] || 'left'}`;
        }

        return item;
      })
      .filter((item) => !omit.value.includes(item.key));

    renderEditList.value = cacheEditList;
  });

  return { renderEditList };
};
