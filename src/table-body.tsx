import React, { FC, useCallback } from 'react'
import TableRow from './table-row'
import { IDataSourceItem, IColumnsItem } from './interface'
import { arrayMove } from './utils'

interface ITableBodyProps {
  dataSource: IDataSourceItem[]
  columns: IColumnsItem[]
  onSortDataSource: (data: IDataSourceItem[], isDragging?: boolean) => void
}

const TableBody: FC<ITableBodyProps> = (props) => {
  const { columns, dataSource, onSortDataSource } = props

  const moveRow = useCallback((oldIndex, newIndex, isDragging?: boolean) => {
    const arr = arrayMove(dataSource, oldIndex, newIndex)
    onSortDataSource(arr, isDragging)
  }, [onSortDataSource, dataSource])

  return <tbody>
    {
      dataSource.map((rowData, index) => {
        return <TableRow
          key={rowData.key}
          dataSource={dataSource}
          rowData={rowData}
          columns={columns}
          index={index}
          moveRow={moveRow}
        />
      })
    }
  </tbody>
}

export default TableBody
