// export * from 'tdesign-vue-next/esm/pagination';


// import { Pagination } from 'tdesign-vue-next/esm/pagination';
import withInstall from 'tdesign-vue-next/esm/utils/withInstall.js';
import _Pagination from './index.vue';

export * from 'tdesign-vue-next/esm/pagination';
export const Pagination = withInstall(_Pagination);

export { Pagination as default };