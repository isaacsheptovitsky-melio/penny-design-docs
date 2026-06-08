import { Box } from '@chakra-ui/react';
import { useFloatingParentNodeId } from '@floating-ui/react';
import { isMobileDevice } from '@melio/penny-utils';
import { type AriaRole, forwardRef, type HTMLProps, useCallback, useRef } from 'react';

import { Fade } from '@/components/foundations/transitions/Fade';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { mergeRefs } from '@/utils/merge-refs';

import { ConditionalWrapper } from '../../../internal/ConditionalWrapper';
import { Portal } from '../../../internal/Portal';
import { fadeStyle } from '../Tooltip.theme';
import { useTooltipContext } from '../tooltip.utils';

export const TooltipContent = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>((props, contentRef) => {
  const { refs, getFloatingProps, x, y, strategy, isOpen, isMounted } = useTooltipContext();

  const styles = useMultiStyleConfig('Tooltip', { position: strategy, top: y, left: x });
  const tooltipRoleManipulationTimeOutRef = useRef<number>();
  const { role, ...floatingProps } = getFloatingProps(props);

  const tooltipContentRef = useCallback(
    (node: HTMLDivElement | null) => {
      mergeRefs([refs.setFloating, contentRef])(node);

      if (tooltipRoleManipulationTimeOutRef.current) {
        clearTimeout(tooltipRoleManipulationTimeOutRef.current);
        tooltipRoleManipulationTimeOutRef.current = undefined;
      }

      if (!node) {
        return;
      }

      const setRole = (role: AriaRole) => {
        node?.setAttribute('role', role);
      };

      if (isMobileDevice() && isOpen) {
        setRole('alert');

        tooltipRoleManipulationTimeOutRef.current = window.setTimeout(() => {
          setRole((role ?? 'tooltip') as AriaRole);
        }, 1000);
      } else {
        setRole((role ?? 'tooltip') as AriaRole);
      }
    },
    [isOpen, role, contentRef, refs.setFloating]
  );

  // returns the id of nested floating elements, if available. For top-level floating elements, returns null.
  const parentId = useFloatingParentNodeId();

  return (
    <ConditionalWrapper
      condition={!isMobileDevice()}
      wrapper={(children) => <>{isMounted && <Portal id={parentId || undefined}>{children}</Portal>}</>}
    >
      <Fade in={isOpen} unmountOnExit style={fadeStyle}>
        <Box
          __css={styles['content']}
          data-component="TooltipContent"
          // TODO: Refactor to merge role-handling logic directly into merged refs and remove separate callback
          ref={tooltipContentRef}
          {...floatingProps}
        />
      </Fade>
    </ConditionalWrapper>
  );
});

TooltipContent.displayName = 'TooltipContent';
