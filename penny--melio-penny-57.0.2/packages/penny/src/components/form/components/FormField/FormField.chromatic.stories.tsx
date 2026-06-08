import { type Meta, type StoryObj } from '@storybook/react-vite';
import React from 'react';

import { Group } from '@/components/containers/Group';
import { Form } from '@/components/form/components/Form';
import { TextField } from '@/components/selectionAndInputs/TextField';

import { FormField } from './FormField';
import { type FormFieldProps } from './FormField.types';

const meta: Meta<typeof FormField> = {
  title: 'Chromatic/Form Field',
  component: FormField,
};
export default meta;

// This is a regression test for this ticket https://meliorisk.atlassian.net/browse/ME-87194
export const OneOfTheFieldsWithoutHelperText: StoryObj<typeof FormField> = {
  render: ({ isViewMode, ...args }: FormFieldProps) => (
    <Group variant="vertical">
      <Form columns={2}>
        <FormField {...args} labelProps={{ label: 'Field 1 label' }} render={(props) => <TextField {...props} />} />
        <FormField
          {...args}
          labelProps={{ label: 'Field 2 label' }}
          helperText="This is a helper text"
          render={(props) => <TextField {...props} />}
        />
      </Form>
    </Group>
  ),
};
