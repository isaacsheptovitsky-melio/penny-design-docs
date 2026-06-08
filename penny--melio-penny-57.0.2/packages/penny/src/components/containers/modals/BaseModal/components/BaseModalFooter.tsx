import { Box, type BoxProps, ModalFooter } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

import { useBaseSheetContext } from '../../../BaseSheet/BaseSheetContext';

type BaseModalFooterProps = BoxProps & TestIdProp;

export const BaseModalFooter = ({
  children,
  'data-testid': dataTestId = 'base-modal-footer',
  ...props
}: BaseModalFooterProps) => {
  const baseSheetContext = useBaseSheetContext();
  const { isExtraSmallScreen: isMobile } = useBreakpoint();

  let baseSheetProps = undefined;

  if (isMobile) {
    const { isOverflow, showFooterBorder, paddingY, paddingX } = baseSheetContext;
    baseSheetProps = { isOverflow, showFooterBorder, paddingY, paddingX };
  }
  const styles = useMultiStyleConfig('BaseModal', { baseSheetProps });

  // TODO: remove - backward compatible reason
  // https://meliorisk.atlassian.net/browse/ME-57498
  if (!children) return null;

  return isMobile ? (
    <Box __css={styles['footer']} data-testid={dataTestId} data-component="BaseModalFooter" {...props}>
      {children}
    </Box>
  ) : (
    <ModalFooter as="div" sx={styles['footer']} data-testid={dataTestId} data-component="BaseModalFooter" {...props}>
      {children}
    </ModalFooter>
  );
};

BaseModalFooter.displayName = 'BaseModalFooter';
