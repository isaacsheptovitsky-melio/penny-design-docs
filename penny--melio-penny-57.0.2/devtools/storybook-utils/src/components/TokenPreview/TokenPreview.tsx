import { Box, BoxProps } from '@chakra-ui/react';
import { useCallback } from 'react';

import { Tooltip } from '../Tooltip';

type TokenPreviewProps = { copyText?: string } & BoxProps;

const styles = {
  border: '1px solid',
  borderColor: 'global.neutral.400',
  borderRadius: 'global.200',
  backgroundColor: 'global.brand.200',
  width: '60px',
  height: '60px',
};

export const TokenPreview = ({ copyText, ...props }: TokenPreviewProps) => {
  const handleCopy = useCallback(() => {
    if (!copyText) return;
    void navigator.clipboard.writeText(copyText);
  }, [copyText]);

  return (
    <Tooltip label={`Click to copy - ${copyText}`}>
      <Box
        onClick={handleCopy}
        role="button"
        onKeyDown={(e) => e.key === 'Enter' && handleCopy()}
        aria-label={`Copy ${copyText} to clipboard`}
        {...styles}
        {...props}
      />
    </Tooltip>
  );
};

TokenPreview.displayName = 'Storybook.TokenPreview';
