import { Box } from '@chakra-ui/react';

import { Button } from '@/components/action/Button';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Badge } from '../Badge';
import type { BadgeProps } from '../Badge.types';

validateComponent<BadgeProps>(Badge, 'Badge', {
  props: {
    mark: <Button label="Button" />,
    children: <Box width="7px" height="7px" />,
  },
});
