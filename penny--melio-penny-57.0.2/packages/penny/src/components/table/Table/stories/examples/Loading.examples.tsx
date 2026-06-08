import { Group } from '@/components/containers/Group/Group';
import { Text } from '@/components/dataDisplay/Text/Text';
import { Layout } from '@/components/layouts/Layout/Layout';

import { columns } from '../../__fixtures__/storybook-mock-data';
import { useTable } from '../../hooks/useTable';
import { Table } from '../../Table';

export const LoadingExample = () => {
  const tableProps = useTable({ data: [], columns, isLoading: true });

  return (
    <Layout>
      <Group variant="vertical" spacing="xl">
        <Text as="h2" textStyle="heading1Semi">
          Loading
        </Text>
        <Table {...tableProps} />
      </Group>
    </Layout>
  );
};

export const LoadingWithoutHeaderExample = () => {
  const tableProps = useTable({ data: [], columns, isLoading: true, hideHeaderWhileLoading: true });

  return (
    <Layout>
      <Group variant="vertical" spacing="xl">
        <Text as="h2" textStyle="heading1Semi">
          Loading
        </Text>
        <Table {...tableProps} />
      </Group>
    </Layout>
  );
};
