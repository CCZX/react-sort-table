import React, { FC, useCallback } from 'react'
import TableRow from './table-body-row'
import { IDataSourceItem, IColumnsItem } from './interface'
import { arrayMove } from './utils'
import { cssBlock } from './const'

interface ITableBodyProps {
  dataSource: IDataSourceItem[]
  columns: IColumnsItem[]
  columnsWidth: strOrNumObj
  onSortDataSource: (data: IDataSourceItem[], isDragging?: boolean) => void
}

const TableBody: FC<ITableBodyProps> = (props) => {
  const { columns, dataSource, onSortDataSource, columnsWidth } = props

  const moveRow = useCallback((oldIndex, newIndex) => {
    const arr = arrayMove(dataSource, oldIndex, newIndex)
    onSortDataSource(arr)
  }, [onSortDataSource, dataSource])

  return <tbody className={`${cssBlock}-body`}>
    {
      dataSource.map((rowData, index) => {
        return <TableRow
          key={rowData.key}
          dataSource={dataSource}
          rowData={rowData}
          columns={columns}
          rowIndex={index}
          columnsWidth={columnsWidth}
          moveRow={moveRow}
        />
      })
    }
  </tbody>
}

export default TableBody
