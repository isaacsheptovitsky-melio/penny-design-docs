import { type Dispatch, type SetStateAction, useState } from 'react';
import { type FieldValues } from 'react-hook-form';

import { type UseMelioFormResults } from './types';

export type UseFormSubmissionControllerResults<T extends FieldValues> = Partial<UseMelioFormResults<T>> & {
  onSubmissionStateChange: Dispatch<SetStateAction<UseMelioFormResults<T> | undefined>>;
};

export function useFormSubmissionController<T extends FieldValues>(): UseFormSubmissionControllerResults<T> {
  const [formState, onSubmissionStateChange] = useState<UseMelioFormResults<T>>();
  return {
    ...formState,
    onSubmissionStateChange,
  };
}
