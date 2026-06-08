import { Box } from '@chakra-ui/react';
import type { TestIdProp } from '@melio/penny-utils';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { NakedButton } from '@/components/action/NakedButton';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

type EmptyStateProps = {
  emptyState: { label: string; onClick?: VoidFunction };
  closeMenu?: VoidFunction;
} & TestIdProp;

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ emptyState, closeMenu, 'data-testid': dataTestId = 'base-select' }, ref) => {
    const isClickable = Boolean(emptyState.onClick);
    const styles = useMultiStyleConfig('BaseSelect', {
      clickableEmptyState: isClickable,
    });

    const handleClick = () => {
      emptyState.onClick?.();
      closeMenu?.();
    };

    const sharedProps = {
      'data-component': 'BaseSelect.EmptyState',
      __css: styles['emptyState'],
      ref,
    };

    const getTestId = useTestId(dataTestId);

    return isClickable ? (
      <Box {...sharedProps} onClick={handleClick} {...getTestId('clickable-empty-state')}>
        <NakedButton variant="secondary" label={emptyState.label} />
      </Box>
    ) : (
      <Box {...sharedProps} data-disabled {...getTestId('empty-state')}>
        {emptyState.label}
      </Box>
    );
  }
);

EmptyState.displayName = 'BaseSelect.EmptyState';
