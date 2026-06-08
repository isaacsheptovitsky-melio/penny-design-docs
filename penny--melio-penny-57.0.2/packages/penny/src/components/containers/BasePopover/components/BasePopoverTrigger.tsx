import { Box, forwardRef } from '@chakra-ui/react';
import {
  type AriaAttributes,
  cloneElement,
  type DOMAttributes,
  type DOMElement,
  type HTMLProps,
  isValidElement,
  type MouseEvent,
} from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { mergeRefs } from '@/utils';

import { useBasePopoverContext } from '../BasePopoverContext';

export type BasePopoverTriggerProps = {
  'data-component': string;
  triggerProps?: AriaAttributes & DOMAttributes<HTMLElement>;
};

type PopoverTriggerChildren = DOMElement<HTMLProps<HTMLElement>, HTMLElement>;

export const BasePopoverTrigger = forwardRef<HTMLProps<HTMLElement> & BasePopoverTriggerProps, 'button' | 'span'>(
  ({ children, triggerProps, ...props }, triggerRef) => {
    const { refs, onOpenChange, isOpen, getReferenceProps } = useBasePopoverContext();
    const childrenRef = (children as PopoverTriggerChildren).ref;
    // TODO:https://meliorisk.atlassian.net/browse/ME-110373
    // eslint-disable-next-line react-hooks/refs
    const ref = mergeRefs([refs.setReference, triggerRef, childrenRef]);
    const dataState = isOpen ? 'open' : 'closed';
    const sharedProps = {
      ref,
      'data-state': dataState,
      tabIndex: 0,
    };
    const handleClick = (event: MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      onOpenChange(!isOpen, 'children');
    };
    const styles = useMultiStyleConfig('BasePopover', {});

    if (isValidElement(children)) {
      const referenceProps = getReferenceProps({
        ...sharedProps,
        ...props,
        ...children.props,
        onClick: (event: MouseEvent<HTMLElement>) => {
          handleClick(event);
          (children as PopoverTriggerChildren).props.onClick?.(event);
        },
      } as HTMLProps<Element>);

      return cloneElement(children, { ...referenceProps } as HTMLProps<Element>);
    }

    return (
      <Box
        data-component={props['data-component']}
        as="button"
        __css={styles['trigger']}
        {...sharedProps}
        {...getReferenceProps(props)}
        onClick={handleClick}
        {...triggerProps}
      >
        {children}
      </Box>
    );
  }
);

BasePopoverTrigger.displayName = 'BasePopoverTrigger';
