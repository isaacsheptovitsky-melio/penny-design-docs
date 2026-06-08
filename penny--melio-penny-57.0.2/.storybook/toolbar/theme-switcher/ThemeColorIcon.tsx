import { FC } from 'react';

export const ThemeColorIcon: FC<{ color: string }> = ({ color }) => (
  <div
    style={{
      borderRadius: '1rem',
      display: 'block',
      height: '1rem',
      width: '1rem',
      background: color,
      boxShadow: `${color} 0 0 0 1px inset`,
    }}
  />
);
