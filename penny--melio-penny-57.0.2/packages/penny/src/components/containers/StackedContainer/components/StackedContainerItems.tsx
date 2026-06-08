import { Box } from '@chakra-ui/react';

import { useMultiStyleConfig } from '@/theme/hooks/use-style-config';

import { type StackedContainerItemsProps } from '../StackedContainer.types';

export const StackedContainerItems = (props: StackedContainerItemsProps) => {
  const { stacksToDisplay } = props;
  const { stacksContainerItemsWrapper, firstStack, secondStack } = useMultiStyleConfig('StackedContainer', props);
  const shouldDisplayFirstStack = stacksToDisplay > 0;
  const shouldDisplaySecondStack = stacksToDisplay > 1;

  return (
    <Box __css={stacksContainerItemsWrapper}>
      {shouldDisplayFirstStack && <Box __css={firstStack} />}
      {shouldDisplaySecondStack && <Box __css={secondStack} />}
    </Box>
  );
};

StackedContainerItems.displayName = 'StackedContainerItems';
