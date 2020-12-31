import React from 'react';
import { Meta, Story } from '@storybook/react';
import Table, { ITableProps } from '../src';
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

const Template: Story<ITableProps> = args => {
  const [dataSource, setDataSource] = useState(data)

  const handleSort = useCallback((data) => {
    setDataSource(data)
  }, [])

  return <div style={{width: '500px'}}>
    <Table {...args}
      dataSource={dataSource}
      onSortDataSource={handleSort}
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
