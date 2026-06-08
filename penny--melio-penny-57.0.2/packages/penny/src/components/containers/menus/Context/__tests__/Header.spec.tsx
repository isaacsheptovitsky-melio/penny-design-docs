import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { Header } from '../components';

describe('Header', () => {
  validateComponent(Header, 'Header');
});
