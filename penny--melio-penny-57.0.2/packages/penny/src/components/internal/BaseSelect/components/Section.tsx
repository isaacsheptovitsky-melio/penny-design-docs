import { Box } from '@chakra-ui/react';
import { uniqueId } from '@melio/penny-utils';
import { forwardRef } from 'react';

import { Typography, type TypographySectionLabelProps } from '@/components/dataDisplay/typography';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

type SectionProps = Pick<TypographySectionLabelProps, 'isVerified' | 'label' | 'children'>;

export const Section = forwardRef<HTMLDivElement, SectionProps>(({ label, isVerified, children }, ref) => {
  const styles = useMultiStyleConfig('BaseSelect', {});
  const sectionId = uniqueId('base-select-section-');

  return (
    <Box role="group" aria-labelledby={sectionId} data-component="BaseSelect.Section" ref={ref}>
      <Box as="h3" __css={styles['sectionLabel']} id={sectionId}>
        <Typography.SectionLabel label={label} isVerified={isVerified} tooltipProps={undefined} />
      </Box>
      <Box as="ul">{children}</Box>
    </Box>
  );
});

Section.displayName = 'BaseSelect.Section';
