import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import AdjustWidth from './adjust-width'
import { isNumber } from './utils'
import { IColumnsItem } from './interface'

interface ITableHeaderProps {
  columns: IColumnsItem[]
  columnsWidth: strOrNumObj
  onColumnsWidthChange: (data: strOrNumObj) => void
}



const TableHeaderCell: FC<any> = ({ thData, width, onColumnsWidthChange }) => {
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

  return <th ref={cellRef} className='react-sort-table-cell' style={{width: parseWidth}}>
    { title }
    <AdjustWidth
      width={clientWidth}
      onWidthChange={handleWidthChange}
    />
  </th>
}

const TableHeader: FC<ITableHeaderProps> = (props) => {
  const { columns, columnsWidth, onColumnsWidthChange } = props

  return <thead className='react-sort-table-head'>
    <tr className="react-sort-table-head-row">
      {
        columns.map(item => {
          return <TableHeaderCell
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
