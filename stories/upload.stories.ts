import { reactive, toRefs, ref } from 'vue';
import { Upload as TUpload } from '../src/components/upload';
import '../src/assets/upload-hook.scss';
import { RadioGroup as TRadioGroup, Radio as TRadio, RadioButton as TRadioButton } from '../src/components/radio';

export default {
  title: '输入/Upload 上传',
  component: TUpload,
  argTypes: {
    accept: {
      description: '接受上传的文件类型',
      table: {
        category: 'Props',
        type: { summary: '' },
        defaultValue: { summary: '' },
      },
    },
    action: {
      description: '上传接口',
      table: {
        category: 'Props',
        type: { summary: '' },
        defaultValue: { summary: '' },
      },
    },
    autoUpload: {
      description: '是否选取文件后自动上传',
      table: {
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
  },
};

const Template = (args) => ({
  components: { TUpload, TRadioGroup, TRadio, TRadioButton },
  template: `
  <div class="tdesign-demo-block-column">
      <div>是否自动上传：<t-switch v-model="autoUpload"></t-switch></div>
      <div>
        <t-radio-group v-model="display" variant="default-filled">
          <t-radio-button value="file">文件拖拽上传</t-radio-button>
          <t-radio-button value="image">图片拖拽上传</t-radio-button>
        </t-radio-group>
      </div>
    </div>

    <!-- data 表示传递给上传接口的额外数据；如果有更复杂的数据场景传递，请使用 format 方法 -->
    <t-upload
      v-model="files"
      :auto-upload="autoUpload"
      :theme="display"
      :data="{ extra_data: 123, file_name: 'certificate' }"
      draggable
      action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
    />
    `,
  setup() {
    const state = reactive({
      ...args,
    });
    const autoUpload = ref(true);
    const files = ref([]);
    const display = ref('file');

    return {
      ...toRefs(state),
      autoUpload,
      args,
      files,
      display,
    };
  },
});

export const uploadTem = Template.bind({});
uploadTem.args = {};
uploadTem.storyName = '基础';

const DragTemplate = (args) => ({
  components: { TUpload, TRadioGroup, TRadio, TRadioButton },
  template: `
  <div class="tdesign-demo-block-column-large">
    <div class="tdesign-demo-block-column">
      <div>是否自动上传：<t-switch v-model="autoUpload"></t-switch></div>
      <div>
        <t-radio-group v-model="display" variant="default-filled">
          <t-radio-button value="file">文件拖拽上传</t-radio-button>
          <t-radio-button value="image">图片拖拽上传</t-radio-button>
        </t-radio-group>
      </div>
    </div>

    <!-- data 表示传递给上传接口的额外数据；如果有更复杂的数据场景传递，请使用 format 方法 -->
    <t-upload
      v-model="files"
      :auto-upload="autoUpload"
      :theme="display"
      :data="{ extra_data: 123, file_name: 'certificate' }"
      draggable
      action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
    />
  </div>
    `,
  setup() {
    const state = reactive({
      ...args,
    });
    const autoUpload = ref(true);
    const files = ref([]);
    const display = ref('file');

    return {
      ...toRefs(state),
      autoUpload,
      args,
      files,
      display,
    };
  },
});

export const dragTem = DragTemplate.bind({});
dragTem.args = {};
dragTem.storyName = '拖拽';

const BenchTemplate = (args) => ({
  components: { TUpload, TRadioGroup, TRadio, TRadioButton },
  template: `
  <div class="t-upload__file-flow-demo">
    <t-upload
      v-model="files"
      action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
      placeholder="支持批量上传文件，文件格式不限，最多只能上传 10 份文件"
      theme="file-flow"
      multiple
      :auto-upload="false"
      :max="10"
    ></t-upload>
  </div>
    `,
  setup() {
    const state = reactive({
      ...args,
    });
    const autoUpload = ref(true);
    const files = ref([]);
    const display = ref('file');

    return {
      ...toRefs(state),
      autoUpload,
      args,
      files,
      display,
    };
  },
});

export const BenchTem = BenchTemplate.bind({});
BenchTem.args = {};
BenchTem.storyName = '批量';
