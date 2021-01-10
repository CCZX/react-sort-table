import React from 'react';
import { Meta, Story } from '@storybook/react';
import Table, { IDragSortTableProps } from '../src';
import { data, columns } from './mock-data'
import { useCallback, useState } from '@storybook/addons';

const meta: Meta = {
  title: 'Welcome',
  component: Table,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<IDragSortTableProps> = args => {
  const [dataSource, setDataSource] = useState(data)

  const handleNameChange = useCallback((e, index) => {
    dataSource[index].name = e.target.value
    setDataSource(dataSource)
    console.log(e.target.value)
  }, [dataSource])

  const columns = [
    {
      title: 'Name',
      dataKey: 'name',
      key: 'name',
      width: '200',
      render(name, row, index) {
        return <input value={name} onChange={(e) => handleNameChange(e, index)} />
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

  const handleSort = useCallback((data) => {
    setDataSource(data)
  }, [])

  return <div 
    // style={{width: '500px'}}
  >
    <Table {...args}
      dataSource={dataSource}
      onSortDataSource={handleSort}
      columns={columns}
    />
  </div>
}

// // By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// // https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  dataSource: data,
  columns: columns
};
