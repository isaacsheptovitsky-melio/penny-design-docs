import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { Text } from '@/components/dataDisplay/Text';
import { StatusIconSolid } from '@/components/foundations/StatusIconSolid';
import { useBreakpointValue } from '@/theme/hooks/useBreakpointValue';

import { Container, type ContainerProps } from '../../Container';
import { Group } from '../../Group';
import { Modal } from '../Modal';
import type { StatusModalProps } from './StatusModal.types';
import { criticalVariants } from './StatusModal.types';

/**
 * A modal component designed for displaying status messages with appropriate icons.
 * Automatically determines button styling based on the status variant.
 */
export const StatusModal = forwardRef<HTMLDivElement, StatusModalProps>(
  (
    {
      header,
      primaryButton,
      secondaryButton,
      children,
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      footer,
      variant,
      'data-testid': dataTestId = 'status-modal',
      ...props
    },
    ref
  ) => {
    const paddingTop = useBreakpointValue<ContainerProps['paddingTop']>({ xs: 'none', s: 'xxs' });
    const getTestId = useTestId(dataTestId);
    const modalHeader = (
      <Container paddingTop={paddingTop}>
        <Group spacing="s" alignItems="flex-start">
          {variant && <StatusIconSolid size="large" variant={variant} aria-hidden />}
          <Text as="h2" textStyle="heading2Semi" {...getTestId('header-text')}>
            {header}
          </Text>
        </Group>
      </Container>
    );
    const isCriticalVariant = Boolean(variant && criticalVariants.includes(variant));
    const primaryButtonProps = primaryButton
      ? {
          ...primaryButton,
          variant: isCriticalVariant ? 'critical' : primaryButton.variant,
        }
      : undefined;

    return (
      <Modal
        header={modalHeader}
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        footer={footer}
        primaryButton={primaryButtonProps}
        secondaryButton={secondaryButton}
        data-component="StatusModal"
        {...getTestId()}
        {...props}
        ref={ref}
      >
        {children}
      </Modal>
    );
  }
);

StatusModal.displayName = 'StatusModal';
