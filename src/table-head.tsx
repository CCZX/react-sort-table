import React, { FC, useCallback, useLayoutEffect, useRef, useState } from 'react'
import AdjustWidth from './adjust-width'
import { isNumber } from './utils'
import { cssBlock } from './const'
import { IColumnsItem } from './interface'

interface ITableHeadProps {
  columns: IColumnsItem[]
  columnsWidth: strOrNumObj
  onColumnsWidthChange: (data: strOrNumObj) => void
}

const TableHeadCell: FC<any> = ({ item, width, onColumnsWidthChange }) => {
  const { title, key } = item

  const cellRef = useRef<HTMLTableHeaderCellElement>(null)
  const [cellWidth, setCellWidth] = useState<number>(0)

  let parseWidth = 'auto'
  if (isNumber(width)) {
    parseWidth = `${width}px`
  }

  useLayoutEffect(() => {
    const { width = 0 } = cellRef.current?.getBoundingClientRect() || {}
    setCellWidth(width)
  }, [setCellWidth, cellRef.current])

  const handleWidthChange = useCallback((width) => {
    onColumnsWidthChange({[key]: width})
    setCellWidth(width)
  }, [onColumnsWidthChange, setCellWidth])

  return <th
    ref={cellRef}
    className={`${cssBlock}-cell ${cssBlock}-head-cell`}
    style={{width: parseWidth}}
  >
    { title }
    <AdjustWidth
      width={cellWidth}
      onWidthChange={handleWidthChange}
    />
  </th>
}

const TableHeader: FC<ITableHeadProps> = (props) => {
  const { columns, columnsWidth, onColumnsWidthChange } = props

  return <thead className={`${cssBlock}-head`}>
    <tr className={`${cssBlock}-row ${cssBlock}-head-row`}>
      {
        columns.map(item => {
          return <TableHeadCell
            key={item.key}
            item={item}
            width={columnsWidth[item.key]}
            onColumnsWidthChange={onColumnsWidthChange}
          />
        })
      }
    </tr>
  </thead>
}

export default TableHeader
