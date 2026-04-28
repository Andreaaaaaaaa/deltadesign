import { withInstall } from '../../utils/with-install';
import _RangePicker from './range-picker.vue';
import _CustomDatePicker from './custom-date-picker.vue';
// import 'tailwindcss/tailwind.css';
import '../../assets/range-picker-hook.scss';

export * from './type';

export const RangePicker = withInstall(_RangePicker);
export const CustomDatePicker = withInstall(_CustomDatePicker);

export * as PickerUtils from './utils';
export * as PickerConst from './constants';
export default RangePicker;
