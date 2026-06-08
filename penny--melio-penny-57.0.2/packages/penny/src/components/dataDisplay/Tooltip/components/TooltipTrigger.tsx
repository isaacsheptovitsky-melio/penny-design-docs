import { Box } from '@chakra-ui/react';
import { isMobileDevice } from '@melio/penny-utils';
import { cloneElement, type DOMElement, forwardRef, type HTMLProps, isValidElement } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { getAriaProps } from '@/utils/getAriaProps';
import { mergeRefs } from '@/utils/merge-refs';

import { useTooltipContext } from '../tooltip.utils';

// Using `forwardRef` from `React` because the trigger can be any HTML element.
export const TooltipTrigger = forwardRef<
  HTMLElement,
  HTMLProps<HTMLElement> & {
    shouldAddTriggerFocus?: boolean;
    isEnabled?: boolean;
  }
>(({ children, shouldAddTriggerFocus, 'aria-label': ariaLabel, isEnabled, ...props }, triggerRef) => {
  const { refs, isOpen, getReferenceProps } = useTooltipContext();
  const childrenRef = (children as DOMElement<HTMLProps<HTMLElement>, HTMLElement>).ref;
  // TODO:https://meliorisk.atlassian.net/browse/ME-110373
  // eslint-disable-next-line react-hooks/refs
  const refWithChildrenRef = mergeRefs([refs.setReference, triggerRef, childrenRef]);
  // TODO:https://meliorisk.atlassian.net/browse/ME-110373
  // eslint-disable-next-line react-hooks/refs
  const refWithoutChildrenRef = mergeRefs([refs.setReference, triggerRef]);
  const sharedProps = {
    'data-state': isOpen ? 'open' : 'closed',
  };

  const { 'aria-describedby': ariaDescribedBy, ...referenceProps } = getReferenceProps({
    ref: isValidElement(children) || shouldAddTriggerFocus ? refWithoutChildrenRef : undefined,
    tabIndex: 0,
    ...sharedProps,
    ...props,
  } as HTMLProps<Element>);

  const styles = useMultiStyleConfig('Tooltip', {});

  if (isValidElement(children) && !shouldAddTriggerFocus) {
    const {
      'aria-labelledby': childrenAriaLabelledby,
      'aria-describedby': childrenAriaDescribedBy,
      ...childrenProps
    } = children.props as HTMLProps<Element>;
    const {
      'aria-labelledby': referenceAriaLabelledby,
      'aria-describedby': referenceAriaDescribedBy,
      ...childrenReferenceProps
    } = getReferenceProps({
      ref: refWithChildrenRef,
      ...sharedProps,
      ...props,
      ...childrenProps,
    } as HTMLProps<Element>);

    const getSharedAriaProps = () => {
      const ariaLabelledBy = getAriaProps('aria-labelledby', [referenceAriaLabelledby, childrenAriaLabelledby]);
      const ariaDescribedBy = getAriaProps('aria-describedby', [referenceAriaDescribedBy, childrenAriaDescribedBy]);
      return { ...ariaLabelledBy, ...ariaDescribedBy };
    };

    return cloneElement(children, {
      ...(childrenReferenceProps as HTMLProps<Element>),
      // Add tabIndex to the children element if it is enabled to override disabled elements with tooltip to be focusable.
      ...(isEnabled ? { tabIndex: 0 } : {}),
      ...getSharedAriaProps(),
    } as HTMLProps<Element>);
  }

  return (
    <Box
      data-component="TooltipTrigger"
      {...(isMobileDevice() ? { as: 'button', type: 'button' } : { as: 'span', role: 'text' })}
      data-testid="tooltip-trigger-wrapper"
      aria-label={ariaLabel}
      __css={styles['trigger']}
      // For some reason aria-describedby is not working
      aria-labelledby={ariaDescribedBy as string}
      aria-describedby={ariaDescribedBy as string}
      {...referenceProps}
    >
      {children}
    </Box>
  );
});

TooltipTrigger.displayName = 'TooltipTrigger';
