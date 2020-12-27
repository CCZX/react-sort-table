import React, { FC } from 'react'
import { SortIcon } from './icons'
import { IDataSourceItem, IColumnsItem } from './interface'
import { sortColumnKey } from './const'

interface ITableRowProps {
  rowData: IDataSourceItem
  columns: IColumnsItem[]
}

const TableRow: FC<ITableRowProps> = (props) => {
  const { rowData, columns } = props

  return <tr>
    {
      columns.map(column => {
        const cellData = rowData[column.dataKey] || null
        if (column.key === sortColumnKey) {
          return <td
            key={column.key}
            className="react-sort-table-cell"
          >
            <SortIcon />
          </td>
        }
        return <td
          key={column.key}
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
}

export default TableRow
