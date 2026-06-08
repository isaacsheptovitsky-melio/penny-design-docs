import { Children, cloneElement, isValidElement, type ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function drillProps<T>(children: any, props: T, indexPropName?: string) {
  return Children.map(children, (child, index) => {
    const indexProp = indexPropName ? { [`${indexPropName}`]: index } : undefined;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (isValidElement(child)) {
      return cloneElement(child, { ...props, ...indexProp });
    }

    return child as ReactNode;
  }) as ReactNode;
}
