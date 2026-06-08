import { noop } from '@melio/penny-utils';
import { renderHook } from '@testing-library/react';
import { expect } from 'vitest';

import { columns, data, nestedData } from '../../__fixtures__/mock-data';
import { useColumnDefs } from '../useColumnDefs';

const defaultParam = { columns, data, disableAllRowsSelection: false };

describe('useColumnDefs', () => {
  it('adds `expand` column if the data has sub rows', () => {
    const {
      result: { current: cols },
    } = renderHook(() => useColumnDefs({ ...defaultParam, data: nestedData }));

    expect(cols.find((c) => c.id === 'expand')).toBeTruthy();
  });

  it('adds `selectable` column if `onRowSelectionChange` is passed', () => {
    const {
      result: { current: cols },
    } = renderHook(() => useColumnDefs({ ...defaultParam, onRowSelectionChange: noop }));

    expect(cols.find((c) => c.id === 'selectable')).toBeTruthy();
  });

  it('adds `selectable` column if `onAllRowsSelectionChange` is passed', () => {
    const {
      result: { current: cols },
    } = renderHook(() => useColumnDefs({ ...defaultParam, onAllRowsSelectionChange: noop }));

    expect(cols.find((c) => c.id === 'selectable')).toBeTruthy();
  });

  it('sorts all left pinned columns to be first', () => {
    const {
      result: { current: cols },
    } = renderHook(() =>
      useColumnDefs({
        ...defaultParam,
        columns: [
          {
            id: 'firstName',
            header: 'First Name',
            cell: ({ row }) => row.firstName,
          },
          {
            id: 'lastName',
            header: 'Last Name',
            cell: ({ row }) => row.lastName,
            isPinnedToLeft: true,
          },
          {
            id: 'gender',
            header: 'Gender',
            cell: ({ row }) => row.gender,
          },
          {
            id: 'age',
            header: 'Age',
            cell: ({ row }) => row.age,
            isPinnedToLeft: true,
          },
          {
            id: 'status',
            header: 'Status',
            cell: ({ row }) => row.status,
            isPinnedToLeft: true,
          },
        ],
      })
    );
    const {
      result: { current: expectedCols },
    } = renderHook(() =>
      useColumnDefs({
        ...defaultParam,
        columns: [
          {
            id: 'lastName',
            header: 'Last Name',
            cell: ({ row }) => row.lastName,
            isPinnedToLeft: true,
          },
          {
            id: 'age',
            header: 'Age',
            cell: ({ row }) => row.age,
            isPinnedToLeft: true,
          },
          {
            id: 'status',
            header: 'Status',
            cell: ({ row }) => row.status,
            isPinnedToLeft: true,
          },
          {
            id: 'firstName',
            header: 'First Name',
            cell: ({ row }) => row.firstName,
          },
          {
            id: 'gender',
            header: 'Gender',
            cell: ({ row }) => row.gender,
          },
        ],
      })
    );

    // Bypass "Received: serializes to the same string" error
    // https://stackoverflow.com/a/73024596
    expect(JSON.stringify(cols)).toBe(JSON.stringify(expectedCols));
  });

  it('sorts all right pinned columns to be last', () => {
    const {
      result: { current: cols },
    } = renderHook(() =>
      useColumnDefs({
        ...defaultParam,
        columns: [
          {
            id: 'firstName',
            header: 'First Name',
            cell: ({ row }) => row.firstName,
          },
          {
            id: 'lastName',
            header: 'Last Name',
            cell: ({ row }) => row.lastName,
            isPinnedToRight: true,
          },
          {
            id: 'gender',
            header: 'Gender',
            cell: ({ row }) => row.gender,
          },
          {
            id: 'age',
            header: 'Age',
            cell: ({ row }) => row.age,
            isPinnedToRight: true,
          },
          {
            id: 'status',
            header: 'Status',
            cell: ({ row }) => row.status,
            isPinnedToRight: true,
          },
        ],
      })
    );
    const {
      result: { current: expectedCols },
    } = renderHook(() =>
      useColumnDefs({
        ...defaultParam,
        columns: [
          {
            id: 'lastName',
            header: 'Last Name',
            cell: ({ row }) => row.lastName,
            isPinnedToRight: true,
          },
          {
            id: 'age',
            header: 'Age',
            cell: ({ row }) => row.age,
            isPinnedToRight: true,
          },
          {
            id: 'status',
            header: 'Status',
            cell: ({ row }) => row.status,
            isPinnedToRight: true,
          },
          {
            id: 'firstName',
            header: 'First Name',
            cell: ({ row }) => row.firstName,
          },
          {
            id: 'gender',
            header: 'Gender',
            cell: ({ row }) => row.gender,
          },
        ],
      })
    );

    // Bypass "Received: serializes to the same string" error
    // https://stackoverflow.com/a/73024596
    expect(JSON.stringify(cols)).toBe(JSON.stringify(expectedCols));
  });
});
