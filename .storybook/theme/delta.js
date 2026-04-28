import { create } from '@storybook/theming';
const LOGO = require('./logo.svg');

export default create({
  base: 'dark',

  colorPrimary: '#fff',
  colorSecondary: 'rgba(213, 43, 45, 1)',

  // UI
  appBg: '#202020',
  appContentBg: '#fff',
  appBorderColor: 'rgba(209, 213, 230, 1)',
  appBorderRadius: 4,

  // Text colors
  textColor: '#fff',
  textInverseColor: 'rgba(213, 43, 45, 1)',

  // Toolbar default and active colors
  barTextColor: 'rgba(32, 32, 32, 0.6)',
  barSelectedColor: 'rgba(213, 43, 45, 1)',
  barBg: '#fff',

  // Form colors
  inputBg: 'white',
  inputBorder: 'rgba(209, 213, 230, 1)',
  inputTextColor: '#202020',
  inputBorderRadius: 4,

  brandTitle: 'delta-ui',
  brandUrl: 'https://git.woa.com/ieg_cdp_web/delta-ui',
  brandImage: LOGO,
  brandTarget: '_self',
});
