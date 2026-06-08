import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { COMPONENTS_DEFAULT_TEST_IDS } from '@/test-utils/constants';
import { useStyleConfig } from '@/theme/hooks/use-style-config';
import { useIllustrations } from '@/theme/hooks/useIllustrations';
import { useConfig } from '@/theme/providers/ConfigProvider';

import type { IllustrationProps } from './Illustration.types';

export const Illustration = forwardRef<HTMLDivElement, IllustrationProps>(
  ({ size = 'medium', type, 'data-testid': dataTestId = COMPONENTS_DEFAULT_TEST_IDS.ILLUSTRATION, ...props }, ref) => {
    const illustrations = useIllustrations();
    const styles = useStyleConfig('Illustration', { size });
    const { InlineSVGComponent } = useConfig();

    const getTestId = useTestId(dataTestId);

    return (
      <Box as="span" data-component="Illustration" ref={ref} {...props} {...getTestId()} __css={styles}>
        {typeof illustrations[type] === 'string' ? (
          // Inject the svg element instead of being an "img" in the DOM tree.
          // This allows styles to be applied
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <InlineSVGComponent src={illustrations[type]} />
        ) : (
          <Box as={illustrations[type]} />
        )}
      </Box>
    );
  }
);

Illustration.displayName = 'Illustration';
