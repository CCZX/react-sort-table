import React, { FC } from 'react'
import { DragSortIcon } from './icons'
import { isNumber } from './utils'
import { sortColumnKey, cssBlock } from './const'
import { IColumnsItem, IDataSourceItem } from './interface'

interface ITableBodyCellProps {
  column: IColumnsItem
  rowData: IDataSourceItem
  width: strOrNum
  rowIndex: number
}

const TableBodyCell: FC<ITableBodyCellProps> = ({ column, rowData, width, rowIndex }) => {
  const isDragSortColumn = column.key === sortColumnKey
  const text = rowData[column.dataKey]

  let parseWidth = 'auto'
  if (isNumber(width)) {
    parseWidth = `${width}px`
  }

  let cls = `${cssBlock}-cell ${cssBlock}-body-cell`
  if (isDragSortColumn) {
    cls = cls + ' sort-column'
  }

  const child = typeof column.render === 'function' ? column.render(text, rowData, rowIndex) : text

  return <td
    className={cls}
    style={{
      width: parseWidth
    }}
  >
    {
      isDragSortColumn ? <DragSortIcon /> : child
    }
  </td>
}

export default TableBodyCell
