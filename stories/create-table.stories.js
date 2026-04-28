import { ref } from 'vue';
import { CreateTable as TCreateTable, ConfigProvider } from '../src';

export default {
  title: '数据展示/CreateTable 创建表格',
  components: TCreateTable,
  argTypes: {
    // row: {
    //   description: '展示行数',
    //   control: 'input',
    //   table: {
    //     category: 'Required',
    //     type: { summary: 'number' },
    //     defaultValue: { summary: '5' },
    //   },
    // },
    // column: {
    //   description: '展示列数',
    //   control: 'input',
    //   table: {
    //     category: 'Required',
    //     type: { summary: 'number' },
    //     defaultValue: { summary: '10' },
    //   },
    // },
  },
};

const BaseTemplate = () => ({
  components: { TCreateTable, ConfigProvider },
  template: `
    <ConfigProvider :global-config="globalConfig">
      <TCreateTable
        :row="5"
        :column="12"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      />
    </ConfigProvider>
  `,
  setup() {
    const globalConfig = ref({
      createTable: {
        locale: 'en',
      },
    });

    const handleConfirm = (value) => {
      console.log('confirm', value);
    };

    const handleCancel = () => {
      console.log('cancel');
    };

    return {
      globalConfig,
      handleCancel,
      handleConfirm,
    };
  },
});
export const base = BaseTemplate.bind();
base.storyName = '创建表格';
