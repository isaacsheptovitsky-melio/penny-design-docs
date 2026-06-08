import { type FieldErrors } from 'react-hook-form';
import { expect } from 'vitest';
import * as yup from 'yup';
import { type SchemaOf } from 'yup';

import { getFieldError, isFieldRequiredBySchema } from '../useMelioForm.utils';

describe('useMelioForm Utils', () => {
  describe('isFieldRequiredBySchema', () => {
    it('returns that a field if optional according to the schema', () => {
      type Fields = {
        optionalField: string;
        optionalField2: string;
        optionalArray: string[];
        arrayWithOptionalFields: string[];
        objectsArrayFieldWithOptionalFields: { email: string; id: string }[];
        objectsWithOptionalFields: { name: { firstName: string } };
      };
      const schema: SchemaOf<Fields> = yup.object().shape({
        optionalField: yup.string(),
        optionalField2: yup.string().optional(),
        optionalArray: yup.array(yup.string()),
        arrayWithOptionalFields: yup.array(yup.string()),
        objectsArrayFieldWithOptionalFields: yup.array(
          yup.object().shape({
            email: yup.string(),
            id: yup.string().required(),
          })
        ),
        objectsWithOptionalFields: yup.object().shape({
          name: yup.object().shape({
            firstName: yup.string(),
          }),
        }),
      }) as SchemaOf<Fields>;

      expect(isFieldRequiredBySchema('optionalField', schema)).toBe(false);
      expect(isFieldRequiredBySchema('optionalField2', schema)).toBe(false);
      expect(isFieldRequiredBySchema('optionalArray', schema)).toBe(false);
      expect(isFieldRequiredBySchema('arrayWithOptionalFields.2', schema)).toBe(false);
      expect(isFieldRequiredBySchema('objectsArrayFieldWithOptionalFields.4.email', schema)).toBe(false);
      expect(isFieldRequiredBySchema('objectsWithOptionalFields.name.firstName', schema)).toBe(false);
    });

    it('returns that a field if required according to the schema', () => {
      type Fields = {
        requiredField: string;
        requiredArray: string[];
        arrayWithRequiredFields: string[];
        objectsArrayFieldWithRequiredFields: { email: string; id: string }[];
        objectsWithRequiredFields: { name: { firstName: string } };
      };
      const schema = yup.object().shape({
        requiredField: yup.string().required(),
        requiredArray: yup.array(yup.string()).required(),
        arrayWithRequiredFields: yup.array(yup.string().required()),
        objectsArrayFieldWithRequiredFields: yup.array(
          yup.object().shape({
            email: yup.string(),
            id: yup.string().required(),
          })
        ),
        objectsWithRequiredFields: yup.object().shape({
          name: yup.object().shape({
            firstName: yup.string().required(),
          }),
        }),
      }) as SchemaOf<Fields>;

      expect(isFieldRequiredBySchema('requiredField', schema)).toBe(true);
      expect(isFieldRequiredBySchema('requiredArray', schema)).toBe(true);
      expect(isFieldRequiredBySchema('arrayWithRequiredFields.2', schema)).toBe(true);
      expect(isFieldRequiredBySchema('objectsArrayFieldWithRequiredFields.4.id', schema)).toBe(true);
      expect(isFieldRequiredBySchema('objectsWithRequiredFields.name.firstName', schema)).toBe(true);
    });

    it('returns that a field is required or optional dynamically based on values', () => {
      type Fields = {
        requiredField: string;
        requiredArray: string[];
        arrayWithRequiredFields: string[];
        objectsArrayFieldWithRequiredFields: { email: string; id: string }[];
        objectsWithRequiredFields: { name: { firstName: string } };
        conditionallyRequiredField: string;
        nestedField: {
          nestedConditionallyRequiredField: string;
        };
      };
      const schema = yup.object().shape({
        requiredField: yup.string().required(),
        requiredArray: yup.array(yup.string()).required(),
        arrayWithRequiredFields: yup.array(yup.string().required()),
        objectsArrayFieldWithRequiredFields: yup.array(
          yup.object().shape({
            email: yup.string(),
            id: yup.string().required(),
          })
        ),
        objectsWithRequiredFields: yup.object().shape({
          name: yup.object().shape({
            firstName: yup.string().required(),
          }),
        }),
        conditionallyRequiredField: yup.string().when('requiredField', {
          is: 'required',
          then: yup.string().required(),
          otherwise: yup.string().notRequired(),
        }),
        nestedField: yup.object().shape({
          nestedConditionallyRequiredField: yup.string().when('$requiredField', {
            is: 'required',
            then: yup.string().required(),
            otherwise: yup.string().notRequired(),
          }),
        }),
      }) as SchemaOf<Fields>;

      expect(isFieldRequiredBySchema('conditionallyRequiredField', schema, { requiredField: 'required' })).toBe(true);
      expect(isFieldRequiredBySchema('conditionallyRequiredField', schema, { requiredField: 'optional' })).toBe(false);
      expect(
        isFieldRequiredBySchema('nestedField.nestedConditionallyRequiredField', schema, {
          requiredField: 'required',
          nestedField: { nestedConditionallyRequiredField: 'required' },
        })
      ).toBe(true);
      expect(
        isFieldRequiredBySchema('nestedField.nestedConditionallyRequiredField', schema, {
          requiredField: 'optional',
          nestedField: { nestedConditionallyRequiredField: 'optional' },
        })
      ).toBe(false);
    });
  });

  describe('getFieldError', () => {
    type Fields = {
      accountName: string;
      vendors: { email: string; id: string }[];
      user: { name: { firstName: string } };
    };
    it('return the error data according to the errors map', () => {
      const errors = {
        accountName: {
          message: 'Enter this required field.',
          type: 'required',
          types: {
            required: 'Enter this required field.',
          },
          ref: {
            name: 'accountName',
          },
        },
        user: {
          name: {
            firstName: {
              message: 'Enter this required field.',
              type: 'required',
              types: {
                required: 'Enter this required field.',
              },
              ref: {
                name: 'firstName',
              },
            },
          },
        },
        vendors: [
          {
            email: {
              message: 'Please use a valid email address.',
              type: 'email',
              types: {
                email: 'Please use a valid email address.',
              },
              ref: {
                name: 'vendors.0.email',
              },
            },
            id: {
              message: 'id is a required field',
              type: 'required',
              types: {
                required: 'id is a required field',
              },
              ref: {
                name: 'vendors.0.id',
              },
            },
          },
          {
            id: {
              message: 'id is a required field',
              type: 'required',
              types: {
                required: 'id is a required field',
              },
              ref: {
                name: 'vendors.1.id',
              },
            },
          },
        ],
      } as FieldErrors<Fields>;

      expect(getFieldError('accountName', errors)).toEqual(errors.accountName);
      expect(getFieldError('vendors.0.email', errors)).toEqual(errors.vendors?.[0]?.email);
      expect(getFieldError('vendors.0.id', errors)).toEqual(errors.vendors?.[0]?.id);
      expect(getFieldError('vendors.1.email', errors)).toBeUndefined();
      expect(getFieldError('vendors.1.id', errors)).toEqual(errors.vendors?.[1]?.id);
      expect(getFieldError('user.name.firstName', errors)).toEqual(errors.user?.name?.firstName);
    });
  });
});
