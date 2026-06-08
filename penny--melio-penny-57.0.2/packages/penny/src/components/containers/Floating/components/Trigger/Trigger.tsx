import { cloneElement, type DOMElement, forwardRef, type HTMLProps, isValidElement } from 'react';

import { mergeRefs } from '@/utils';

import { type TriggerProps } from './Trigger.types';

export const Trigger = forwardRef<HTMLDivElement, TriggerProps>(
  ({ getReferenceProps, setTriggerRef, children, isDisabled = false, ...props }, propRef) => {
    // In React 19, ref is a regular prop so children.props.ref exists.
    // We must read it from props (React 19) with fallback to element.ref (React 18).
    const childrenRef =
      (children.props as HTMLProps<HTMLElement>).ref ??
      (children as DOMElement<HTMLProps<HTMLElement>, HTMLElement>).ref;
    // TODO:https://meliorisk.atlassian.net/browse/ME-110373
    // eslint-disable-next-line react-hooks/refs
    const refWithChildrenRef = mergeRefs<HTMLElement>([setTriggerRef, propRef, childrenRef]);
    if (isValidElement(children)) {
      return cloneElement(children, {
        ...getReferenceProps({
          onClick: (e) => {
            e.stopPropagation();
          },
          disabled: isDisabled,
          ...{ 'data-component': 'FloatingTrigger' },
          ...(children.props as HTMLProps<HTMLElement>),
          // ref must come after children.props spread so React 19's prop-based ref doesn't override it
          ref: refWithChildrenRef,
          ...props,
        }),
      } as HTMLProps<HTMLElement>);
    }

    return <>{children}</>;
  }
);

Trigger.displayName = 'Trigger';
