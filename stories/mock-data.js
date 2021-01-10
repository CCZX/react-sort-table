export const columns = [
  {
    title: 'Name',
    dataKey: 'name',
    key: 'name',
    width: '80',
    render(name) {
      return <input value={name} />
    }
  },
  {
    title: 'Age',
    dataKey: 'age',
    key: 'age',
    required: true
  },
  {
    title: 'Address',
    dataKey: 'address',
    key: 'address',
  },
  {
    title: 'clazz',
    dataKey: 'clazz',
    key: 'clazz',
  },
]

export const data = [
  {
    key: '1',
    name: '张三',
    age: 21,
    address: '幸福村1号',
    clazz: '6-1',
  },
  {
    key: '2',
    name: '李四',
    age: 22,
    address: '幸福村2号',
    clazz: '5-1',
  },
  {
    key: '3',
    name: '王五',
    age: 23,
    address: '幸福村3号',
    clazz: '4-1',
  },
]
