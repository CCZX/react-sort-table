import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AdjustWidth from './adjust-width'
import { isNumber, debuounce } from './utils'
import { cssBlock, dragSortColumnKey } from './const'
import { IColumnsItem } from './interface'

interface ITableHeadProps {
  canAdjustWidth: boolean
  columns: IColumnsItem[]
  columnsWidth: {[key: string]: string}
  updateColumnsWidth: (data: {[key: string]: string}) => void
}

const TableHeadCell: FC<any> = ({ item, width, isLast, canAdjustWidth, onColumnWidthChange }) => {
  const { title, key, required } = item

  const cellRef = useRef<HTMLTableHeaderCellElement>(null)

  const flexProperty = useMemo(() => {
    const parseWidth = isNumber(width) ? `${width}px` : 'auto'
    if (isNumber(item.width)) {
      return `0 0 ${parseWidth}`
    }
    if (parseWidth !== 'auto') {
      return `0 0 ${parseWidth}`
    }
    return `1 1 ${parseWidth}`
  }, [width, key, dragSortColumnKey])

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
  const [adjustedWidthCloumns, setAdjustedWidthCloumns] = useState<string[]>([])

  const getShouldResetWidthCols = useCallback((arr: string[]) => {
    return columns.filter(item => {
      return !arr.includes(String(item.key)) && !item.width
    }).map(item => item.key)
  }, [columns])

  const getNextCol = useCallback((key) => {
    const index = columns.findIndex(item => item.key === key)
    return columns[index + 1].key
  }, [columns])

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
      const resetWidthCols = getShouldResetWidthCols(adjustedWidthCloumns)
      const resetWidths = resetWidthCols.reduce<{[key: string]: string}>((prev, curr) => {
        prev[curr] = 'auto'
        return prev
      }, {})
      updateColumnsWidth({ ...columnsWidth, ...resetWidths })
      calcColumnsWidth()
    }, 500)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [updateColumnsWidth, calcColumnsWidth, adjustedWidthCloumns, columnsWidth])

  const handleColumnWidthChange = useCallback((width) => {
    const key = Object.keys(width)[0]
    const next = adjustedWidthCloumns.includes(key)
     ? adjustedWidthCloumns
     : [ ...adjustedWidthCloumns, key ]
    setAdjustedWidthCloumns(next)
    const nextKey = getNextCol(key)
    const nextWidth = { [nextKey]: 'auto' }
    updateColumnsWidth({ ...columnsWidth, ...width, ...nextWidth })
    calcColumnsWidth()
  }, [columnsWidth, updateColumnsWidth, adjustedWidthCloumns, calcColumnsWidth])

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
          />
        })
      }
    </div>
  </div>
}

export default TableHeader
