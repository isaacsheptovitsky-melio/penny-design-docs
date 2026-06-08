import { cloneElement, forwardRef, type HTMLProps, isValidElement } from 'react';

import { mergeRefs } from '@/utils';

import { useMenuContext } from '../../useMenu';
import { type TriggerProps } from './Trigger.types';

// Using `forwardRef` from `React` because the trigger can be any HTML element.
export const Trigger = forwardRef<HTMLElement, TriggerProps>(
  ({ 'data-component': dataComponent, ...props }, propRef) => {
    const { getReferenceProps, refs, triggerProps } = useMenuContext();
    const { trigger, isDisabled, isReadOnly } = triggerProps;

    // In React 19, ref is a regular prop so trigger.props.ref exists.
    // Read it from props (React 19) so we can include it in mergeRefs.
    const childrenRef = isValidElement(trigger)
      ? ((trigger.props as HTMLProps<HTMLElement>).ref as React.Ref<HTMLElement> | null | undefined)
      : null;

    // TODO:https://meliorisk.atlassian.net/browse/ME-110373
    // eslint-disable-next-line react-hooks/refs
    const ref = mergeRefs([refs.setReference, propRef, childrenRef]);

    const buttonProps = {
      'data-component': dataComponent,
      'aria-disabled': isDisabled,
      'data-readonly': isReadOnly || null,
      tabIndex: isDisabled ? -1 : 0,
    };

    if (typeof trigger === 'function') {
      const getTriggerProps = () => ({
        role: 'button' as const,
        ...getReferenceProps({
          onClick: (e) => {
            e.stopPropagation();
          },
          ...buttonProps,
          ref,
          ...props,
        }),
        // floating ui - `getReferenceProps`, always returns `onClick`
        // we want `trigger` to know when it's clickable so we override it
        ...(isDisabled && { onClick: undefined }),
      });
      return <>{trigger(getTriggerProps)}</>;
    }

    if (isValidElement(trigger)) {
      return cloneElement(trigger, {
        role: 'button',
        ...getReferenceProps({
          onClick: (e) => {
            e.stopPropagation();
          },
          ...buttonProps,
          ...(trigger.props as HTMLProps<HTMLElement>),
          ...props,
          // ref must come after trigger.props spread so React 19's prop-based ref doesn't override it
          ref,
        }),
        // floating ui - `getReferenceProps`, always returns `onClick`
        // we want `trigger` to know when it's clickable so we override it
        ...(isDisabled && { onClick: undefined }),
      } as HTMLProps<HTMLElement>);
    }

    return <>{trigger}</>;
  }
);

Trigger.displayName = 'Trigger';
