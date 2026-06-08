import { validateComponent } from '../../../../test-utils/__tests__/component.validation';
import { IFrame, type IFrameProps } from '../IFrame';

validateComponent<IFrameProps>(IFrame, 'IFrame', { props: { src: 'http://dummy.server/script', title: 'title' } });
