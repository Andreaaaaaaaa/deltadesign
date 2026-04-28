import { reactive, toRefs, ref } from 'vue';
import { Form as TForm, FormItem as TFormItem } from '../src/components/form';
import { RadioGroup as TRadioGroup, Radio as TRadio } from '../src/components/radio';
import { CheckboxGroup as TCheckboxGroup, Checkbox as TCheckbox } from '../src/components/checkbox';
import { Switch as TSwitch } from '../src/components/switch';
import { Button as TButton } from '../src/components/button';
import { Input as TInput } from '../src/components/input';

export default {
  title: '输入/Form 表单',
  component: TForm,
  argTypes: {
    colon: {
      description: '是否在表单标签字段右侧显示冒号',
      table: {
        type: {
          summary: 'Boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    data: {
      description: '表单数据。',
      table: {
        type: {
          summary: 'Object',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
  },
};
const Template = (args) => ({
  components: { TForm, TFormItem, TRadioGroup, TRadio, TButton, TCheckboxGroup, TCheckbox, TSwitch, TInput },
  template: `
  <t-form ref="form" :data="formData" :colon="true" @reset="onReset" @submit="onSubmit">
  <t-form-item label="姓名" name="name">
    <t-input v-model="formData.name" placeholder="请输入内容"></t-input>
  </t-form-item>
  <t-form-item label="接收短信" name="status">
  <t-switch v-model="formData.status"></t-switch>
  </t-form-item>
  <t-form-item label="手机号码" name="tel">
    <t-input v-model="formData.tel" placeholder="请输入内容"></t-input>
  </t-form-item>

  <t-form-item label="性别" name="gender">
    <t-radio-group v-model="formData.gender">
      <t-radio value="1">男</t-radio>
      <t-radio value="2">女</t-radio>
    </t-radio-group>
  </t-form-item>
  <t-form-item label="课程" name="course">
    <t-checkbox-group v-model="formData.course" :options="courseOptions"></t-checkbox-group>
  </t-form-item>
  <t-form-item style="padding-top: 8px">
    <t-button theme="primary" type="submit" style="margin-right: 10px">提交</t-button>
    <t-button theme="default" variant="base" type="reset">重置</t-button>
  </t-form-item>
</t-form>
`,
  setup() {
    const INITIAL_DATA = {
      name: '',
      tel: '',
      gender: '',
      course: [],
      status: false,
    };

    const courseOptions = [
      { label: '语文', value: '1' },
      { label: '数学', value: '2' },
      { label: '英语', value: '3' },
    ];

    const formData = ref({ ...INITIAL_DATA });

    const state = reactive({
      ...args,
    });

    const onReset = () => {
      console.log('重置成功');
    };

    const onSubmit = ({ validateResult, firstError }) => {
      if (validateResult === true) {
        console.log('提交成功');
      } else {
        console.log('Validate Errors: ', firstError, validateResult);
      }
    };

    return {
      ...toRefs(state),
      formData,
      courseOptions,
      onSubmit,
      onReset,
    };
  },
});

export const formTem = Template.bind({});
formTem.args = {};
formTem.storyName = '表单';
