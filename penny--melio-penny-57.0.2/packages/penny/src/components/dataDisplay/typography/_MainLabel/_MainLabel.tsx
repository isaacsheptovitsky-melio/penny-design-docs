import { Box } from '@chakra-ui/react';
import { forwardRef } from 'react';

import { Group } from '@/components/containers/Group';
import { Icon } from '@/components/foundations/Icon';
import { StatusIconSolid } from '@/components/foundations/StatusIconSolid';
import { _IconIndicator } from '@/components/internal/_IconIndicator';
import { ConditionalWrapper } from '@/components/internal/ConditionalWrapper';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { Pill } from '../../Pill';
import { Text } from '../../Text';
import type { _MainLabelProps } from './_MainLabel.types';

/**
 * @private
 */
export const _MainLabel = forwardRef<HTMLDivElement, _MainLabelProps>(
  (
    {
      label,
      placeholder,
      secondaryLabel,
      pillProps,
      tooltipProps,
      iconProps,
      isDisabled,
      variant = 'default',
      size = 'large',
      isReadOnly,
      id,
      shouldSupportEllipsis = true,
      ...props
    },
    ref
  ) => {
    const styles = useMultiStyleConfig('_MainLabel', { variant, size });

    const text = label ? (
      <Box __css={styles['label']} aria-disabled={isDisabled} data-readonly={isReadOnly || null} id={id}>
        <Text textStyle="inline" color="inherit" shouldSupportEllipsis={shouldSupportEllipsis}>
          {label}
        </Text>
      </Box>
    ) : (
      <Box __css={styles['placeholder']} id={id}>
        <Text color="inherit" textStyle="inline" shouldSupportEllipsis={shouldSupportEllipsis}>
          {placeholder}
        </Text>
      </Box>
    );

    const icon = getIcon({ isDisabled, isReadOnly, tooltipProps, iconProps });

    return (
      <Group ref={ref} data-component="_MainLabel" {...props} spacing="xxs" alignItems="center">
        {text}
        {secondaryLabel && (
          <Box __css={styles['secondaryLabel']} aria-disabled={isDisabled} data-readonly={isReadOnly || null}>
            {secondaryLabel}
          </Box>
        )}
        {(tooltipProps || iconProps) && (
          <Box __css={styles['iconIndicator']} aria-disabled={isDisabled} data-readonly={isReadOnly || null}>
            {icon}
          </Box>
        )}
        {pillProps && (
          <ConditionalWrapper
            condition={Array.isArray(pillProps) && pillProps.length > 1}
            wrapper={(children) => <Group spacing="xxs">{children}</Group>}
          >
            <>
              {(Array.isArray(pillProps) ? pillProps : [pillProps]).map((pillProps, i) => (
                <Pill key={i} isDisabled={isDisabled} isReadOnly={isReadOnly} {...pillProps} />
              ))}
            </>
          </ConditionalWrapper>
        )}
      </Group>
    );
  }
);

type GetIcon = {
  isDisabled: _MainLabelProps['isDisabled'];
  isReadOnly: _MainLabelProps['isReadOnly'];
  tooltipProps?: _MainLabelProps['tooltipProps'];
  iconProps?: _MainLabelProps['iconProps'];
};

const getIcon = ({ tooltipProps, iconProps, isDisabled, isReadOnly }: GetIcon) => {
  if (tooltipProps) {
    return (
      <_IconIndicator
        tooltip={tooltipProps}
        data-testid="line-item-tooltip-trigger"
        variant={tooltipProps.triggerStatus ?? 'informative'}
      />
    );
  }

  if (!iconProps) return null;

  return iconProps.type === 'warning' ? (
    <StatusIconSolid
      data-testid="line-item-icon"
      size="small"
      variant="warning"
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
    />
  ) : (
    <Icon
      data-testid="line-item-icon"
      size="small"
      type={iconProps.type}
      color={iconProps.color}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
    />
  );
};

_MainLabel.displayName = '_MainLabel';
