import { get } from '@melio/penny-utils';
import { type FieldErrors, type Path } from 'react-hook-form';
import { reach, type SchemaOf } from 'yup';

export const isFieldRequiredBySchema = <T extends Record<string, unknown>>(
  name: Path<T>,
  schema: SchemaOf<T>,
  values?: Partial<T>
) => {
  try {
    let fieldSchema = reach(schema, name) as SchemaOf<T>;
    if (values) {
      const nameParts = name.split('.');
      const parentPath = nameParts.slice(0, -1).join('.');
      const parent = parentPath ? get(values, parentPath) : values;
      const value = get(values, name);

      fieldSchema = fieldSchema.resolve({
        value,
        context: values,
        parent,
      });
    }

    return !!fieldSchema?.['exclusiveTests']?.['required'];
  } catch {
    //reach throws error when the schema does not contain the path
    return false;
  }
};

export const getFieldError = <T extends Record<string, unknown>>(name: Path<T>, errors: FieldErrors<T>) =>
  get(errors, name);
