import { Box } from '@chakra-ui/react';

import { tableBorderStyles } from '../shared-styles';
import { TableHead, TableHeadProps, TableRow, TableRowProps } from './components';

export type CoverPageProps = {
  /**
   * The Cover Page's title
   */
  title: string;
  /**
   * The Cover Page's description
   */
  description: string;
  tableHeader: TableHeadProps;
  tableRows: TableRowProps[];
};

const tableStyles = {
  width: '100%',
  ...tableBorderStyles,
};

export const CoverPage = ({ title, description, tableHeader, tableRows }: CoverPageProps) => (
  <>
    <Box data-component="CoverPageHeader">
      <h1>{title}</h1>
      <p>{description}</p>
    </Box>
    <Box data-component="CoverPageBody">
      <table style={tableStyles}>
        <TableHead {...tableHeader} />
        <tbody>
          {tableRows.map((row) => (
            <TableRow key={row.component.name} {...row} />
          ))}
        </tbody>
      </table>
    </Box>
  </>
);

CoverPage.displayName = 'Storybook.CoverPage';
