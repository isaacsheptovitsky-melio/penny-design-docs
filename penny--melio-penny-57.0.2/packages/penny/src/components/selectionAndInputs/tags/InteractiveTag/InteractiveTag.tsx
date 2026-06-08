import { Box } from '@chakra-ui/react';
import { uniqueId, useBoolean, useTestId } from '@melio/penny-utils';
import { forwardRef, type KeyboardEvent, type MouseEvent, useCallback, useMemo, useRef } from 'react';

import { ActionArea, useActionArea } from '@/components/accessibility/ActionArea';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { Tag } from '../Tag';
import { type InteractiveTagProps } from './InteractiveTag.types';

export const InteractiveTag = forwardRef<HTMLDivElement, InteractiveTagProps>(
  (
    { id, onClick, removeButtonProps, children, disabled, 'data-testid': dataTestId = 'interactive-tag', ...props },
    ref
  ) => {
    const styles = useMultiStyleConfig('InteractiveTag', {});
    const getTestId = useTestId(dataTestId);
    const interactiveTagId = useMemo(() => id ?? uniqueId('interactive-tag-'), [id]);

    const removeButtonRef = useRef<HTMLButtonElement | null>(null);
    const [isPressed, setIsPressed] = useBoolean(false);
    const isInteractive = Boolean(onClick);

    const handleMouseDown = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        if (!isInteractive || disabled) return;

        if (e.target !== removeButtonRef.current && !removeButtonRef.current?.contains(e.target as Node)) {
          setIsPressed.on();
        }
      },
      [disabled, isInteractive, setIsPressed]
    );

    const handleMouseUp = useCallback(() => {
      if (!isInteractive || disabled) return;
      setIsPressed.off();
    }, [disabled, isInteractive, setIsPressed]);

    const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
      if (!isInteractive || disabled) return;

      if (e.code === 'Space' || e.code === 'Enter') {
        handleMouseDown(e as unknown as MouseEvent<HTMLDivElement>);
      }
    };

    const onKeyUp = (e: KeyboardEvent<HTMLElement>) => {
      if (!isInteractive || disabled) return;

      if (e.code === 'Space' || e.code === 'Enter') {
        handleMouseUp();
      }
    };

    const shouldRenderActionArea = Boolean(removeButtonProps && onClick);
    const clickableProps = !removeButtonProps && onClick ? { onClick, onKeyDown, onKeyUp } : {};

    const {
      containerProps: { 'data-hover': isHover, ...contentProps },
      actionAreaProps,
    } = useActionArea({
      isDisabled: disabled,
      onClick,
      id: interactiveTagId,
      onKeyDown,
    });

    return (
      <Box
        as={Tag}
        {...getTestId()}
        data-component="InteractiveTag"
        data-pressed={isPressed || null}
        data-is-interactive={isInteractive}
        ref={ref}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...clickableProps}
        data-hover={isHover}
        {...props}
        __css={styles['container']}
        disabled={disabled}
        {...(removeButtonProps && {
          removeButtonProps: {
            ref: removeButtonRef,
            'aria-label': typeof children === 'string' ? `Remove ${children} tag` : 'Remove tag',
            ...removeButtonProps,
          },
        })}
      >
        <Box __css={styles['innerContent']} {...getTestId('inner-content')} {...contentProps}>
          {shouldRenderActionArea && (
            <ActionArea {...getTestId('action-area')} {...actionAreaProps} onKeyUp={onKeyUp} />
          )}
          {children}
        </Box>
      </Box>
    );
  }
);

InteractiveTag.displayName = 'InteractiveTag';
