/* eslint-disable @typescript-eslint/no-deprecated */
import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { IconButton } from '@/components/action/IconButton';
import { NakedButton } from '@/components/action/NakedButton';
import { Group, GroupItem } from '@/components/containers/Group';
import { Icon } from '@/components/foundations/Icon';
import { Link } from '@/components/navigation/Link';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { MelioWrapper } from '@/theme/MelioWrapper';
import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

import type { ToastProps, ToastType } from './Toast.types';

const getIconByType = (type: ToastType): JSX.Element | null => {
  const iconMap: Record<ToastType, JSX.Element | null> = {
    success: <Icon type="checked-circle" color="inverse" aria-hidden />,
    error: <Icon type="error" color="inverse" aria-hidden />,
    informative: null,
  };

  return iconMap[type];
};

/**
 * @deprecated
 */
export const CLOSE_BUTTON_ARIA_LABEL_PREFIX = 'Close toast';

/**
 * @deprecated This component isn't accessible. Please use `SectionBanner`.
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      id,
      onClose,
      type = 'informative',
      title,
      actionType = 'button',
      actionText,
      onAction,
      'data-testid': dataTestId = 'toast',
      closeButtonAriaLabel = typeof title === 'string' ? `${CLOSE_BUTTON_ARIA_LABEL_PREFIX} ${title}` : 'Close toast',
    },
    ref
  ) => {
    const { isExtraSmallScreen } = useBreakpoint();
    const styles = useMultiStyleConfig('Toast', { type, isMobile: isExtraSmallScreen });
    const getTestId = useTestId(dataTestId);

    return (
      <MelioWrapper background="transparent">
        <Box
          id={`toast-${id}`}
          __css={styles['toast']}
          data-component="Toast"
          {...getTestId(id)}
          role="alert"
          ref={ref}
        >
          <Group spacing="xs" alignItems="center" justifyContent="space-between" width="full">
            <Group spacing="s" alignItems="center" justifyContent="space-between" width="full">
              <Group spacing="xs" alignItems="center">
                {getIconByType(type)}
                {title && (
                  <Box __css={styles['content']} {...getTestId('title')}>
                    {title}
                  </Box>
                )}
              </Group>
              {actionType === 'button' && actionText && onAction && (
                <GroupItem shrink={0}>
                  <NakedButton
                    {...getTestId('action')}
                    variant="invert"
                    onClick={() => onAction?.(() => onClose?.())}
                    label={actionText}
                  />
                </GroupItem>
              )}
              {actionType === 'link' && actionText && onAction && (
                <GroupItem shrink={0}>
                  <Link
                    {...getTestId('action')}
                    href="#"
                    variant="standalone"
                    color="inherit"
                    label={actionText}
                    onClick={() => onAction?.(() => onClose?.())}
                    size="medium"
                  />
                </GroupItem>
              )}
            </Group>
            <IconButton
              size="extra-small"
              icon="close-mini"
              variant="naked-inverse"
              onClick={onClose}
              aria-label={closeButtonAriaLabel}
              {...getTestId('close-button')}
            />
          </Group>
        </Box>
      </MelioWrapper>
    );
  }
);
