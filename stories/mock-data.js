export const columns = [
  {
    title: 'Name',
    dataKey: 'name',
    key: 'name',
    width: '80',
    helpMessage: '帮助信息',
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
]

export const data = [
  {
    key: '1',
    name: '张三',
    age: 21,
    address: '幸福村1号',
  },
  {
    key: '2',
    name: '李四',
    age: 22,
    address: '幸福村2号',
  },
  {
    key: '3',
    name: '王五',
    age: 23,
    address: '幸福村3号',
  },
]
