import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';

export const day = (value?: dayjs.ConfigType, format?: dayjs.OptionType) => {
  dayjs.extend(isoWeek);
  dayjs.extend(localeData);
  dayjs.extend(quarterOfYear);
  dayjs.extend(isoWeeksInYear);
  dayjs.locale('zh-cn');

  return dayjs(value, format);
};
