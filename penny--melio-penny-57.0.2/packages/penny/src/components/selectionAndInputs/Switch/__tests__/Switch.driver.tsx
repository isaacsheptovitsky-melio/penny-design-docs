import { type RenderResult } from '@testing-library/react';
import { type UserEvent } from '@testing-library/user-event';
import { useState } from 'react';

import { renderComponent } from '@/test-utils/render.utils';

import { Switch } from '../Switch';
import type { SwitchProps } from '../Switch.types';

export const renderSwitchComponent = ({
  isControlled,
  ...rest
}: SwitchProps & { isControlled?: boolean }): RenderResult & { user: UserEvent } => {
  const ControlledSwitch = () => {
    const [isChecked, setIsChecked] = useState(false);

    return <Switch value={isChecked} onChange={setIsChecked} {...rest} />;
  };

  return renderComponent(isControlled ? <ControlledSwitch /> : <Switch {...rest} />);
};
