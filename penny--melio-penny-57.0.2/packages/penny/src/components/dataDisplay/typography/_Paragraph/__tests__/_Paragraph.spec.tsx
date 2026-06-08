import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { _Paragraph } from '../_Paragraph';

validateComponent(_Paragraph, '_Paragraph', { props: { content: 'Lorem ipsum dolor sit amet' } });
