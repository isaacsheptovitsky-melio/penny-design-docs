import { forwardRef } from 'react';

import { IconButton } from '@/components/action/IconButton';

import { useDrawerContext } from '../DrawerContext';

/**
 * @private For internal use only. Should be consumed only by `Drawer`.
 */
export const DrawerCloseButton = forwardRef<HTMLButtonElement>((props, ref) => {
  const { onClose, closeButtonAriaLabel, getTestId } = useDrawerContext();

  return (
    <IconButton
      data-component="DrawerCloseButton"
      ref={ref}
      aria-label={closeButtonAriaLabel}
      icon="close"
      onClick={onClose}
      variant="tertiary"
      {...getTestId('close-button')}
      {...props}
    />
  );
});

DrawerCloseButton.displayName = 'DrawerCloseButton';
