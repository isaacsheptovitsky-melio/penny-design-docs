import { Box, type BoxProps } from '@chakra-ui/react';
import { useHasOverflow } from '@melio/penny-utils';
import { forwardRef, useRef } from 'react';

import { Group } from '@/components/containers/Group';
import { _IconIndicator, type _IconIndicatorProps } from '@/components/internal/_IconIndicator';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { Tooltip } from '../../Tooltip';

/**
 * @private
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type _LabelProps = {
  label: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isViewMode?: boolean;
  tooltipProps?: _IconIndicatorProps['tooltip'];
  description?: string;
  htmlFor?: string;
  id?: string;
  labelShouldSupportEllipsis?: boolean;
  descriptionShouldSupportEllipsis?: boolean;
} & Pick<BoxProps, 'as' | 'onClick'>;

/**
 * @private
 */
export const _Label = forwardRef<HTMLDivElement, _LabelProps>(
  (
    {
      label,
      isInvalid,
      tooltipProps,
      description,
      isDisabled,
      isReadOnly,
      isViewMode,
      htmlFor,
      id,
      as,
      labelShouldSupportEllipsis,
      descriptionShouldSupportEllipsis,
      onClick,
      ...props
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('_Label', { labelShouldSupportEllipsis, descriptionShouldSupportEllipsis });
    const labelRef = useRef(null);
    const descriptionRef = useRef(null);

    const sharedAttributes = {
      'data-view-mode': isViewMode || null,
      ...(!isViewMode && {
        'data-disabled': isDisabled || null,
        'data-invalid': isInvalid || null,
        'data-readonly': isReadOnly || null,
      }),
    };

    const { hasOverflowX: labelHasOverflow } = useHasOverflow(labelRef);

    const { hasOverflowX: descriptionHasOverflow } = useHasOverflow(descriptionRef);

    const showLabelTooltip = labelShouldSupportEllipsis && labelHasOverflow;
    const showDescriptionTooltip = descriptionShouldSupportEllipsis && descriptionHasOverflow;

    return (
      <Group
        ref={ref}
        data-component="_Label"
        {...sharedAttributes}
        aria-disabled={isDisabled}
        alignItems="center"
        {...props}
        spacing="xxs"
      >
        <Box
          as={as}
          // ts-ignore is used due to `type` issues with `<Box/>`.
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          htmlFor={htmlFor}
          id={id}
          __css={styles['container']}
          onClick={isViewMode ? undefined : onClick}
          {...sharedAttributes}
        >
          <Tooltip content={label} isEnabled={Boolean(showLabelTooltip)}>
            <Box __css={styles['label']} {...sharedAttributes} ref={labelRef}>
              {label}
            </Box>
          </Tooltip>
          {description && (
            <Tooltip content={description} isEnabled={Boolean(showDescriptionTooltip)}>
              <Box __css={styles['description']} as="span" {...sharedAttributes} ref={descriptionRef}>
                {description}
              </Box>
            </Tooltip>
          )}
        </Box>
        {tooltipProps && (
          <Box __css={styles['iconIndicator']} {...sharedAttributes}>
            <_IconIndicator tooltip={tooltipProps} data-testid="label-tooltip-trigger" />
          </Box>
        )}
      </Group>
    );
  }
);

_Label.displayName = '_Label';
