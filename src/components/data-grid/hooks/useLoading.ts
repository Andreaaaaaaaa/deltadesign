import { Ref, watchEffect } from 'vue';
import { GridApi } from 'ag-grid-community';

export interface ILoadingParams {
  loadingMessage: string;
}

export interface IUseLoadingProps {
  gridApi: Ref<GridApi | null>;
  params: Ref<ILoadingParams | null>;
  loading: Ref<boolean>;
}

export const useLoading = (props: IUseLoadingProps) => {
  watchEffect(() => {
    const { params, gridApi } = props;
    if (props.loading.value) {
      // start loading
      params.value = { loadingMessage: 'Loading' };
      gridApi.value?.showLoadingOverlay();
    } else {
      // end loading
      params.value = null;
      gridApi.value?.hideOverlay();
    }
  });
};
