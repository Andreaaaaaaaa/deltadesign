import { localeStore } from '../../../locale';

export const supportMenuMedias = () => {
  const locale = localeStore.getLocals();
  return [
    {
      name: locale.insertLink,
      disabled: true,
      action: () => 'link',
    },
    {
      name: locale.insertPicture,
      disabled: true,
      action: () => 'image',
    },
  ];
};
