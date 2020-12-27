import React, { FC, useCallback } from 'react'
import TableRow from './table-row'
import { IDataSourceItem, IColumnsItem } from './interface'
import { moveArray } from './utils'

interface ITableBodyProps {
  dataSource: IDataSourceItem[]
  columns: IColumnsItem[]
  onSortDataSource: (data: IDataSourceItem[]) => void
}

const TableBody: FC<ITableBodyProps> = (props) => {
  const { columns, dataSource, onSortDataSource } = props

  const moveRow = useCallback((oldIndex, newIndex) => {
    const arr = moveArray(dataSource, oldIndex, newIndex)
    onSortDataSource(arr)
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
