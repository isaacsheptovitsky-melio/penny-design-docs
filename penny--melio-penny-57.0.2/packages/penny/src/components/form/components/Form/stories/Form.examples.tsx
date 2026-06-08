import { useState } from 'react';
import * as yup from 'yup';

import { Button } from '@/components/action/Button';
import { Group } from '@/components/containers/Group';
import { Text } from '@/components/dataDisplay/Text';
import { Form } from '@/components/form/components/Form';
import { FormField } from '@/components/form/components/FormField';
import { SelectNew } from '@/components/selectionAndInputs/SelectNew';
import { TextField } from '@/components/selectionAndInputs/TextField';

import { useMelioForm } from '../../../hooks';

export const DynamicRequiredFieldsExample = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const schema: yup.SchemaOf<{ country?: string; state?: string }> = yup.object().shape({
    country: yup.string().required(),
    state: yup.string().when('country', {
      is: 'US',
      then: yup.string().required(),
      otherwise: yup.string().optional(),
    }),
  });

  const { watch, registerField, submitButtonProps, formProps } = useMelioForm<{
    country?: string;
    state?: string;
  }>({
    onSubmit: () => setIsSubmitted(true),
    schema,
  });

  watch(['country']);

  return (
    <Group variant="vertical">
      <Form size="large" {...formProps} data-testid="form">
        <FormField
          {...registerField('country')}
          labelProps={{ label: 'Country' }}
          render={(props) => (
            <SelectNew
              {...props}
              emptyState="No options"
              options={[
                { label: 'United States', value: 'US' },
                { label: 'Israel', value: 'IL' },
              ]}
              placeholder="Enter your country..."
            />
          )}
        />
        <FormField
          {...registerField('state')}
          labelProps={{ label: 'State' }}
          render={(props) => <TextField {...props} placeholder="Enter your state..." />}
          data-testid="form-input-state"
        />
      </Form>
      <Group justifyContent="flex-end">
        <Button {...submitButtonProps} label="Submit" />
      </Group>
      {isSubmitted && <Text>Submitted!</Text>}
    </Group>
  );
};
