import { useState } from 'react';

type IsBooleanResult = [
  boolean,
  {
    on: VoidFunction;
    off: VoidFunction;
    toggle: VoidFunction;
  },
];

export const useBoolean = (defaultValue = false): IsBooleanResult => {
  const [state, setState] = useState(defaultValue);
  return [
    state,
    {
      on: () => setState(true),
      off: () => setState(false),
      toggle: () => setState(!state),
    },
  ];
};
