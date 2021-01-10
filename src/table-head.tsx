import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AdjustWidth from './adjust-width'
import { isNumber, debuounce } from './utils'
import { cssBlock, dragSortColumnKey } from './const'
import { IColumnsItem } from './interface'

interface ITableHeadProps {
  canAdjustWidth: boolean
  columns: IColumnsItem[]
  columnsWidth: strOrNumObj
  updateColumnsWidth: (data: {[key: string]: string}) => void
}

const TableHeadCell: FC<any> = ({ grow, item, width, isLast, canAdjustWidth, onColumnWidthChange }) => {
  const { title, key, required } = item

  const cellRef = useRef<HTMLTableHeaderCellElement>(null)

  const flexProperty = useMemo(() => {
    const parseWidth = isNumber(width) ? `${width}px` : 'auto'
    if (isNumber(item.width)) {
      return `0 0 ${parseWidth}`
    }
    // if (parseWidth !== 'auto' && !grow) {
    if (parseWidth !== 'auto') {
      return `0 0 ${parseWidth}`
    }
    return `1 1 ${parseWidth}`
  }, [width, key, dragSortColumnKey, grow])

  const handleWidthChange = useCallback((width) => {
    onColumnWidthChange({[key]: width})
  }, [onColumnWidthChange])

  return <span
    role="th"
    data-key={key}
    ref={cellRef}
    className={`${cssBlock}-cell ${cssBlock}-head-cell`}
    style={{
      flex: flexProperty,
    }}
  >
    {
      required && <span className="required-icon">*</span>
    }
    { title }
    {
      !isLast && canAdjustWidth && key !== dragSortColumnKey && <AdjustWidth
        width={width}
        onWidthChange={handleWidthChange}
      />
    }
  </span>
}

const TableHeader: FC<ITableHeadProps> = (props) => {
  const { canAdjustWidth, columns, columnsWidth, updateColumnsWidth } = props
  const headRowRef = useRef<HTMLDivElement>(null)
  const [grow, setGrow] = useState(false)

  const calcColumnsWidth = useCallback(() => {
    if (!headRowRef.current) return
    const childNodes = Array.from(headRowRef.current.children)
    const widths = childNodes.reduce<{[key: string]: string}>((prev, curr) => {
      const key = curr.getAttribute('data-key') || ''
      const width = curr.getBoundingClientRect().width
      prev[key] = String(width)
      return prev
    }, {})
    updateColumnsWidth(widths)
  }, [updateColumnsWidth, headRowRef.current])

  useEffect(() => {
    calcColumnsWidth()
  }, [])

  useEffect(() => {
    const handleResize = debuounce(() => {
      updateColumnsWidth({})
      calcColumnsWidth()
    }, 500)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [updateColumnsWidth, calcColumnsWidth])

  const handleColumnWidthChange = useCallback((width) => {
    updateColumnsWidth({ ...columnsWidth, ...width })
  }, [columnsWidth, updateColumnsWidth])

  return <div role="thead" className={`${cssBlock}-head`}>
    <div role="tr" ref={headRowRef} className={`${cssBlock}-row ${cssBlock}-head-row`}>
      {
        columns.map((item, index) => {
          return <TableHeadCell
            key={item.key}
            canAdjustWidth={canAdjustWidth}
            isLast={index === columns.length - 1}
            item={item}
            width={columnsWidth[item.key] || item.width || 'auto'}
            onColumnWidthChange={handleColumnWidthChange}
            grow={grow}
          />
        })
      }
    </div>
  </div>
}

export default TableHeader
