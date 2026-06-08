import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Counter } from '../Counter';
import type { CounterProps } from '../Counter.types';

validateComponent<CounterProps>(Counter, 'Counter', { props: { number: 9, status: 'warning' } });
