import React, { FC, useMemo, useRef, useState } from 'react'
import { DragSourceMonitor, useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { SortIcon } from './icons'
import { IDataSourceItem, IColumnsItem, EDragTypes } from './interface'
import { sortColumnKey, cssBlock } from './const'

interface ITableRowProps {
  dataSource: IDataSourceItem[]
  rowData: IDataSourceItem
  columns: IColumnsItem[]
  index: number
  columnsWidth: strOrNumObj
  moveRow: (oldIndex: number, newIndex: number, isDragging?: boolean) => void
}

const TableRow: FC<ITableRowProps> = (props) => {
  const { rowData, columns, index, columnsWidth, moveRow } = props

  const rowRef = useRef<HTMLTableRowElement>(null)

  /**
   * toIndex：更新后的位置
   * fromIndex：更新前的位置
   */
  const [toIndex, setToIndex] = useState(0)
  const [fromIndex, setFromIndex] = useState(0)

  /**
   * 根据formIndex和toIndex判断类名
   */
  const tableBodyRowCls = useMemo(() => {
    const normalCls = `${cssBlock}-row ${cssBlock}-body-row`
    if (toIndex > fromIndex) {
      // 向下拖动，drop目标的bottom需要高亮
      return `${normalCls} drop-it-bottom`
    } else if (toIndex < fromIndex) {
      // 向上拖动，drop目标的top需要高亮
      return `${normalCls} drop-it-top`
    }
    return normalCls
  }, [toIndex, fromIndex])

  const withTypeRowData = {
    ...rowData,
    index: index,
    type: EDragTypes.tableRow
  }

  const [{ isDragging }, drag, dragPreview] = useDrag({
    item: withTypeRowData,
    collect(monitor: DragSourceMonitor) {
      return {
        isDragging: monitor.isDragging()
      }
    },
    end() {
      setToIndex(0)
      setFromIndex(0)
    }
  })

  const [, drop] = useDrop({
    accept: EDragTypes.tableRow,
    hover(item: typeof withTypeRowData, monitor: DropTargetMonitor) {
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) {
        return
      }
      
      fromIndex !== dragIndex && setFromIndex(dragIndex)
      toIndex !== hoverIndex && setToIndex(hoverIndex)

      // const rowRect = rowRef.current?.getBoundingClientRect() || {} as DOMRect
      // const rowYAxisCenter = (rowRect?.bottom - rowRect?.top) / 2
      // console.log(rowRect, {rowYAxisCenter})
      // // 鼠标🖱位置
      // const mouseOffset = monitor.getClientOffset()
      // console.log(mouseOffset)
      // // 鼠标距离row顶部top的距离
      // const mouseDiffTop = (mouseOffset?.y || 0) - rowRect.top

      // // 向下拖动
      // if (dragIndex < hoverIndex && rowYAxisCenter < mouseDiffTop) {
      //   return
      // }

      // if (dragIndex > hoverIndex && rowYAxisCenter > mouseDiffTop) {
      //   return
      // }

      // moveRow(dragIndex, hoverIndex, isDragging);
    },
    drop(item: typeof withTypeRowData) {
      const dragIndex = item.index;
      const hoverIndex = index;
      moveRow(dragIndex, hoverIndex, isDragging);
    },
    collect() {
      setToIndex(0)
      setFromIndex(0)
    }
  })

  // 拖拽预览
  dragPreview(drop(rowRef))

  return drag(<tr
      ref={rowRef}
      style={{
        opacity: isDragging ? '0.7' : '1'
      }}
      className={tableBodyRowCls}
    >
      {
        columns.map(column => {
          const cellData = rowData[column.dataKey] || null
          if (column.key === sortColumnKey) {
            return <td
              key={column.key}
              className={`${cssBlock}-cell ${cssBlock}-body-cell sort-column`}
            >
              <SortIcon />
            </td>
          }
          return <td
            key={column.key}
            style={{
              width: columnsWidth[column.key]
            }}
            className={`${cssBlock}-cell ${cssBlock}-body-cell`}
          >
            {
              column.render && typeof column.render === 'function'
              ? column.render(cellData)
              : cellData
            }
          </td>
        })
      }
    </tr>
  )
}

export default TableRow
