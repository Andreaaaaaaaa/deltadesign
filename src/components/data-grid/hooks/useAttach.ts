import { AttachNode } from 'tdesign-vue-next/esm/common';

export const useAttach = (id: string, rootRef: () => Element | null): { getAttach: () => AttachNode } => {
  const getAttach = () => (rootRef()?.querySelector(id) || id) as AttachNode;

  return { getAttach };
};
