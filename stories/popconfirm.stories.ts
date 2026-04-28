import { Button as TButton } from 'tdesign-vue-next/esm/button';
import { Popconfirm as TPopconfirm } from '../src/components/popconfirm/index';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: '消息提醒/Popconfirm 气泡确认框',
  component: { TPopconfirm },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    "cancelBtn": {
      "description": "取消按钮，可自定义。值为 null 则不显示取消按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制取消事件。TS 类型：string | ButtonProps | TNode，Button API Documents。通用类型定义。详细类型定义",
      "control": {
        "type": "text"
      },
      "table": {
        "category": "Props",
        "type": {
          "summary": "String / Object / Slot / Function"
        },
        "defaultValue": {
          "summary": "''"
        }
      }
    },
    "confirmBtn": {
      "description": "确认按钮。值类型为字符串，则表示自定义按钮文本，值类型为 Object 则表示透传 Button 组件属性。使用 TNode 自定义按钮时，需自行控制确认事件。TS 类型：string | ButtonProps | TNode。通用类型定义",
      "control": {
        "type": "text"
      },
      "table": {
        "category": "Props",
        "type": {
          "summary": "String / Object / Slot / Function"
        },
        "defaultValue": {
          "summary": "''"
        }
      }
    },
    "content": {
      "description": "确认框内容。TS 类型：string | TNode。通用类型定义",
      "control": {
        "type": "text"
      },
      "table": {
        "category": "Props",
        "type": {
          "summary": "String / Slot / Function"
        },
        "defaultValue": {
          "summary": "-"
        }
      }
    },
    "default": {
      "description": "触发元素，同 triggerElement。TS 类型：string | TNode。通用类型定义",
      "control": {
        "type": "text"
      },
      "table": {
        "category": "Props",
        "type": {
          "summary": "String / Slot / Function"
        },
        "defaultValue": {
          "summary": "-"
        }
      }
    },
    "destroyOnClose": {
      "description": "是否在关闭浮层时销毁浮层",
      "control": {
        "type": "text"
      },
      "defaultValue": "true",
      "table": {
        "category": "Props",
        "type": {
          "summary": "Boolean"
        },
        "defaultValue": {
          "summary": "true"
        }
      }
    },
    "icon": {
      "description": "确认框图标。TS 类型：TNode。通用类型定义",
      "control": {
        "type": "text"
      },
      "table": {
        "category": "Props",
        "type": {
          "summary": "Slot / Function"
        },
        "defaultValue": {
          "summary": "-"
        }
      }
    },
    "placement": {
      "description": "浮层出现位置。可选项：top/left/right/bottom/top-left/top-right/bottom-left/bottom-right/left-top/left-bottom/right-top/right-bottom",
      "control": {
        "type": "text"
      },
      "defaultValue": "top",
      "table": {
        "category": "Props",
        "type": {
          "summary": "String"
        },
        "defaultValue": {
          "summary": "top"
        }
      }
    },
    "popupProps": {
      "description": "透传 Popup 组件属性。TS 类型：PopupProps，Popup API Documents。详细类型定义",
      "control": {
        "type": "text"
      },
      "table": {
        "category": "Props",
        "type": {
          "summary": "Object"
        },
        "defaultValue": {
          "summary": "-"
        }
      }
    },
    "showArrow": {
      "description": "是否显示浮层箭头",
      "control": {
        "type": "text"
      },
      "defaultValue": "true",
      "table": {
        "category": "Props",
        "type": {
          "summary": "Boolean"
        },
        "defaultValue": {
          "summary": "true"
        }
      }
    },
    "theme": {
      "description": "文字提示风格。可选项：default/warning/danger",
      "control": {
        "type": "text"
      },
      "defaultValue": "default",
      "table": {
        "category": "Props",
        "type": {
          "summary": "String"
        },
        "defaultValue": {
          "summary": "default"
        }
      }
    },
    "triggerElement": {
      "description": "触发元素。TS 类型：string | TNode。通用类型定义",
      "control": {
        "type": "text"
      },
      "table": {
        "category": "Props",
        "type": {
          "summary": "String / Slot / Function"
        },
        "defaultValue": {
          "summary": "-"
        }
      }
    },
    "visible": {
      "description": "是否显示气泡确认框。支持语法糖 v-model 或 v-model:visible",
      "control": {
        "type": "text"
      },
      "table": {
        "category": "Props",
        "type": {
          "summary": "Boolean"
        },
        "defaultValue": {
          "summary": "-"
        }
      }
    },
    "defaultVisible": {
      "description": "是否显示气泡确认框。非受控属性",
      "control": {
        "type": "text"
      },
      "table": {
        "category": "Props",
        "type": {
          "summary": "Boolean"
        },
        "defaultValue": {
          "summary": "-"
        }
      }
    },
    "onCancel": {
      "description": "TS 类型：(options: { e: MouseEvent }) => void 点击取消按钮时触发",
      "control": {
        "type": "text"
      },
      "defaultValue": "",
      "table": {
        "category": "Props",
        "type": {
          "summary": "Function"
        },
        "defaultValue": {
          "summary": ""
        }
      }
    },
    "onConfirm": {
      "description": "TS 类型：(options: { e: MouseEvent }) => void 点击确认按钮时触发",
      "control": {
        "type": "text"
      },
      "defaultValue": "",
      "table": {
        "category": "Props",
        "type": {
          "summary": "Function"
        },
        "defaultValue": {
          "summary": ""
        }
      }
    },
    "onVisibleChange": {
      "description": "TS 类型：(visible: boolean, context?: PopconfirmVisibleChangeContext) => void 确认框显示或隐藏时触发。详细类型定义。 interface PopconfirmVisibleChangeContext { trigger?: TriggerSource; e?: MouseEvent }  type TriggerSource = 'cancel' | 'confirm' | 'document' | 'trigger-element-click' ",
      "control": {
        "type": "text"
      },
      "defaultValue": "",
      "table": {
        "category": "Props",
        "type": {
          "summary": "Function"
        },
        "defaultValue": {
          "summary": ""
        }
      }
    }
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TPopconfirm, TButton },
  // The story's `args` need to be mapped into the template through the `setcup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<t-popconfirm v-bind="args">
    <t-button variant="outline">删除订单</t-button>
    </t-popconfirm>`,
});

export const Demo = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Demo.args = {
  theme: 'default',
  content: '确认删除订单吗',
};

Demo.storyName = '基础';
