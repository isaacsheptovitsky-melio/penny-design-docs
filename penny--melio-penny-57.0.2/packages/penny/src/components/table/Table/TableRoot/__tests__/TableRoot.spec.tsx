import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { TableRoot } from '../TableRoot';

validateComponent(TableRoot, 'TableRoot', { defaultDataTestId: 'table-container' });
