# A react table component that can be dragged and sorted

## install

```bash
// npm
npm install react-drag-sort-table

// yarn
yarn add react-drag-sort-table
```

## API

### Table

|  prop   | description  | 类型 | required | default value |
|  ----   |     ----     |      ----     |   ----   |  ----   |
| dataSource | 数据数组 | object[] | true | [] |
| columns |  |  | true |  |
| canDragSort | 是否使用拖拽排序 | boolean | false | rue |
| canAdjustWidth | 是否可以调整宽度 |   | false |  |
| customDragSortIcon |  |   | false |  |
| align |  |   | false |  |
| onSortDataSource | dataSource顺序改变处理函数，参数分别是当前的值，当前行的值，当前行索引 | (text, rowData, index) => void | true |  |
