import { create } from '@storybook/theming';
const LOGO = require('./logo.svg');
export default create({
  base: 'dark',
  colorPrimary: '#fff',
  // sidebar title
  brandTitle: 'DeltaUI',
  brandImage: LOGO,

  colorSecondary: 'rgba(213, 43, 45, 1)',

  // Toolbar default and active colors
  barBg: '#e1e3e4',
  barSelectedColor: 'rgba(32, 32, 32, 0.8)',

  // UI
  appBg: '#202020', // 11
  // appBg: '#e1e3e4',
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

  // Text colors
  // textColor: '#ccc',
  textInverseColor: 'rgba(213, 43, 45, 1)',

  fontBase:
    '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Noto Sans, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',

  // Form colors
  inputBg: 'white',
  inputBorder: 'rgba(209, 213, 230, 1)',
  inputTextColor: '#202020',
  inputBorderRadius: 4,
});
