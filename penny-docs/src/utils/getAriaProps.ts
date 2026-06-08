type AriaProps = 'aria-labelledby' | 'aria-describedby' | 'aria-label';

/**
 * Filter out falsy values, join the remaining values with a space, and create the result object. <br />
 * Returns an object with the given property and value if the value is truthy.
 */
export const getAriaProps = <T>(property: AriaProps, values: T[]): Record<string, string> => {
  const value = values.filter(Boolean).join(' ');
  return value ? { [property]: value } : {};
};
