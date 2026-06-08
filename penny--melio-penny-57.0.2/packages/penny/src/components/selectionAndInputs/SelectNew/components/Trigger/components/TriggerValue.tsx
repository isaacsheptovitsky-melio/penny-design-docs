import { Box } from '@chakra-ui/react';
import { isMobileDevice } from '@melio/penny-utils';

import { Text } from '@/components/dataDisplay/Text';
import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type SelectedOption, type SelectNewOption, type SelectNewProps } from '../../../SelectNew.types';

type TriggerValueProps<V, O extends SelectNewOption<V>> = {
  selectedOption: SelectedOption<V, O>;
} & Pick<SelectNewProps<V, O>, 'isDisabled' | 'placeholder' | 'valueRenderer' | 'id'>;

export const TriggerValue = <V, O extends SelectNewOption<V>>({
  selectedOption,
  valueRenderer,
  isDisabled,
  placeholder,
  ...otherProps
}: TriggerValueProps<V, O>) => {
  const styles = useMultiStyleConfig('SelectNew', {});

  return (
    <Box
      data-component="SelectNew.TriggerValue"
      __css={styles['triggerValue']}
      data-value={selectedOption?.value || undefined}
      aria-hidden={isMobileDevice()}
      {...otherProps}
    >
      {selectedOption ? (
        (valueRenderer?.(selectedOption) ?? (
          <Text textStyle="inline" color="inherit" shouldSupportEllipsis>
            {selectedOption.label}
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

TriggerValue.displayName = 'SelectNew.TriggerValue';
