import { type Dispatch, forwardRef, useEffect } from 'react';
import { useController } from 'react-hook-form';

import { mergeRefs } from '@/utils/merge-refs';

import {
  type FormControlProps,
  type FormFieldContext,
  type FormFieldProps,
  type FormFieldRenderProps,
  type FormSharedProps,
} from '../FormField.types';

type FormFieldControlRenderProps = {
  setLocalValue: Dispatch<string>;
  fieldContext: FormFieldContext;
} & Pick<FormFieldProps, 'render'> &
  FormSharedProps &
  Pick<FormFieldRenderProps, 'isInvalid'> &
  FormControlProps;

export const FormFieldControlRender = forwardRef<HTMLDivElement, FormFieldControlRenderProps>(
  ({ name, control, render, setLocalValue, maxChars, fieldContext, ...props }, ref) => {
    const { field } = useController({ name, control });

    useEffect(() => {
      if (maxChars) {
        setLocalValue(`${field.value ?? ''}`);
      }
    }, [field.value, setLocalValue, maxChars]);

    const renderFieldProps = {
      ...(maxChars && { maxChars }),
      ...props,
      ...field,
      // TODO:https://meliorisk.atlassian.net/browse/ME-110373
      // eslint-disable-next-line react-hooks/refs
      ref: mergeRefs([field.ref, ref]),
    };

    return <>{render(renderFieldProps, fieldContext)}</>;
  }
);
