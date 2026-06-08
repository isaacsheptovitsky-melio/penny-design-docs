import { Box } from '@chakra-ui/react';
import { useId } from '@floating-ui/react';
import { isMobileDevice } from '@melio/penny-utils';
import { forwardRef, type ReactNode, useLayoutEffect } from 'react';

import { VisuallyHidden } from '@/components/accessibility/VisuallyHidden';
import { Text } from '@/components/dataDisplay/Text';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { Container } from '../../Container';
import { useBaseSheetContext } from '../BaseSheetContext';

export const BaseSheetHeader = forwardRef<HTMLDivElement, { children?: ReactNode }>(({ children, ...props }, ref) => {
  const { paddingX, paddingY, setHeaderId } = useBaseSheetContext();
  const styles = useMultiStyleConfig('BaseSheet', { paddingX, paddingY, hasTitle: !!children });

  const id = useId();

  // Only sets `aria-labelledby` on the `BaseSheet` element, to associate the header with the dialog.
  // if this component is mounted inside it.
  useLayoutEffect(() => {
    setHeaderId(id);

    return () => setHeaderId(undefined);
  }, [id, setHeaderId]);

  return (
    <Box data-component="BaseSheetHeader" __css={styles['header']} {...props} id={id} ref={ref}>
      {children &&
        (typeof children === 'string' ? (
          <Container alignItems="center">
            <Text textStyle="body3">{children}</Text>
          </Container>
        ) : (
          children
        ))}

      {children && isMobileDevice() && id && <VisuallyHidden aria-live="assertive">{children}</VisuallyHidden>}
    </Box>
  );
});

BaseSheetHeader.displayName = 'BaseSheetHeader';
