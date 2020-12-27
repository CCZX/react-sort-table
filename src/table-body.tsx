import React, { FC } from 'react'
import TableRow from './table-row'
import { IDataSourceItem, IColumnsItem } from './interface'

interface ITableBodyProps {
  dataSource: IDataSourceItem[]
  columns: IColumnsItem[]
}

const TableBody: FC<ITableBodyProps> = (props) => {
  const { columns, dataSource } = props

  return <tbody>
    {
      dataSource.map(rowData => {
        return <TableRow
          key={rowData.key}
          rowData={rowData}
          columns={columns}
        />
      })
    }
  </tbody>
}

export default TableBody
