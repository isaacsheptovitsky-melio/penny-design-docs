import type { TableColumnDef } from '../hooks/types';

export type Person = {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  status: string;
  subRows?: Person[];
};

export const data: Person[] = [
  {
    id: '0',
    firstName: 'simone',
    lastName: 'de beauvoir',
    gender: 'female',
    age: 70,
    status: 'complicated',
  },
  {
    id: '1',
    firstName: 'jean paul',
    lastName: 'sartre',
    gender: 'male',
    age: 75,
    status: 'complicated',
  },
  {
    id: '2',
    firstName: 'mary',
    lastName: 'wollenscraft',
    gender: 'female',
    age: 40,
    status: 'single',
  },
  {
    id: '3',
    firstName: 'jacques',
    lastName: 'lacan',
    gender: 'male',
    age: 90,
    status: 'single',
  },
];

export const nestedData: Person[] = [
  ...data,
  {
    id: '4',
    firstName: 'michel',
    lastName: 'foucault',
    gender: 'male',
    age: 60,
    status: 'single',
    subRows: [
      {
        id: '5',
        firstName: 'jacques',
        lastName: 'derrida',
        gender: 'male',
        age: 75,
        status: 'single',
      },
      {
        id: '6',
        firstName: 'sigmund',
        lastName: 'freud',
        gender: 'male',
        age: 80,
        status: 'single',
      },
    ],
  },
];

export const columns: TableColumnDef<Person>[] = [
  {
    id: 'firstName',
    header: 'First Name',
    cell: ({ row }) => row.firstName,
    size: 'l',
  },
  {
    id: 'lastName',
    header: 'Last Name',
    cell: ({ row }) => row.lastName,
    size: 'm',
  },
  {
    id: 'gender',
    header: 'Gender',
    cell: ({ row }) => row.gender,
    size: 's',
  },
  {
    id: 'age',
    header: 'Age',
    cell: ({ row }) => row.age,
    size: 'xs',
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => row.status,
    size: 130,
  },
];
