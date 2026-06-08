import { validateComponent } from '../../../../test-utils/__tests__/component.validation';
import { _ContentBox as ContentBox, type _ContentBoxProps as ContentBoxProps } from '..';

validateComponent<ContentBoxProps>(ContentBox, '_ContentBox');
