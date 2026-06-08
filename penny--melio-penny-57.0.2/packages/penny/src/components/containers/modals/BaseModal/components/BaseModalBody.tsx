import { Box, ModalBody } from '@chakra-ui/react';
import { type TestIdProp } from '@melio/penny-utils';
import { type HTMLAttributes, type ReactNode, useEffect, useRef } from 'react';

import { useScrollBorders } from '@/theme/hooks';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { useBreakpoint } from '@/theme/providers/BreakpointProvider';

import { BaseSheetBody } from '../../../BaseSheet';
import { useDesktopModalContext } from '../DesktopModalContext';

type BaseModalBodyProps = {
  children?: ReactNode;
  tabIndex?: HTMLAttributes<HTMLDivElement>['tabIndex'];
} & TestIdProp;

export const BaseModalBody = ({
  tabIndex,
  'data-testid': dataTestId = 'base-modal-body',
  ...props
}: BaseModalBodyProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    scrollAtBottom,
    scrollAtTop,
    isOverflowY: isBodyOverflowing,
    isMounted: isModalBodyMounted,
  } = useScrollBorders({ ref });
  const showBorderBottom = isBodyOverflowing && !scrollAtBottom;
  const showBorderTop = isBodyOverflowing && !scrollAtTop;
  const styles = useMultiStyleConfig('BaseModal', {
    showBorderBottom,
    showBorderTop,
  });

  const { isExtraSmallScreen: isMobile } = useBreakpoint();
  const desktopModalContext = useDesktopModalContext();

  useEffect(() => {
    if (isModalBodyMounted) {
      // Notify BaseModal (when desktop) its content was rendered
      desktopModalContext?.setIsBodyMounted?.(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalBodyMounted, desktopModalContext?.setIsBodyMounted]);

  return isMobile ? (
    <BaseSheetBody>
      <Box
        as="section"
        __css={styles['body']}
        data-component="BaseModalBody"
        data-testid={dataTestId}
        {...props}
        tabIndex={tabIndex}
      />
    </BaseSheetBody>
  ) : (
    <ModalBody
      sx={styles['body']}
      data-component="BaseModalBody"
      data-testid={dataTestId}
      tabIndex={tabIndex}
      {...props}
      ref={ref}
      id={undefined} // Remove the id to disable SR announcement of the modal body
    />
  );
};

BaseModalBody.displayName = 'BaseModalBody';
