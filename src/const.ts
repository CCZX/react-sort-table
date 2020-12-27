import { IColumnsItem, IDataSourceItem } from './interface'

export const cssBlock = "react-sort-table"

export const sortColumnKey = 'SORT_COLUMN_KEY'

export const sortColumn: IColumnsItem = {
  key: sortColumnKey,
  dataKey: sortColumnKey,
  title: '排序',
  width: 'auto',
}

export const placeHolderRowDataKey = 'PLACE_HOLDER_ROW_DATA_KEY'

export const placeHolderRowData: IDataSourceItem = {
  key: placeHolderRowDataKey
}
