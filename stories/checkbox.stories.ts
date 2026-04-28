import { reactive, toRefs } from 'vue';
import { Checkbox as TCheckbox } from '../src/components/checkbox';

export default {
  title: '输入/Checkbox 多选框',
  component: TCheckbox,
};

const Template = (args) => ({
  components: { TCheckbox },
  template: `
  <t-checkbox>未选中项</t-checkbox>
    <t-checkbox>未选悬停项</t-checkbox>
    <t-checkbox :default-checked="true"> 选中项 </t-checkbox>
    <t-checkbox disabled> 未选禁用项 </t-checkbox>
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

export const checkboxTem = Template.bind({});
checkboxTem.args = {};
