import { useCallback } from 'react';

export type TestIdProp = {
  /**
   * A data-testid attribute to be used for testing purposes. If none is provided, an internal one will be used.
   *
   * Note that the internal data-testid is named after the component name (only in kebab-case).
   */
  'data-testid'?: string;
};

export type GetTestId = (...childNames: (string | number | false | null | undefined)[]) => TestIdProp;

/**
 * Hook which returns a function to generate a `data-testid` attribute by combining a given `data-testid` attribute (based on the component name by default) and child nodes names (optional).
 * Useful for testing.
 * If no child name is provided to `getTestId`, it will return the `TestIdProp` as is.
 *
 * In the following examples, we showcase the internal implementation of this hook which includes a default value for the `data-testid` attribute (based on the component name), and how you may override it by providing a custom `data-testid` attribute.
 * Note that by overriding the default `data-testid` attribute, you will only change the prefix and not its child nodes names.
 *
 * Example of basic usage:
 * ```tsx
 * // MyButton.tsx
 * const MyButton = ({ 'data-testid': dataTestId = 'my-button', ...props }) => {
 *   const getTestId = useTestId(dataTestId);
 *   return (
 *     <button {...props} {...getTestId()} />
 *   );
 * };
 *
 * // MyButton.spec.tsx
 * const { getByTestId } = render(<MyButton />);
 * expect(getByTestId('my-button')).toBeInTheDocument();
 * // or
 * const { getByTestId } = render(<MyButton data-testid="my-custom-id" />);
 * expect(getByTestId('my-custom-id')).toBeInTheDocument();
 * ```
 *
 * Example of usage with child nodes:
 * ```tsx
 * // MyButton.tsx
 * const MyButton = ({ 'data-testid': dataTestId = 'my-button', icon, ...props }) => {
 *   const getTestId = useTestId(dataTestId);
 *   return (
 *     <button {...props} {...getTestId()}>
 *       <span {...getTestId('label')}>
 *        <i {...getTestId('label', 'icon')}>{icon}</i>
 *        Click me
 *       </span>
 *     </button>
 *   );
 * };
 *
 * // MyButton.spec.tsx
 * const { getByTestId } = render(<MyButton />);
 * expect(getByTestId('my-button')).toBeInTheDocument();
 * expect(getByTestId('my-button-label')).toHaveTextContent('Click me');
 * expect(getByTestId('my-button-label-icon')).toBeInTheDocument();
 * // or
 * const { getByTestId } = render(<MyButton data-testid="my-custom-id" />);
 * expect(getByTestId('my-custom-id')).toBeInTheDocument();
 * expect(getByTestId('my-custom-id-label')).toHaveTextContent('Click me');
 * expect(getByTestId('my-custom-id-label-icon')).toBeInTheDocument();
 * ```
 */
export const useTestId = (componentName: string): GetTestId => {
  /**
   * Returns a `data-testid` attribute by combining the component name and child nodes names (optional).
   * Filters out `false`, `null`, and `undefined` values, allowing conditional names like `isMobile && 'mobile'`.
   * Numeric values like `0` are preserved.
   * If no child name is provided, the `data-testid` attribute will only contain the component name (provided by `useTestId` hook).
   *
   * Examples:
   * ```
   * getTestId()
   * // => { 'data-testid': 'component-name' }
   * getTestId('child-name')
   * // => { 'data-testid': 'component-name-child-name' }
   * getTestId('child-name', 'label')
   * // => { 'data-testid': 'component-name-child-name-label' }
   * getTestId(isMobile && 'mobile', 'button')
   * // => { 'data-testid': 'component-name-mobile-button' }
   * ```
   */
  const getTestId = useCallback(
    (...childNames: (string | number | false | null | undefined)[]) => {
      const dataTestId = [componentName, ...childNames]
        .filter((value) => value === 0 || Boolean(value))
        .map(String)
        .join('-');

      return { 'data-testid': dataTestId };
    },
    [componentName]
  );

  return getTestId;
};
