import { CellEditingStartedEvent } from 'ag-grid-community';

/**
 * 设置光标在最后一个
 */
export const setEditorCursorLast = (event: CellEditingStartedEvent) => {
  const { value } = event;
  const currentElement = document.getElementsByClassName('ag-cell-inline-editing')[0];
  const inputElement = currentElement.getElementsByTagName('input')[0];
  if (inputElement) {
    const currentValue = inputElement.value || value;
    const valLength = currentValue?.length || 0;
    inputElement.selectionStart = valLength;
    inputElement.selectionEnd = valLength;
  }
};
