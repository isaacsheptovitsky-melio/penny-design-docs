import { Box, type BoxProps, ModalHeader } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';

import { BaseSheetHeader } from '@/components/containers/BaseSheet/components/BaseSheetHeader';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

type BaseModalHeaderProps = BoxProps & TestIdProp;

export const BaseModalHeader = ({
  children,
  'data-testid': dataTestId = 'base-modal-header',
  ...props
}: BaseModalHeaderProps) => {
  const { isExtraSmallScreen: isMobile } = useBreakpoint();
  const styles = useMultiStyleConfig('BaseModal', {});

  // TODO: remove - backward compatible reason
  // https://meliorisk.atlassian.net/browse/ME-57498
  if (!children) return null;

  if (isMobile) {
    return (
      <Box __css={styles['header']} data-component="BaseModalHeader" data-testid={dataTestId} {...props}>
        <BaseSheetHeader>{children}</BaseSheetHeader>
      </Box>
    );
  }

  return (
    <ModalHeader as="div" sx={styles['header']} data-component="BaseModalHeader" data-testid={dataTestId} {...props}>
      {children}
    </ModalHeader>
  );
};

BaseModalHeader.displayName = 'BaseModalHeader';
