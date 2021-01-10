import React, { FC, useMemo, useRef, useState } from 'react'
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd'
import TableBodyCell from './table-body-cell'
import { cssBlock } from './const'
import { IDataSourceItem, IColumnsItem, EDragTypes } from './interface'

interface ITableBodyRowProps {
  dataSource: IDataSourceItem[]
  rowData: IDataSourceItem
  columns: IColumnsItem[]
  rowIndex: number
  columnsWidth: strOrNumObj
  moveRow: (oldIndex: number, newIndex: number, isDragging?: boolean) => void
}

const TableBodyRow: FC<ITableBodyRowProps> = (props) => {
  const { rowData, columns, rowIndex, columnsWidth, moveRow } = props

  const tableBodyRowRef = useRef<HTMLTableRowElement>(null)

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
    index: rowIndex,
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
    hover(item: typeof withTypeRowData) {
      const dragIndex = item.index;
      const hoverIndex = rowIndex;
      
      if (dragIndex === hoverIndex) {
        return
      }
      
      fromIndex !== dragIndex && setFromIndex(dragIndex)
      toIndex !== hoverIndex && setToIndex(hoverIndex)

      // const rowRect = tableBodyRowRef.current?.getBoundingClientRect() || {} as DOMRect
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
      const hoverIndex = rowIndex;
      moveRow(dragIndex, hoverIndex, isDragging);
    },
    collect() {
      setToIndex(0)
      setFromIndex(0)
    }
  })

  // 拖拽预览
  dragPreview(drop(tableBodyRowRef))

  return drag(<div
      role="tr"
      ref={tableBodyRowRef}
      style={{
        opacity: isDragging ? '0.7' : '1'
      }}
      className={tableBodyRowCls}
    >
      {
        columns.map((column) => {
          return <TableBodyCell
            key={column.key}
            column={column}
            rowData={rowData}
            width={columnsWidth[column.key]}
            rowIndex={rowIndex}
          />
        })
      }
    </div>
  )
}

export default TableBodyRow
