import { validateComponent } from '../../../../test-utils/__tests__/component.validation';
import { BaseVirtualCard } from '../BaseVirtualCard';
import { type BaseVirtualCardProps } from '../BaseVirtualCard.types';

validateComponent<BaseVirtualCardProps>(BaseVirtualCard, 'BaseVirtualCard', { defaultDataTestId: 'base-virtual-card' });
