import React, { FC, useRef } from 'react'
import { DragSourceMonitor, useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { SortIcon } from './icons'
import { IDataSourceItem, IColumnsItem, EDragTypes } from './interface'
import { sortColumnKey } from './const'

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
  })

  const [, drop] = useDrop({
    accept: EDragTypes.tableRow,
    hover(item: typeof withTypeRowData, monitor: DropTargetMonitor) {
      console.log(monitor)
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return
      }

      const rowRect = rowRef.current?.getBoundingClientRect() || {} as DOMRect
      const rowYAxisCenter = (rowRect?.bottom - rowRect?.top) / 2
      console.log(rowRect, {rowYAxisCenter})
      // 鼠标🖱位置
      const mouseOffset = monitor.getClientOffset()
      console.log(mouseOffset)
      // 鼠标距离row顶部top的距离
      const mouseDiffTop = (mouseOffset?.y || 0) - rowRect.top

      // 向下拖动
      if (dragIndex < hoverIndex && rowYAxisCenter < mouseDiffTop) {
        return
      }

      if (dragIndex > hoverIndex && rowYAxisCenter > mouseDiffTop) {
        return
      }

      moveRow(dragIndex, hoverIndex, isDragging);
    }
  })

  dragPreview(drop(rowRef))

  return drag(<tr
      ref={rowRef}
      style={{
        opacity: isDragging ? '0.7' : '1'
      }}
      className="react-sort-table-row react-sort-table-body-row"
    >
      {
        columns.map(column => {
          const cellData = rowData[column.dataKey] || null
          if (column.key === sortColumnKey) {
            return <td
              key={column.key}
              className="react-sort-table-cell sort-column"
            >
              <SortIcon />
            </td>
          }
          return <td
            key={column.key}
            style={{
              width: columnsWidth[column.key]
            }}
            className="react-sort-table-cell"
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
