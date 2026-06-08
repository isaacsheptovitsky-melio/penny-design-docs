import { Box, type BoxProps } from '@chakra-ui/react';
import { uniqueId, useTestId } from '@melio/penny-utils';
import { forwardRef, useMemo } from 'react';

import { IconButton } from '@/components/action/IconButton';
import { Group, GroupItem, type GroupProps } from '@/components/containers/Group';
import { useStyleConfig } from '@/theme/hooks/use-style-config';

import { type TagProps } from './Tag.types';

export const tagContentSharedProps: Partial<GroupProps> = {
  alignItems: 'center',
  justifyContent: 'center',
  spacing: 'xs',
};

/**
 * The Tag component is a compact, styled element used for displaying labels, categories, or metadata.
 * The Tag is for static labels, while the Interactive Tag adds click and remove functionality.
 */
export const Tag = forwardRef<HTMLDivElement, TagProps>(
  ({ id, onClick, removeButtonProps, children, disabled, 'data-testid': dataTestId = 'tag', ...props }, ref) => {
    const styles = useStyleConfig('Tag');
    const getTestId = useTestId(dataTestId);

    const tagId = useMemo(() => id ?? uniqueId('tag-'), [id]);

    const clickableProps: Partial<BoxProps> = onClick
      ? {
          as: 'button',
          ...(!disabled && { onClick }),
          // ts-ignore is used due to type issues with `Box`.
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          disabled,
          'data-is-interactive': true,
        }
      : {};

    return (
      <Box
        data-component="Tag"
        ref={ref}
        data-disabled={disabled || null}
        {...getTestId()}
        {...clickableProps}
        {...props}
        __css={styles}
      >
        <Group id={tagId} alignItems="center" justifyContent="center" spacing="xs" {...getTestId('content')}>
          {children}
        </Group>
        {removeButtonProps && (
          <>
            <GroupItem shrink={0} display="inline-flex" alignSelf="center" position="relative">
              <IconButton
                size="extra-small"
                variant="naked"
                icon="close-mini"
                isDisabled={disabled}
                aria-label={typeof children === 'string' ? `Remove ${children} tag` : 'Remove tag'}
                {...getTestId('remove-button')}
                {...removeButtonProps}
              />
            </GroupItem>
          </>
        )}
      </Box>
    );
  }
);

Tag.displayName = 'Tag';
