import { type BoxProps } from '@chakra-ui/react';

import { validateComponent } from '../../../../test-utils/__tests__/component.validation';
import { _CustomInputContainer as CustomInputContainer } from '..';

validateComponent<BoxProps>(CustomInputContainer, '_CustomInputContainer');
