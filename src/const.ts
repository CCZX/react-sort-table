import { IColumnsItem } from './interface'

export const cssBlock = "react-drag-sort-table"

export const dragSortColumnKey = 'SORT_COLUMN_KEY'

export const dragSortCloumnWidth = '50'

export const defaultWidth = '100'

export const sortColumn: IColumnsItem = {
  key: dragSortColumnKey,
  dataKey: dragSortColumnKey,
  title: '',
  width: dragSortCloumnWidth,
}

export const tableCellMinWidth = 70

export const tableCellMaxWidth = 200
