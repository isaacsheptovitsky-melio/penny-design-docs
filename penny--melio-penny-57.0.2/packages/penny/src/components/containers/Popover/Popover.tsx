import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { BasePopover, type BasePopoverProps } from '@/components/containers/BasePopover';

import {
  PopoverBody,
  PopoverFooter,
  type PopoverFooterProps,
  PopoverHeader,
  type PopoverHeaderProps,
} from './components';

export type PopoverProps = Omit<BasePopoverProps, 'trigger'> &
  PopoverHeaderProps &
  PopoverFooterProps & {
    description: string;
  };

/**
 * A popover component that displays contextual information in a floating container.
 * Provides a structured layout with optional header, body content, and footer actions.
 */
export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      children,
      title,
      icon,
      description,
      footerText,
      backButtonRenderer,
      actionRenderer,
      'data-testid': dataTestId = 'popover',
      showArrow = false,
      ...props
    },
    ref
  ) => {
    const getTestId = useTestId(dataTestId);
    const hideCloseButton = props.triggerEvent !== 'click' || props.hideCloseButton;

    return (
      <BasePopover
        {...getTestId()}
        data-component="Popover"
        {...props}
        showArrow={showArrow}
        ref={ref}
        trigger={children}
        hideCloseButton={hideCloseButton}
      >
        {(title || icon) && <PopoverHeader {...getTestId('header')} icon={icon} title={title} />}
        <PopoverBody {...getTestId('body')}>{description}</PopoverBody>
        <PopoverFooter
          {...getTestId('footer')}
          actionRenderer={actionRenderer}
          footerText={footerText}
          backButtonRenderer={backButtonRenderer}
        />
      </BasePopover>
    );
  }
);

Popover.displayName = 'Popover';
