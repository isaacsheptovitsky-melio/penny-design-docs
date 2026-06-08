import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Container } from '../Container';
import { type ContainerProps } from '../Container.types';

validateComponent<ContainerProps>(Container, 'Container', { defaultDataTestId: 'container' });
