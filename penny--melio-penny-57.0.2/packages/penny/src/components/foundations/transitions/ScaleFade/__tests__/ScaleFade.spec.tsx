import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { ScaleFade, type ScaleFadeProps } from '../ScaleFade';

validateComponent<ScaleFadeProps>(ScaleFade, 'ScaleFade', { props: { children: 'Label' } });
