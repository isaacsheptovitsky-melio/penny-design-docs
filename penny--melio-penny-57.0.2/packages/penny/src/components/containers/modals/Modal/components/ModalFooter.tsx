import { type BoxProps } from '@chakra-ui/react';
import { type TestIdProp, useTestId } from '@melio/penny-utils';

import { Button } from '@/components/action/Button';
import { Group, GroupItem } from '@/components/containers/Group';
import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

import { BaseModalFooter } from '../../BaseModal/components/BaseModalFooter';
import { type ModalProps } from '../Modal.types';

type ModalFooterProps = Pick<ModalProps, 'primaryButton' | 'secondaryButton'> & BoxProps & TestIdProp;

export const ModalFooter = ({
  children,
  primaryButton,
  secondaryButton,
  'data-testid': dataTestId = 'modal-footer',
  ...props
}: ModalFooterProps) => {
  const { isExtraSmallScreen: isMobile } = useBreakpoint();
  const showButtons = !!primaryButton || !!secondaryButton;
  const singleButton = showButtons && !(!!primaryButton && !!secondaryButton);
  const getTestId = useTestId(dataTestId);

  const desktopButtons = (
    <Group spacing="s" variant="horizontal" justifyContent={singleButton ? 'flex-end' : 'space-between'}>
      {secondaryButton && <Button {...secondaryButton} data-testid="modal-btn-secondary" size="medium" />}
      {primaryButton && <Button {...primaryButton} data-testid="modal-btn-primary" size="medium" />}
    </Group>
  );

  const mobileButtons = (
    <Group spacing="s" variant="horizontal" justifyContent={singleButton ? 'flex-end' : 'space-between'}>
      {secondaryButton && (
        <GroupItem grow={1}>
          <Button {...secondaryButton} data-testid="modal-btn-secondary" size="medium" isFullWidth />
        </GroupItem>
      )}
      {primaryButton && (
        <GroupItem grow={1}>
          <Button {...primaryButton} data-testid="modal-btn-primary" size="medium" isFullWidth />
        </GroupItem>
      )}
    </Group>
  );

  return (
    <BaseModalFooter {...getTestId()} {...props}>
      {(showButtons || children) && (
        <Group variant="vertical" spacing={isMobile ? 's' : 'm'}>
          {showButtons && isMobile && mobileButtons}
          {showButtons && !isMobile && desktopButtons}
          {children}
        </Group>
      )}
    </BaseModalFooter>
  );
};

ModalFooter.displayName = 'ModalFooter';
