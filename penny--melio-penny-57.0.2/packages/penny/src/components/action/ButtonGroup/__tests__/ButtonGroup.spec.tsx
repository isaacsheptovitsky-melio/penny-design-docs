import { Button } from '@/components/action/Button';
import { validateComponent } from '@/test-utils/__tests__/component.validation';

import { ButtonGroup, type ButtonGroupProps } from '../ButtonGroup';

describe('ButtonGroup', () => {
  validateComponent<ButtonGroupProps>(ButtonGroup, 'ButtonGroup', {
    props: {
      children: (
        <>
          <Button label="One" />
          <Button label="Two" />
        </>
      ),
    },
  });
});
