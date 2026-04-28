import { Divider as TDivider } from '../src/components/divider/index';

export default {
  title: '基础/Divider 分割线',
  component: TDivider,
  argTypes: {},
};
const template = '<t-divider v-bind="args" >button</t-divider>';

const Template = (args) => ({
  components: { TDivider },
  setup() {
    return { args };
  },
  template,
});

export const Demo = Template.bind({});
Demo.args = {
  dashed: true,
};
const stringifyArguments = (key, value) => {
  switch (typeof value) {
    case 'string':
      return `${key}="${value}"`;
    case 'boolean':
      return value ? key : '';
    default:
      return `:${key}="${value}"`;
  }
};

const generateSource = (templateSource, args) => {
  const stringifiedArguments = Object.keys(args)
    .map((key) => stringifyArguments(key, args[key]))
    .join(' ');

  return templateSource.replace('v-bind="args"', stringifiedArguments);
};

Demo.parameters = {
  docs: {
    source: { code: generateSource(template, Demo.args) },
  },
};
