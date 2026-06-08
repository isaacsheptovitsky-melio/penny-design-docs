import { Box } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { Icon } from '@/components/foundations/Icon';
import { type CheckboxInputProps } from '@/components/selectionAndInputs/Checkbox/Checkbox.types';
import { useMultiStyleConfig } from '@/theme/hooks';

export const PresentationCheckbox = forwardRef<HTMLDivElement, Pick<CheckboxInputProps, 'isChecked' | 'isDisabled'>>(
  ({ isChecked, isDisabled }, ref) => {
    const styles = useMultiStyleConfig('Checkbox', { size: 'large' });

    return (
      <Box __css={styles['checkboxContainer']} ref={ref} data-component="PresentationCheckbox" data-with-label={false}>
        <Box
          aria-hidden="true"
          __css={styles['checkbox']}
          data-checked={isChecked || undefined}
          data-disabled={isDisabled || undefined}
        />
        {isChecked && (
          <Box __css={styles['innerIcon']}>
            <Icon type="checked" size="small" color="inherit" />
          </Box>
        )}
      </Box>
    );
  }
);

PresentationCheckbox.displayName = 'PresentationCheckbox';
