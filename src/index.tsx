import React, { FC, useCallback, useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import isEqual from 'lodash.isequal'
import TableBody from './table-body'
import TableHead from './table-head';
import { IDataSourceItem, IColumnsItem, alignPosition } from './interface'
import { sortColumn, cssBlock } from './const'
import './index.scss'

export interface IDragSortTableProps {
  /**表格数据 */
  dataSource: IDataSourceItem[]
  /**表格列数据 */
  columns: IColumnsItem[]
  /**是否使用拖拽功能 */
  canDragSort?: boolean
  /**文本水平排列方式 */
  align?: alignPosition
  /**是否可以列的调整宽度 */
  canAdjustWidth?: boolean
  /**自定义拖拽图标 */
  customDragSortIcon?: JSX.Element
  /**删除列按钮 */
  showDeleteColumn?: boolean
  /**table的宽度，默认是父元素宽度的100% */
  tableWidth?: number
  /**拖拽回调函数 */
  onSortDataSource: (data: IDataSourceItem[]) => void
}

const DragSortTable: FC<IDragSortTableProps> = (props) => {
  const { dataSource, columns, canDragSort = true, canAdjustWidth = true, align = 'center', onSortDataSource } = props

  const [columnsWidth, setColumnsWidth] = useState<{[key: string]: string}>({})

  // 添加拖拽排序列
  const whithSortColumns = useMemo<IColumnsItem[]>(() => {
    if (canDragSort) {
      return [sortColumn, ...columns]
    }
    return columns
  }, [columns, canDragSort])

  const handleSortDataSource = useCallback((data: IDataSourceItem[]) => {
    onSortDataSource(data)
  }, [onSortDataSource])

  const updateColumnsWidth = useCallback((widths) => {
    if (!isEqual(columnsWidth, widths)) {
      setColumnsWidth(widths)
    }
  }, [setColumnsWidth, columnsWidth])

  return <DndProvider backend={HTML5Backend}>
    <div
      role="table"
      className={cssBlock}
      style={{
        textAlign: align
      }}
    >
      <TableHead
        canAdjustWidth={canAdjustWidth}
        columns={whithSortColumns}
        columnsWidth={columnsWidth}
        updateColumnsWidth={updateColumnsWidth}
      />
      <TableBody
        dataSource={dataSource}
        columns={whithSortColumns}
        columnsWidth={columnsWidth}
        onSortDataSource={handleSortDataSource}
      />
    </div>
  </DndProvider>
};

export default DragSortTable
