import { forwardRef, type ForwardRefExoticComponent, type PropsWithChildren } from 'react';

/**
 * @private Do not use this function directly.
 */
export const updateDisplayName = <P,>(Comp: ForwardRefExoticComponent<PropsWithChildren<P>>) => {
  const TargetComponent = forwardRef<HTMLDivElement, P>((props, ref) => <Comp {...(props as P)} ref={ref} />);

  if (Comp?.displayName) {
    TargetComponent.displayName = Comp.displayName.replace('_', 'Typography.');
  }

  return TargetComponent;
};
