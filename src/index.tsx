import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TableBody from './table-body'
import TableHeader from './table-header';
import { IDataSourceItem, IColumnsItem, alignPosition } from './interface'
import { sortColumn } from './const'
import './index.scss'

export interface ITableProps {
  dataSource: IDataSourceItem[]
  columns: IColumnsItem[]
  useSort?: boolean
  align?: alignPosition
  onSortDataSource: (data: IDataSourceItem[]) => void
}

const SortTable: FC<ITableProps> = (props) => {
  const { dataSource, columns, useSort = true, align = 'center', onSortDataSource } = props

  const [columnsWidth, setColumnsWidth] = useState({})

  const whithSortColumns = useMemo<IColumnsItem[]>(() => {
    if (useSort) {
      return [sortColumn, ...columns]
    }
    return columns
  }, [columns, useSort])

  useEffect(() => {
    const columnsWidth: strOrNumObj = whithSortColumns.reduce((mutl: strOrNumObj, column) => {
      const key = String(column.key)
      mutl[key] = column.width || 'auto'
      return mutl
    }, {})

    setColumnsWidth(columnsWidth)
  }, [whithSortColumns])

  const handleColumnsWidthChange = useCallback((data: strOrNumObj) => {
    setColumnsWidth({
      ...columnsWidth,
      ...data
    })
  }, [columnsWidth])

  const handleSortDataSource = useCallback((data: IDataSourceItem[]) => {
    onSortDataSource(data)
  }, [onSortDataSource])

  return <DndProvider backend={HTML5Backend}>
    <table
      className="react-sort-table"
      style={{
        textAlign: align
      }}
    >
      <TableHeader
        columns={whithSortColumns}
        columnsWidth={columnsWidth}
        onColumnsWidthChange={handleColumnsWidthChange}
      />
      <TableBody
        dataSource={dataSource}
        columns={whithSortColumns}
        columnsWidth={columnsWidth}
        onSortDataSource={handleSortDataSource}
      />
    </table>
  </DndProvider>
};

export default SortTable


// export interface Props extends HTMLAttributes<HTMLDivElement> {
//   /** custom content, defaults to 'the snozzberries taste like snozzberries' */
//   children?: ReactChild;
// }

// // Please do not use types off of a default export module or else Storybook Docs will suffer.
// // see: https://github.com/storybookjs/storybook/issues/9556
// /**
//  * A custom Thing component. Neat!
//  */
// export const Thing: FC<Props> = ({ children }) => {
//   return <div>{children || `the snozzberries taste like snozzberries`}</div>;
// };
