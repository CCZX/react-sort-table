import React, { FC, useMemo } from 'react'
import { DragSortIcon } from './icons'
import { isNumber } from './utils'
import { dragSortColumnKey, cssBlock } from './const'
import { IColumnsItem, IDataSourceItem } from './interface'

interface ITableBodyCellProps {
  column: IColumnsItem
  rowData: IDataSourceItem
  width: strOrNum
  rowIndex: number
  drag: any
}

const TableBodyCell: FC<ITableBodyCellProps> = ({ column, rowData, width, rowIndex, drag }) => {
  const { key } = column
  const isDragSortColumn = key === dragSortColumnKey
  const text = rowData[column.dataKey]

  let cls = `${cssBlock}-cell ${cssBlock}-body-cell`
  if (isDragSortColumn) {
    cls = cls + ' sort-column'
  }

  const flexProperty = useMemo(() => {
    const parseWidth = isNumber(width) ? `${width}px` : 'auto'
    return `0 0 ${parseWidth}`
  }, [width, key, dragSortColumnKey])

  const child = typeof column.render === 'function' ? column.render(text, rowData, rowIndex) : text

  if (isDragSortColumn) {
    return drag(
      <span
        role="td"
        className={cls}
        style={{
          flex: flexProperty,
        }}
      >
        {
          isDragSortColumn ? <DragSortIcon /> : child
        }
      </span>
    )
  }

  return <span
    role="td"
    className={cls}
    style={{
      flex: flexProperty,
    }}
  >
    {
      isDragSortColumn ? <DragSortIcon /> : child
    }
  </span>
}

export default TableBodyCell
