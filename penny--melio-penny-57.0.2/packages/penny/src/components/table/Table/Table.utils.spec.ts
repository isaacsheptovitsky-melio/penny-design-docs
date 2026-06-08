import { expect } from 'vitest';

import { getFixedCellSize } from './Table.utils';

describe('Table - utils', () => {
  it('gets the correct styles for fixed cell size', () => {
    expect(getFixedCellSize('l')).toStrictEqual({});
    expect(getFixedCellSize('m')).toStrictEqual({});
    expect(getFixedCellSize('s')).toStrictEqual({});
    expect(getFixedCellSize('xs')).toStrictEqual({});
    expect(getFixedCellSize(120)).toStrictEqual({
      minWidth: '120px',
      width: '120px',
      maxWidth: '120px',
    });
    expect(getFixedCellSize(undefined)).toStrictEqual({});
  });
});
