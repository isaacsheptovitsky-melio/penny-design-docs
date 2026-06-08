import { Box } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import type { _ParagraphProps } from './_Paragraph.types';

/**
 * @private
 */
export const _Paragraph = forwardRef<HTMLDivElement, _ParagraphProps>(
  ({ title, size = 'small', content, ...props }, ref) => {
    const styles = useMultiStyleConfig('_Paragraph', { size });

    return (
      <Box ref={ref} data-component="_Paragraph" __css={styles['container']} {...props}>
        {title != null && (
          <Box as="h2" __css={styles['title']}>
            {title}
          </Box>
        )}
        {content != null && (
          <Box as="p" __css={styles['content']}>
            {content}
          </Box>
        )}
      </Box>
    );
  }
);

_Paragraph.displayName = '_Paragraph';
