import { Form as BaseForm, type FormProps } from './Form';
import { inputs } from './inputs';

export type { FormProps };

export * from './inputs/types';

type FormType = typeof BaseForm & typeof inputs;

export const Form: FormType = Object.assign(BaseForm, inputs);

export { createFormFieldInput as _createFormFieldInput } from './inputs/utils';
