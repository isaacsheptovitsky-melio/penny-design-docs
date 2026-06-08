declare module '@hookform/resolvers/yup' {
  import type { FieldValues, Resolver } from 'react-hook-form';
  import type { AnyObjectSchema } from 'yup';

  export function yupResolver<TFieldValues extends FieldValues = FieldValues>(
    schema: AnyObjectSchema,
    options?: unknown
  ): Resolver<TFieldValues>;
}
