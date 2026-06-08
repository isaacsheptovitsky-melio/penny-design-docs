import { Box } from '@chakra-ui/react';
import { useBoolean } from '@melio/penny-utils';
import { forwardRef, type MouseEventHandler, type ReactNode } from 'react';

import { useMultiStyleConfig } from '../../../../theme/hooks/use-style-config';

type OptionProps = {
  isHighlighted: boolean;
  isFocused: boolean;
  isSelected?: boolean;
  onClick?: MouseEventHandler<Element>;
  children?: ReactNode;
};

export const Option = forwardRef<HTMLDivElement, OptionProps>(
  ({ isHighlighted, isFocused, isSelected, ...props }, ref) => {
    const styles = useMultiStyleConfig('BaseSelect', {});
    const [isHover, setIsHover] = useBoolean(false);

    return (
      <Box
        as="li"
        data-component="BaseSelect.Option"
        ref={ref}
        __css={styles['option']}
        onMouseOver={setIsHover.on}
        onMouseOut={setIsHover.off}
        {...props}
        data-active={isHover || (isHover && isHighlighted) || undefined}
        data-focus={isFocused || undefined}
        data-is-selected={isSelected || undefined}
      />
    );
  }
);

Option.displayName = 'BaseSelect.Option';
