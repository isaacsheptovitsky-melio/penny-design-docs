import {
  type FloatingContext,
  type ReferenceType,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { useDelayUnmount, useTestId } from '@melio/penny-utils';
import { type Dispatch, type SetStateAction, useMemo, useState } from 'react';

import { type DrawerProps, type DrawerSize } from '../Drawer.types';

export type UseDrawerResult = {
  shouldReturnFocus: DrawerProps['shouldReturnFocus'];
  shouldRestoreFocus: DrawerProps['shouldRestoreFocus'];
  isOpen: DrawerProps['isOpen'];
  isMounted: boolean;
  onClose: DrawerProps['onClose'];
  onCloseComplete: DrawerProps['onCloseComplete'];
  closeButtonAriaLabel: string;
  getTestId: ReturnType<typeof useTestId>;
  size: DrawerSize;
  onEsc: DrawerProps['onEsc'];
  onOverlayClick: DrawerProps['onOverlayClick'];
  labelId: string | undefined;
  descriptionId: string | undefined;
  setLabelId: Dispatch<SetStateAction<string | undefined>>;
  setDescriptionId: Dispatch<SetStateAction<string | undefined>>;
  context: FloatingContext<ReferenceType>;
  refs: ReturnType<typeof useFloating>['refs'];
  floatingStyles: ReturnType<typeof useFloating>['floatingStyles'];
  getReferenceProps: ReturnType<typeof useInteractions>['getReferenceProps'];
  getFloatingProps: ReturnType<typeof useInteractions>['getFloatingProps'];
  getItemProps: ReturnType<typeof useInteractions>['getItemProps'];
};

export function useDrawer({
  isOpen,
  onClose,
  onCloseComplete,
  size = 'm',
  shouldReturnFocus,
  shouldRestoreFocus,
  'data-testid': dataTestId = 'drawer',
  closeButtonAriaLabel = 'Close drawer',
  onEsc,
  onOverlayClick,
}: Pick<
  DrawerProps,
  | 'isOpen'
  | 'onClose'
  | 'onCloseComplete'
  | 'data-testid'
  | 'closeButtonAriaLabel'
  | 'shouldReturnFocus'
  | 'shouldRestoreFocus'
  | 'size'
  | 'onEsc'
  | 'onOverlayClick'
>): UseDrawerResult {
  const getTestId = useTestId(dataTestId);
  const [labelId, setLabelId] = useState<string | undefined>();
  const [descriptionId, setDescriptionId] = useState<string | undefined>();
  const isMounted = useDelayUnmount({ isOpen });
  const data = useFloating({ open: isOpen, onOpenChange: onClose });
  const context = data.context;
  const dismiss = useDismiss(context, { outsidePress: false, escapeKey: false });
  const role = useRole(context);
  const interactions = useInteractions([dismiss, role]);

  return useMemo(
    () => ({
      shouldReturnFocus,
      shouldRestoreFocus,
      isOpen,
      isMounted,
      onClose,
      onCloseComplete,
      closeButtonAriaLabel,
      getTestId,
      size,
      onEsc,
      onOverlayClick,
      ...interactions,
      ...data,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [
      shouldReturnFocus,
      shouldRestoreFocus,
      closeButtonAriaLabel,
      data,
      descriptionId,
      getTestId,
      interactions,
      isMounted,
      isOpen,
      labelId,
      onClose,
      onCloseComplete,
      size,
      onEsc,
      onOverlayClick,
    ]
  );
}
