import { reactive, toRefs } from 'vue';
import { Radio as TRadio, RadioGroup as TRadioGroup, RadioButton as TRadioButton } from '../src/components/radio';
import { Divider as TDivider } from '../src/components/divider';
import '../src/assets/radio-hook.scss';

export default {
  title: '输入/Radio 单选框',
  component: TRadio,
  argTypes: {},
};

const Template = (args) => ({
  //
  components: { TRadio, TRadioGroup, TRadioButton, TDivider },
  template: `
  <t-radio-group default-value="1">
        <t-radio-button value="1">选项一</t-radio-button>
        <t-radio-button value="2">选项二</t-radio-button>
        <t-radio-button value="3">选项三</t-radio-button>
        <t-radio-button value="4">选项四</t-radio-button>
        <t-radio-button value="5">选项五</t-radio-button>
      </t-radio-group>

      <t-radio allow-uncheck> 可取消选中项 </t-radio>

      <t-divider></t-divider>
      <div class="aw-mt-4">
        <div>radio/regular</div>
        <t-radio-group default-value="1" @change="onChange">
          <t-radio value="1">选项一</t-radio>
          <t-radio value="2">选项二</t-radio>
          <t-radio value="3">选项三</t-radio>
          <t-radio value="4" disabled>选项四</t-radio>
        </t-radio-group>
      </div>

      <t-divider></t-divider>
      <div class="aw-mt-4">
        <div>radio/small</div>
        <t-radio-group size="small" default-value="1" @change="onChange">
          <t-radio value="1">选项一</t-radio>
          <t-radio value="2">选项二</t-radio>
          <t-radio value="3">选项三</t-radio>
          <t-radio value="4" disabled>选项四</t-radio>
        </t-radio-group>
      </div>
    `,
  setup() {
    const state = reactive({
      ...args,
    });

    return {
      ...toRefs(state),
    };
  },
});

export const radioTem = Template.bind({});
radioTem.args = {};
