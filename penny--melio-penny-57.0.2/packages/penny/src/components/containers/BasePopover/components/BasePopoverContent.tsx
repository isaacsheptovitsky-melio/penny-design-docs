import type { CSSProperties, HTMLProps } from 'react';
import { forwardRef } from 'react';

import { Fade } from '@/components/foundations/transitions/Fade';
import { Floater } from '@/components/internal/Floater';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { getAriaProps, mergeRefs } from '@/utils';

import { fadeStyle } from '../BasePopover.theme';
import { useBasePopoverContext } from '../BasePopoverContext';
import { BasePopoverContainer } from './BasePopoverContainer';

type BasePopoverContentProps = HTMLProps<HTMLDivElement> & {
  'data-component': string;
  shouldTrapFocus?: boolean;
};

export const BasePopoverContent = forwardRef<HTMLDivElement, BasePopoverContentProps>(
  ({ shouldTrapFocus, ...props }, propRef) => {
    const { refs, getFloatingProps, x, y, strategy, isOpen, isMounted, context, titleId, descriptionId } =
      useBasePopoverContext();

    const styles = useMultiStyleConfig('BasePopover', { position: strategy, top: y, left: x });

    const ref = mergeRefs([refs.setFloating, propRef]);

    const ariaLabelledby = getAriaProps('aria-labelledby', [titleId ?? undefined]);
    const ariaDescribedby = getAriaProps('aria-describedby', [descriptionId ?? undefined]);

    return (
      <Floater
        as={BasePopoverContainer}
        isOpen={isMounted}
        overlay={<Fade in={isOpen} unmountOnExit style={fadeStyle} />}
        focusManagerProps={{ context, modal: shouldTrapFocus }}
        styles={styles['content'] as CSSProperties}
        data-component={props['data-component']}
        ref={ref}
        {...ariaLabelledby}
        {...ariaDescribedby}
        {...getFloatingProps(props)}
        onClick={(event) => event.stopPropagation()}
      />
    );
  }
);

BasePopoverContent.displayName = 'BasePopoverContent';
