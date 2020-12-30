import { IColumnsItem } from './interface'

export const cssBlock = "react-drag-sort-table"

export const sortColumnKey = 'SORT_COLUMN_KEY'

export const sortColumn: IColumnsItem = {
  key: sortColumnKey,
  dataKey: sortColumnKey,
  title: '排序',
  width: 'auto',
}
