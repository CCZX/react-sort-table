export interface IColumnsItem {
  key: strOrNum
  dataKey: strOrNum
  title: strOrNum
  width?: string
  required?: boolean
  render?: (data: any) => React.ReactNode
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
