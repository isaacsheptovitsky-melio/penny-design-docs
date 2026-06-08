import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { Text } from '@/components/dataDisplay/Text';
import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

import { Container } from '../../Container';
import { BaseModal, BaseModalBody, BaseModalHeader } from '../BaseModal';
import { ModalFooter } from './components';
import type { ModalProps } from './Modal.types';

/**
 * The modal is a dialog window that overlays the main content of a page.
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      header,
      primaryButton,
      secondaryButton,
      children,
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      footer,
      bodyTabIndex,
      'data-testid': dataTestId = 'modal',
      ...props
    },
    ref
  ) => {
    const { isExtraSmallScreen: isMobile } = useBreakpoint();
    const getTestId = useTestId(dataTestId);
    const showFooter = !!footer || !!primaryButton || !!secondaryButton;
    let headerContent;
    if (typeof header !== 'string') {
      headerContent = header;
    } else {
      headerContent = (
        <Container paddingTop={isMobile ? 'none' : 'xxs'}>
          <Text as="h2" textStyle="heading2Semi" {...getTestId('header-text')}>
            {header}
          </Text>
        </Container>
      );
    }

    return (
      <BaseModal data-component="Modal" {...getTestId()} {...props} ref={ref}>
        <BaseModalHeader {...getTestId('header')}>{headerContent}</BaseModalHeader>
        <BaseModalBody {...getTestId('body')} tabIndex={bodyTabIndex}>
          {children}
        </BaseModalBody>
        {showFooter && (
          <ModalFooter {...getTestId('footer')} primaryButton={primaryButton} secondaryButton={secondaryButton}>
            {footer}
          </ModalFooter>
        )}
      </BaseModal>
    );
  }
);

Modal.displayName = 'Modal';
