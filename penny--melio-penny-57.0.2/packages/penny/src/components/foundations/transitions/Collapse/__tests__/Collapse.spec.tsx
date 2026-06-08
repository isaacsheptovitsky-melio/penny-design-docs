import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Collapse, type CollapseProps } from '../Collapse';

validateComponent<CollapseProps>(Collapse, 'Collapse', { props: { children: 'Label' } });
