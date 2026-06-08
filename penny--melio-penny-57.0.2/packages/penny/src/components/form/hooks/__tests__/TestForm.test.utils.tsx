import { forwardRef } from 'react';
import type { SchemaOf } from 'yup';
import { object } from 'yup';

import { Button } from '@/components/action/Button';
import { Form } from '@/components/form/components/Form';

import { useMelioForm, type UseMelioFormProps } from '..';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Model = {};
const schema: SchemaOf<Model> = object().shape({});

export const TestForm = forwardRef<HTMLFormElement, UseMelioFormProps<Model> & { target: string }>(
  ({ onSubmit, target, ...props }, ref) => {
    const { formProps, handleSubmit } = useMelioForm({ schema, onSubmit });

    return (
      <Form data-testid="form" ref={ref} {...props} {...formProps}>
        <Button data-testid="form-button" onClick={handleSubmit(target)} />
      </Form>
    );
  }
);
