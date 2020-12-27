export const columns = [
  {
    title: 'Name',
    dataKey: 'name',
    key: 'name',
    width: '80',
    render: (data) => {
      return `this is ${data}`
    }
  },
  {
    title: 'Age',
    dataKey: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataKey: 'address',
    key: 'address',
  },
]

export const data = [
  {
    key: '1',
    // name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
]
