import { Box } from '@chakra-ui/react';
import { isMobileDevice } from '@melio/penny-utils';

import { Text } from '@/components/dataDisplay/Text';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type MultiSelectOption, type MultiSelectProps } from '../../../MultiSelect.types';

type TriggerValueProps<V, O extends MultiSelectOption<V>> = {
  selectedOptions: O[];
} & Pick<MultiSelectProps<V, O>, 'isDisabled' | 'placeholder' | 'valueRenderer' | 'id'>;

export const TriggerValue = <V, O extends MultiSelectOption<V>>({
  selectedOptions,
  valueRenderer,
  isDisabled,
  placeholder,
  ...otherProps
}: TriggerValueProps<V, O>) => {
  const styles = useMultiStyleConfig('MultiSelect', {});

  return (
    <Box
      data-component="MultiSelect.TriggerValue"
      __css={styles['triggerValue']}
      data-value={(selectedOptions.length && selectedOptions.map(({ value }) => value).join(', ')) || undefined}
      data-placeholder={placeholder || undefined}
      aria-hidden={isMobileDevice()}
      {...otherProps}
    >
      {selectedOptions.length ? (
        (valueRenderer?.(selectedOptions) ?? (
          <Text textStyle="inline" color="inherit" shouldSupportEllipsis>
            {selectedOptions.map((option) => option.label).join(', ')}
          </Text>
        ))
      ) : (
        <Text
          textStyle="inline"
          color={isDisabled ? 'semantic.text.disabled' : 'semantic.text.secondary'}
          shouldSupportEllipsis
        >
          {placeholder}
        </Text>
      )}
    </Box>
  );
};

TriggerValue.displayName = 'MultiSelect.TriggerValue';
