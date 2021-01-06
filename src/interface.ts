export interface IColumnsItem {
  key: strOrNum
  dataKey: strOrNum
  title: strOrNum
  width?: string
  required?: boolean
  helpMessage?: string
  render?: (text: any, row?: IDataSourceItem, rowIndex?: number) => React.ReactNode
}

export interface IDataSourceItem {
  key: strOrNum
  [key: string]: any
}

export type alignPosition = 'left' | 'center' | 'right'

// 拖拽类型
export enum EDragTypes {
  tableRow = 'tableRow'
}
