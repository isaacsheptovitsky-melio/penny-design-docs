import { type TestIdProp } from '@melio/penny-utils';
import { type AriaAttributes } from 'react';

import { type MenuContextProps } from '../Context';

export type FloatingMenuProps = MenuContextProps & AriaAttributes & TestIdProp;
