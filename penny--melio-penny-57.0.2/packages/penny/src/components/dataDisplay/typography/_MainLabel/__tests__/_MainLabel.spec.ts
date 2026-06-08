import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { _MainLabel } from '../_MainLabel';

validateComponent(_MainLabel, '_MainLabel', { props: { label: 'yes!' } });
