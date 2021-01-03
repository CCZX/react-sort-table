import { IColumnsItem } from './interface'

export const cssBlock = "react-drag-sort-table"

export const sortColumnKey = 'SORT_COLUMN_KEY'

export const defaultWidth = '100'

export const sortColumn: IColumnsItem = {
  key: sortColumnKey,
  dataKey: sortColumnKey,
  title: '排序',
  width: '70',
}

export const tableCellMinWidth = 70

export const tableCellMaxWidth = 200
