import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import AdjustWidth from './adjust-width'
import { isNumber } from './utils'
import { cssBlock } from './const'
import { IColumnsItem } from './interface'

interface ITableHeadProps {
  columns: IColumnsItem[]
  columnsWidth: strOrNumObj
  onColumnsWidthChange: (data: strOrNumObj) => void
}

const TableHeadCell: FC<any> = ({ thData, width, onColumnsWidthChange }) => {
  const { title, key } = thData

  const cellRef = useRef<HTMLTableHeaderCellElement>(null)
  const [clientWidth, setClientWidth] = useState<number>(0)

  let parseWidth = 'auto'
  if (!isNumber(width) && width !== 'auto') {
    parseWidth = 'auto'
  } else {
    parseWidth = width === 'auto' ? width : width + 'px'
  }

  useEffect(() => {
    setTimeout(() => {
      const { width = 0 } = cellRef.current?.getBoundingClientRect() || {}
      setClientWidth(width)
    }, 0);
  }, [])

  const handleWidthChange = useCallback((width) => {
    onColumnsWidthChange({[key]: width})
    setClientWidth(width)
  }, [onColumnsWidthChange])

  return <th
    ref={cellRef}
    className={`${cssBlock}-cell ${cssBlock}-head-cell`}
    style={{width: parseWidth}}
  >
    { title }
    <AdjustWidth
      width={clientWidth}
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
            thData={item}
            width={columnsWidth[item.key]}
            onColumnsWidthChange={onColumnsWidthChange}
          />
        })
      }
    </tr>
  </thead>
}

export default TableHeader
