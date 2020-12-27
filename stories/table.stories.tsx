import React from 'react';
import { Meta, Story } from '@storybook/react';
import Table, { ITableProps } from '../src';
import { data, columns } from './mock-data'

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

const Template: Story<ITableProps> = args => <Table {...args} />;

// // By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// // https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  dataSource: data,
  columns: columns
};
