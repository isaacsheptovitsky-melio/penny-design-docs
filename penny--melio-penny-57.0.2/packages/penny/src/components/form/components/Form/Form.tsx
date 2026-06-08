import { type ForwardedRef, forwardRef } from 'react';

import { _Form, type _FormProps as FormProps } from '@/components/internal/_Form';

export type { FormProps };

/**
 * A grouping of input controls that allow a user to submit information to a server.
 */
export const Form = forwardRef((props: FormProps, ref: ForwardedRef<HTMLFormElement>) => (
  <_Form data-component="Form" ref={ref} {...props} />
));

Form.displayName = 'Form';
