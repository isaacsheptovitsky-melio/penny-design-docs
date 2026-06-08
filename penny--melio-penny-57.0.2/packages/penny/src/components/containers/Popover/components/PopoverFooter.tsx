import { Box } from '@chakra-ui/react';
import { type TestIdProp, useTestId } from '@melio/penny-utils';
import { forwardRef, type ReactNode } from 'react';

import { BasePopoverFooter, useBasePopoverContext } from '@/components/containers/BasePopover';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { Group } from '../../Group';

export type ActionRendererProps = { onClose: VoidFunction } & TestIdProp;

export type PopoverFooterProps = TestIdProp & {
  actionRenderer: (props: ActionRendererProps) => ReactNode;
  backButtonRenderer?: (props: TestIdProp) => ReactNode;
  footerText?: string;
};

export const PopoverFooter = forwardRef<HTMLDivElement, PopoverFooterProps>(
  ({ footerText, backButtonRenderer, actionRenderer, 'data-testid': dataTestId = 'popover-footer', ...props }, ref) => {
    const styles = useMultiStyleConfig('Popover', {});
    const getTestId = useTestId(dataTestId);
    const { onOpenChange } = useBasePopoverContext();

    return (
      <BasePopoverFooter data-component="PopoverFooter" {...getTestId()} {...props} ref={ref}>
        <Group alignItems="center" justifyContent={footerText ? 'space-between' : 'flex-end'} width="full">
          {footerText && <Box __css={styles['footerText']}>{footerText}</Box>}
          <Group spacing="xs-s">
            {backButtonRenderer?.({ ...getTestId('button-back') })}
            {actionRenderer({
              onClose: () => onOpenChange(false, 'cta'),
              ...getTestId('button-action'),
            })}
          </Group>
        </Group>
      </BasePopoverFooter>
    );
  }
);

PopoverFooter.displayName = 'PopoverFooter';
