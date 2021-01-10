import React, { FC, useCallback, useLayoutEffect, useRef, useState } from 'react'
import AdjustWidth from './adjust-width'
import { isNumber } from './utils'
import { cssBlock } from './const'
import { IColumnsItem } from './interface'

interface ITableHeadProps {
  canAdjustWidth: boolean
  columns: IColumnsItem[]
  columnsWidth: strOrNumObj
  onColumnsWidthChange: (data: strOrNumObj) => void
}

const TableHeadCell: FC<any> = ({ item, width, isLast, canAdjustWidth, onColumnsWidthChange }) => {
  const { title, key, required } = item

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

  return <span
    role="th"
    ref={cellRef}
    className={`${cssBlock}-cell ${cssBlock}-head-cell`}
    style={{
      width: parseWidth,
      flexBasis: parseWidth,
    }}
  >
    {
      required && <span className="required-icon">*</span>
    }
    { title }
    {
      !isLast && canAdjustWidth && <AdjustWidth
        width={cellWidth}
        onWidthChange={handleWidthChange}
      />
    }
  </span>
}

const TableHeader: FC<ITableHeadProps> = (props) => {
  const { canAdjustWidth, columns, columnsWidth, onColumnsWidthChange } = props

  return <div role="thead" className={`${cssBlock}-head`}>
    <div role="tr" className={`${cssBlock}-row ${cssBlock}-head-row`}>
      {
        columns.map((item, index) => {
          return <TableHeadCell
            key={item.key}
            canAdjustWidth={canAdjustWidth}
            isLast={index === columns.length - 1}
            item={item}
            width={columnsWidth[item.key]}
            onColumnsWidthChange={onColumnsWidthChange}
          />
        })
      }
    </div>
  </div>
}

export default TableHeader
