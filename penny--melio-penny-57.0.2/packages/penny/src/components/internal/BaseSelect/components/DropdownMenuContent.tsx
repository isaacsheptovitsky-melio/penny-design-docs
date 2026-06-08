import { Box } from '@chakra-ui/react';
import { useTestId } from '@melio/penny-utils';
import { type ForwardedRef, forwardRef, type NamedExoticComponent, type ReactNode } from 'react';

import { Group } from '@/components/containers/Group';

import { useMultiStyleConfig } from '../../../../theme/hooks/use-style-config';
import { type Option, type OptionWithSection } from '../BaseSelect.types';
import { getOptionsGroupedBySection } from '../BaseSelect.utils';
import { type UseDropdownMenuPropsContentProps } from '../hooks/useDropdownMenuProps';
import { EmptyState } from './EmptyState';
import { Section } from './Section';

export type DropdownMenuContentProps<T> = {
  isLoading?: boolean;
  loadingStateComponent?: ReactNode;
  creatableOptionComponent?: ReactNode;
  renderOption: (option: Option<T>, index: number) => ReactNode;
} & UseDropdownMenuPropsContentProps<T>;

const DropdownMenuContentComponent = <T,>(
  {
    hasSections,
    options,
    isLoading,
    loadingStateComponent,
    emptyState,
    shouldShowCreatableOption,
    creatableOptionComponent,
    closeMenu,
    renderOption,
    ...otherProps
  }: DropdownMenuContentProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const styles = useMultiStyleConfig('BaseSelect', { shouldShowCreatableOption });
  const getTestId = useTestId('base-select');

  return (
    <Box __css={styles['dropdownMenuContent']} ref={ref}>
      <Group hasDivider spacing="none" width="full" variant="vertical" dividerProps={{ role: 'separator' }}>
        {isLoading ? (
          loadingStateComponent
        ) : options.length > 0 ? (
          <Box
            as={hasSections ? 'div' : 'ul'}
            __css={styles['optionsContainer']}
            {...getTestId('options-container')}
            {...otherProps}
          >
            {hasSections ? (
              <Group variant="vertical" width="full" spacing="none" hasDivider>
                {Object.entries(getOptionsGroupedBySection(options as OptionWithSection<T>[])).map(
                  ([sectionLabel, sectionContent], index) => (
                    <Section
                      key={`${sectionLabel}-${index}`}
                      label={sectionLabel}
                      isVerified={sectionContent.section?.icon === 'verified'}
                    >
                      {sectionContent.options.map((option) => renderOption(option, option.index))}
                    </Section>
                  )
                )}
              </Group>
            ) : (
              options.map((option, index) => renderOption(option, index))
            )}
          </Box>
        ) : (
          emptyState && <EmptyState emptyState={emptyState} closeMenu={closeMenu} />
        )}
        {shouldShowCreatableOption && !isLoading && creatableOptionComponent}
      </Group>
    </Box>
  );
};

export const DropdownMenuContent = forwardRef(DropdownMenuContentComponent) as <T>(
  props: DropdownMenuContentProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof DropdownMenuContentComponent>;

(DropdownMenuContent as NamedExoticComponent).displayName = 'BaseSelect.DropdownMenuContent';
