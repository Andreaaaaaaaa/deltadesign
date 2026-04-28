import { Pagination as TPagination } from '../src/components/pagination/index';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: '导航/Pagination 分页',
  component: TPagination,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    "current": {
      "description": "当前页。支持语法糖 v-model 或 v-model:current",
      "control": {
        "type": "text"
      },
      "table": {
        "category": "Props",
        "type": {
          "summary": "Number"
        },
        "defaultValue": {
          "summary": "1"
        }
      }
    },
    "defaultCurrent": {
      "description": "当前页。非受控属性",
      "control": {
        "type": "text"
      },
      "table": {
        "category": "Props",
        "type": {
          "summary": "Number"
        },
        "defaultValue": {
          "summary": "1"
        }
      }
    },
    "disabled": {
      "description": "是否禁用分页组件",
      "control": {
        "type": "text"
      },
      "table": {
        "category": "Props",
        "type": {
          "summary": "Boolean"
        },
        "defaultValue": {
          "summary": "false"
        }
      }
    },
    "foldedMaxPageBtn": {
      "description": "折叠时最多显示页码按钮数",
      "control": {
        "type": "text"
      },
      "table": {
        "category": "Props",
        "type": {
          "summary": "Number"
        },
        "defaultValue": {
          "summary": "5"
        }
      }
    },
    "maxPageBtn": {
      "description": "最多显示页码按钮数",
      "control": {
        "type": "text"
      },
      "table": {
        "category": "Props",
        "type": {
          "summary": "Number"
        },
        "defaultValue": {
          "summary": "10"
        }
      }
    },
    "pageSize": {
      "description": "分页总页数。支持语法糖 v-model:pageSize",
      "control": {
        "type": "number"
      },
      "table": {
        "category": "Props",
        "type": {
          "summary": "Number"
        },
        "defaultValue": {
          "summary": "10"
        }
      }
    },
    "defaultPageSize": {
      "description": "分页总页数。非受控属性",
      "control": {
        "type": "text"
      },
      "table": {
        "category": "Props",
        "type": {
          "summary": "Number"
        },
        "defaultValue": {
          "summary": "10"
        }
      }
    },
    "pageSizeOptions": {
      "description": "分页大小控制器，值为 [] 则不显示。TS 类型：Array<number | { label: string; value: number }>",
      "control": {
        "type": "text"
      },
      "table": {
        "category": "Props",
        "type": {
          "summary": "Array"
        },
        "defaultValue": {
          "summary": "() => [5, 10, 20, 50]"
        }
      }
    },
    "showFirstAndLastPageBtn": {
      "description": "是否显示跳转首页尾页页码控制器",
      "control": {
        "type": "text"
      },
      "table": {
        "category": "Props",
        "type": {
          "summary": "Boolean"
        },
        "defaultValue": {
          "summary": "false"
        }
      }
    },
    "showJumper": {
      "description": "是否显示跳转页码控制器",
      "control": {
        "type": "boolean"
      },
      "table": {
        "category": "Props",
        "type": {
          "summary": "Boolean"
        },
        "defaultValue": {
          "summary": "false"
        }
      }
    },
    "showPageNumber": {
      "description": "是否显示页码控制器",
      "control": {
        "type": "text"
      },
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
    "showPageSize": {
      "description": "是否显示分页数量控制器",
      "control": {
        "type": "text"
      },
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
    "showPreviousAndNextBtn": {
      "description": "是否显示跳转前后页页码控制器",
      "control": {
        "type": "text"
      },
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
    "size": {
      "description": "分页组件尺寸。可选项：small/medium",
      "control": {
        "type": "text"
      },
      "table": {
        "category": "Props",
        "type": {
          "summary": "String"
        },
        "defaultValue": {
          "summary": "medium"
        }
      }
    },
    "theme": {
      "description": "分页组件风格。可选项：default/simple",
      "control": {
        "type": "text"
      },
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
    "total": {
      "description": "数据总条数",
      "control": {
        "type": "number"
      },
      "table": {
        "category": "Props",
        "type": {
          "summary": "Number"
        },
        "defaultValue": {
          "summary": "100"
        }
      }
    },
    "totalContent": {
      "description": "用于自定义总条数呈现内容。默认显示总条数，值为 false 则不显示。TS 类型：boolean | TNode。通用类型定义",
      "control": {
        "type": "Boolean"
      },
      "table": {
        "category": "Props",
        "type": {
          "summary": "Boolean / Slot / Function"
        },
        "defaultValue": {
          "summary": "true"
        }
      }
    },
    "onChange": {
      "description": "TS 类型：(pageInfo: PageInfo) => void 当前页或分页大小发生变化时触发。详细类型定义。 interface PageInfo { current: number; previous: number; pageSize: number } ",
      "control": {
        "type": "text"
      },
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
    "onCurrentChange": {
      "description": "TS 类型：(current: number, pageInfo: PageInfo) => void 当前页发生变化时触发",
      "control": {
        "type": "text"
      },
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
    "onPageSizeChange": {
      "description": "TS 类型：(pageSize: number, pageInfo: PageInfo) => void 分页大小发生变化时触发",
      "control": {
        "type": "text"
      },
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
  components: { TPagination },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<t-pagination v-bind="args" />',
});

export const Demo = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Demo.args = {
  total: 100,
  pageSize: 10,
};
Demo.storyName = '基础';


const SmallTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TPagination },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<t-pagination v-bind="args" size="small"/>',
});

export const small = SmallTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
small.args = {
  size: 'small',
  total: 100,
  pageSize: 10,
  showJumper: true,
};
small.storyName = '小尺寸';

const MiniTemplate = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { TPagination },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<t-pagination v-bind="args" size="small" theme="simple" :totalContent="false"/>',
});

export const mini = MiniTemplate.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
mini.args = {
  size: 'small',
  total: 100,
  pageSize: 10,
};
mini.storyName = '迷你版';
