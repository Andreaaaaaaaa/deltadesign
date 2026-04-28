import { MenuItemDef, GetContextMenuItemsParams } from 'ag-grid-community';
import { supportMenuRows } from './rows';
import { supportMenuCell } from './cell';
import { supportMenuBase } from '../../copy';
import { supportMenuFormat } from './format';
import { supportMenuMedias } from './medias';
import { supportMenuColumns } from './columns';
import { supportMenuCommments } from './comments';
import { supportMenuCondition } from './condition';
import { TChangeProps, IContextMenuCallbackAppend } from '../../../types';

export const supportMenu: (
  params: GetContextMenuItemsParams,
  callback: (params: TChangeProps, append?: IContextMenuCallbackAppend) => void,
) => Array<MenuItemDef | string> = (params, callback) => {
  return [
    // 剪切、复制、粘贴
    ...supportMenuBase(params),
    'separator',
    // 格式
    // supportMenuFormat(params, callback),
    // 'separator',
    // 行操作
    ...supportMenuRows(params, callback),
    'separator',
    // 列操作
    ...supportMenuColumns(params, callback),
    'separator',
    // 单元格操作
    ...supportMenuCell(params, callback),
    'separator',
    // 评论
    supportMenuCommments(params),
    'separator',
    // 多媒体
    ...supportMenuMedias(),
    'separator',
    // 条件格式
    supportMenuCondition(params),
  ];
};
