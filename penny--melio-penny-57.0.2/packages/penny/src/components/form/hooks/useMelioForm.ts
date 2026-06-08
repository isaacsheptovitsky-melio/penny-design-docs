import { yupResolver } from '@hookform/resolvers/yup';
import { defaults } from '@melio/penny-utils';
import { useEffect, useRef } from 'react';
import type { FieldError, FieldValues, Path } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { type ObjectSchema } from 'yup';

import { type FormProps, type MelioFormProps, type UseMelioFormProps, type UseMelioFormResults } from './types';
import { getFieldError, isFieldRequiredBySchema } from './useMelioForm.utils';

const defaultProps: MelioFormProps = {
  criteriaMode: 'all',
  reValidateMode: 'onChange',
  mode: 'onSubmit',
  defaultValues: {},
};

const defaultFormProps: FormProps = {
  autoComplete: 'off', // We must use a valid value for a11y reasons
};

function createDefaultValue(type: string) {
  switch (type) {
    case 'number':
      return 0;
    case 'string':
      return '';
    case 'boolean':
      return false;
  }
  return void 0;
}

export const useMelioForm = <T extends FieldValues>({
  schema,
  onSubmit,
  onError,
  isSaving,
  isLoading,
  onSubmissionStateChange,
  subscribeToDefaultValuesChanges,
  subscribeToDefaultValuesChangesOptions,
  showOptionalIndicator,
  ..._props
}: UseMelioFormProps<T>): UseMelioFormResults<T> => {
  const { defaultValues, ...props } = defaults(_props, defaultProps);
  const useFormResults = useForm<T>({
    resolver: schema && yupResolver(schema as ObjectSchema<T>),
    ...props,
    defaultValues: {
      ...Object.entries((schema as ObjectSchema<T>)?.fields || {}).reduce(
        (memo, [key, schema]) => ({
          ...memo,
          [key]: createDefaultValue((schema as ObjectSchema<T>).type),
        }),
        {}
      ),
      ...defaultValues,
    } as UseMelioFormProps<T>['defaultValues'],
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const { isValid, errors } = useFormResults.formState;
  const values = useFormResults.getValues();

  // The form button is always enabled when validating on submit
  const isSubmittable = (props.mode == 'onSubmit' || isValid) && !isLoading;

  const formProps: UseMelioFormResults<T>['formProps'] = {
    ...defaultFormProps,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSubmit: useFormResults.handleSubmit((data, event) => {
      onSubmit(data, event, inputRef.current?.dataset['target']);
      if (inputRef.current?.dataset['target']) delete inputRef.current.dataset['target'];
    }, onError),
    inputRef,
    isReadOnly: isSaving || isLoading,
    isLoading,
  };

  const registerField = (fieldName: Path<T>) => ({
    error: getFieldError(fieldName, errors) as FieldError,
    control: useFormResults.control,
    name: fieldName,
    id: fieldName,
    isRequired: schema ? isFieldRequiredBySchema(fieldName, schema, values) : false,
    showOptionalIndicator,
  });

  const handleSubmit = (target?: string) => () => {
    if (target && inputRef.current) inputRef.current.dataset['target'] = target;
    inputRef.current?.click();
  };

  const results = {
    ...useFormResults,
    registerField,
    formProps,
    handleSubmit,
    submitButtonProps: {
      onClick: handleSubmit(),
      isDisabled: !isSubmittable,
      isLoading: isSaving,
    },
    cancelButtonProps: {
      isDisabled: isSaving,
    },
  };

  useEffect(() => {
    onSubmissionStateChange?.(results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmittable, isSaving, isValid, isLoading]);

  useDeepCompareEffect(() => {
    if (subscribeToDefaultValuesChanges) {
      useFormResults.reset(defaultValues as never, subscribeToDefaultValuesChangesOptions);
    }
  }, [defaultValues, subscribeToDefaultValuesChanges]);

  return results;
};
