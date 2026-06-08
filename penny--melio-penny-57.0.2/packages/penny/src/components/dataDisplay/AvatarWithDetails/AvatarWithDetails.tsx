import { Box } from '@chakra-ui/react';
import { useBoolean, useTestId } from '@melio/penny-utils';
import { forwardRef, useCallback } from 'react';

import { Group } from '@/components/containers/Group';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { Checkbox } from '../../selectionAndInputs/Checkbox';
import { Avatar } from '../Avatar';
import { Typography } from '../typography';
import type { AvatarWithDetailsProps } from './AvatarWithDetails.types';
import { DEFAULT_DATA_TEST_ID } from './AvatarWithDetails.utils';

/**
 * `AvatarWithDetails` component combines an `Avatar` with text content and optional interactive elements.
 */
export const AvatarWithDetails = forwardRef<HTMLDivElement, AvatarWithDetailsProps>(
  (
    {
      mainLabelProps,
      descriptionProps,
      avatarProps,
      isDisabled,
      selectionProps,
      'data-testid': dataTestId = DEFAULT_DATA_TEST_ID,
      ...rest
    },
    ref
  ) => {
    const [isAvatarHover, setIsAvatarHover] = useBoolean(false);
    const styles = useMultiStyleConfig('AvatarWithDetails', { isAvatarHover, isSelected: selectionProps?.isSelected });
    const getTestId = useTestId(dataTestId);

    const handleAvatarHover = useCallback((isHover?: boolean) => {
      if (!selectionProps) return;

      if (isHover) {
        setIsAvatarHover.on();
      } else {
        setIsAvatarHover.off();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const mainLabelTestId = mainLabelProps?.['data-testid'] || getTestId('label')['data-testid'];

    return (
      <Box {...getTestId()} {...rest} __css={styles['container']} data-component="AvatarWithDetails" ref={ref}>
        <Box
          aria-disabled={isDisabled}
          onMouseOver={() => handleAvatarHover(true)}
          onMouseOut={() => handleAvatarHover()}
          __css={styles['avatarContainer']}
          {...getTestId('avatar-container')}
        >
          <Box __css={styles['avatar']}>
            <Avatar {...avatarProps} isDisabled={isDisabled} {...getTestId('avatar')} />
          </Box>
          {selectionProps && (
            <Box __css={styles['checkbox']}>
              <Checkbox
                onChange={() => selectionProps.onSelect(selectionProps.isSelected)}
                isChecked={selectionProps.isSelected}
                isDisabled={isDisabled}
                {...getTestId('checkbox')}
              />
            </Box>
          )}
        </Box>
        <Group variant="vertical" spacing="xxxs">
          <Typography.MainLabel
            {...mainLabelProps}
            data-testid={mainLabelTestId}
            variant="bold"
            isDisabled={isDisabled}
          />
          {descriptionProps?.label && (
            <Typography.Description
              {...descriptionProps}
              isDisabled={isDisabled}
              link={undefined}
              {...getTestId('description')}
            />
          )}
        </Group>
      </Box>
    );
  }
);

AvatarWithDetails.displayName = 'AvatarWithDetails';
