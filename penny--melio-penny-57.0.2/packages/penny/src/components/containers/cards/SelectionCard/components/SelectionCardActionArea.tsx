import { Box } from '@chakra-ui/react';
import { type TestIdProp, uniqueId, useTestId } from '@melio/penny-utils';
import { type AriaAttributes, type PropsWithChildren, useMemo } from 'react';

import { ActionArea, useActionArea } from '@/components/accessibility/ActionArea';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { Group } from '../../../Group';
import { type SelectionCardProps } from '../SelectionCard.types';

type SelectionCardActionAreaProps = PropsWithChildren<
  Pick<SelectionCardProps, 'disabled' | 'readOnly' | 'selected' | 'onClick'> & TestIdProp
> &
  AriaAttributes;

export const SelectionCardActionArea = ({
  children,
  onClick,
  selected,
  disabled,
  readOnly,
  'data-testid': dataTestId = 'action-area',
  'aria-label': ariaLabel,
  ...otherProps
}: SelectionCardActionAreaProps) => {
  const styles = useMultiStyleConfig('SelectionCard', {});
  const getTestId = useTestId(dataTestId);
  const cardId = useMemo(() => uniqueId('selection-card-'), []);
  const { containerProps, actionAreaProps } = useActionArea({
    onClick,
    id: cardId,
    isDisabled: disabled || readOnly,
  });

  return (
    <Box __css={styles['actionArea']} as={Group} width="full" {...otherProps} {...getTestId()} {...containerProps}>
      <ActionArea
        {...actionAreaProps}
        {...getTestId('element')}
        {...(selected !== undefined && { 'aria-pressed': selected })}
        {...(ariaLabel && { 'aria-label': ariaLabel, 'aria-labelledby': undefined })}
      />
      {children}
    </Box>
  );
};
