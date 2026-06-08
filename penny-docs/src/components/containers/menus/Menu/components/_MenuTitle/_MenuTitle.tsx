import { Box } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { Typography } from '@/components/dataDisplay/typography';
import { useStyleConfig } from '@/theme/hooks/use-style-config';

import { type _MenuTitleProps } from './_MenuTitle.types';

/**
 * @private For internal use only.
 */
export const _MenuTitle = forwardRef<HTMLDivElement, _MenuTitleProps>(({ label, ...rest }, ref) => {
  const styles = useStyleConfig('_MenuTitle');

  return (
    <Box ref={ref} data-component="Menu.Title" __css={styles} role="presentation" aria-label={label} {...rest}>
      <Typography.SectionLabel label={label} />
    </Box>
  );
});

_MenuTitle.displayName = 'Menu.Title';
