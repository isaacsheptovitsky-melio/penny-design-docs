import { Box } from '@chakra-ui/react';
import { isMobileAndroid, useAutoFocus } from '@melio/penny-utils';
import { forwardRef, type KeyboardEvent, type MouseEvent, useCallback, useMemo, useRef } from 'react';

import { Tooltip } from '@/components/dataDisplay/Tooltip';
import { Icon } from '@/components/foundations/Icon';
import { ConditionalWrapper } from '@/components/internal/ConditionalWrapper';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';
import { getAriaProps, getInteractiveElementProps, mergeRefs } from '@/utils';

import { type CheckboxInputProps } from './Checkbox.types';

export const CheckboxInput = forwardRef<HTMLDivElement, CheckboxInputProps>(
  (
    {
      hasLabel = false,
      size = 'large',
      isDisabled,
      onChange,
      isChecked,
      value: checked,
      isIndeterminate,
      isReadOnly,
      isInvalid,
      tooltipProps,
      autoFocus,
      'aria-label': ariaLabel,
      'aria-required': ariaRequired,
      'aria-describedby': ariaDescribedby,
      'aria-labelledby': ariaLabelledby,
      'aria-controls': ariaControls,
      'data-testid': dataTestId,
      id,
      onClick,
      onKeyDown,
      onKeyUp,
      ...rest
    },
    propRef
  ) => {
    const styles = useMultiStyleConfig('Checkbox', { size });
    const checkboxRef = useRef<HTMLDivElement>(null);
    useAutoFocus(checkboxRef, autoFocus);

    const ref = mergeRefs([propRef, checkboxRef]);

    const isCheckedValue = isChecked ?? checked;

    const isTooltipEnabled = Boolean(tooltipProps);

    const isAndroidDevice = isMobileAndroid();

    const ariaDescribedbyLabels = useMemo(
      () =>
        getAriaProps('aria-describedby', [
          ariaRequired && isAndroidDevice ? 'required-hidden' : undefined,
          ariaDescribedby,
        ]),
      [ariaRequired, ariaDescribedby, isAndroidDevice]
    );

    const innerIcon =
      isCheckedValue || isIndeterminate ? (
        <Box __css={styles['innerIcon']} aria-hidden data-readonly={isReadOnly || undefined} aria-disabled={isDisabled}>
          <Icon
            type={isIndeterminate ? 'remove' : size === 'small' ? 'checked-mini' : 'checked'}
            size="small"
            color="inherit"
          />
        </Box>
      ) : null;

    const toggleCheckbox = useCallback(() => {
      onChange?.(!checked);
    }, [checked, onChange]);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.code === 'Space') {
          event.preventDefault();
        }

        onKeyDown?.(event);
      },
      [onKeyDown]
    );

    const handleKeyUp = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.code === 'Space') {
          event.stopPropagation();
          toggleCheckbox();
        }

        onKeyDown?.(event);
      },
      [toggleCheckbox, onKeyDown]
    );

    const handleClick = useCallback(
      (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        toggleCheckbox();

        onClick?.(event);
      },
      [toggleCheckbox, onClick]
    );

    const interactiveCheckboxProps = getInteractiveElementProps({
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      isDisabled,
      isReadOnly,
      tabIndex: 0,
    });

    // If ariaLabel is undefined and ariaLabelledby exists, omit aria-label (handled via aria-labelledby).
    // If ariaLabel is provided and not an empty string, use it.
    // If ariaLabel is an empty string, treat it as undefined (don't render it).
    // Otherwise, fallback to the default label "checkbox".
    const ariaLabelAttr = useMemo(() => {
      // TODO:https://meliorisk.atlassian.net/browse/ME-110373
      // eslint-disable-next-line react-hooks/refs
      if (ariaLabelledby || checkboxRef.current?.hasAttribute('aria-labelledby')) {
        return {};
      } else if (ariaLabel !== undefined) {
        return ariaLabel.trim() !== '' ? { 'aria-label': ariaLabel } : {};
      } else {
        return { 'aria-label': 'checkbox' };
      }
    }, [ariaLabel, ariaLabelledby]);

    const checkboxElement = (
      <ConditionalWrapper
        condition={isTooltipEnabled}
        wrapper={(children) => tooltipProps && <Tooltip {...tooltipProps}>{children}</Tooltip>}
      >
        <Box
          __css={styles['checkbox']}
          role="checkbox"
          id={id}
          aria-disabled={isDisabled}
          aria-controls={ariaControls}
          aria-invalid={isInvalid}
          {...ariaLabelAttr}
          aria-checked={isIndeterminate ? 'mixed' : isCheckedValue || false}
          data-testid={dataTestId}
          aria-readonly={isReadOnly || undefined}
          ref={ref}
          {...interactiveCheckboxProps}
          {...ariaDescribedbyLabels}
          {...getAriaProps('aria-labelledby', [ariaLabelledby])}
          {...(!isAndroidDevice ? { 'aria-required': ariaRequired } : null)}
          {...rest}
        />
      </ConditionalWrapper>
    );

    return (
      <Box __css={styles['checkboxContainer']} data-with-label={hasLabel} data-component="CheckboxInput">
        {checkboxElement}
        {innerIcon}
      </Box>
    );
  }
);
CheckboxInput.displayName = 'CheckboxInput';
