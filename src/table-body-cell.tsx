import React, { FC } from 'react'
import { DragSortIcon } from './icons'
import { isNumber } from './utils'
import { sortColumnKey, cssBlock } from './const'
import { IColumnsItem, IDataSourceItem } from './interface'

interface ITableBodyCellProps {
  column: IColumnsItem
  data: IDataSourceItem
  width: strOrNum
}

const TableBodyCell: FC<ITableBodyCellProps> = ({ column, data, width }) => {
  const isDragSortColumn = column.key === sortColumnKey

  let parseWidth = 'auto'
  if (isNumber(width)) {
    parseWidth = `${width}px`
  }

  let cls = `${cssBlock}-cell ${cssBlock}-body-cell`
  if (isDragSortColumn) {
    cls = cls + ' sort-column'
  }

  const child = typeof column.render === 'function' ? column.render(data) : data

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
