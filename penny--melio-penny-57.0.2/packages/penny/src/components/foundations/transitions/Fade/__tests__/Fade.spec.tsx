import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Fade, type FadeProps } from '../Fade';

validateComponent<FadeProps>(Fade, 'Fade', { props: { children: 'Label' } });
