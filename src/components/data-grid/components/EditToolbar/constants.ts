import { IValueFormatterNumber } from '../../types';
import { E_HEADER_EDIT_TOOLBAR_CONTROL, E_FORMAT_KEY, E_FORMAT_NEGATIVE } from '../../enums';

/**
 * formatNumber状态
 */
export const initFormatNumberState: IValueFormatterNumber = {
  key: E_FORMAT_KEY.NUMBER,
  decimal: 2,
  thousandths: false,
  negative: E_FORMAT_NEGATIVE.MINUS,
};

type TFormatNumberParams = {
  visible: boolean;
} & IValueFormatterNumber;

export const renderButton = [
  E_HEADER_EDIT_TOOLBAR_CONTROL.BTN,
  E_HEADER_EDIT_TOOLBAR_CONTROL.DIALOG,
  E_HEADER_EDIT_TOOLBAR_CONTROL.SWITCHVALUE,
];

export const baseFormatDialog: TFormatNumberParams = {
  ...initFormatNumberState,
  visible: false,
};
