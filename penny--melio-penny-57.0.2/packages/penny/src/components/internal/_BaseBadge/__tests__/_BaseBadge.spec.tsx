import { validateComponent } from '../../../../test-utils/__tests__/component.validation';
import { StatusIndicator } from '../../../dataDisplay';
import { _BaseBadge } from '../_BaseBadge';
import { type _BaseBadgeProps } from '../_BaseBadge.types';

validateComponent<_BaseBadgeProps>(_BaseBadge, '_BaseBadge', {
  props: { label: '_BaseBadge', status: 'warning', leftElement: <StatusIndicator status="neutral" /> },
  defaultDataTestId: 'base-badge-warning',
  componentParts: ['left-element'],
});
