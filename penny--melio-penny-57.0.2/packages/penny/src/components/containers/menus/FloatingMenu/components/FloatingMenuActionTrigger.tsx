import { forwardRef } from 'react';

import { Button } from '@/components/action/Button';
import { Icon } from '@/components/foundations/Icon';

import { Container } from '../../../Container';
import { useMenuContext } from '../../Context';
import type { ActionTriggerProps } from './triggers/ActionTrigger/ActionTrigger.types';

export const FloatingMenuActionTrigger = forwardRef<HTMLButtonElement, ActionTriggerProps>(
  ({ icon, variant = 'default', label, size, ...props }, ref) => {
    const { isOpen } = useMenuContext();

    const leftIcon =
      icon &&
      (size === 'medium' ? (
        <Container alignItems="center" width="fit-content" paddingLeft="xxs">
          <Icon aria-hidden size="small" type={icon} color="inherit" />
        </Container>
      ) : (
        <Icon aria-hidden size="small" type={icon} color="inherit" />
      ));

    const caretIcon =
      size === 'medium' || !leftIcon ? (
        <Icon aria-hidden type={isOpen ? 'caret-up' : 'caret-down'} size="small" color="inherit" />
      ) : (
        <Container alignItems="center" paddingRight="xxs">
          <Icon aria-hidden type={isOpen ? 'caret-up' : 'caret-down'} size="small" color="inherit" />
        </Container>
      );
    return (
      <Button
        data-component="FloatingMenuActionTrigger"
        variant={variant === 'default' ? 'tertiary' : 'secondary-inverse'}
        size={size}
        aria-haspopup="menu"
        leftElement={leftIcon}
        label={label}
        rightElement={caretIcon}
        {...props}
        ref={ref}
      />
    );
  }
);

FloatingMenuActionTrigger.displayName = 'FloatingMenuActionTrigger';
