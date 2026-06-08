import { type RefObject } from 'react';

export const checkIfAllValid = (refs: RefObject<HTMLInputElement>[]) => refs.every((ref) => ref.current?.value);

export const getResizedValues = (values: string[], length: number): string[] =>
  length > values.length ? values.concat(Array(length - values.length).fill('')) : values.slice(0, length);

export const checkIsNumeric = (str: string) => {
  if (typeof str !== 'string') return false; // we only process strings!
  return (
    !isNaN(+str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  );
};
