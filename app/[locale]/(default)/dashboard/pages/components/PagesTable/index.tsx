'use client';

import { VirtualTable } from '@/components/client';
import { Text } from '@/components/chakra';
import { useRouter } from '@/hooks';
import type { Page } from '@/types';

export type PageTableProps = {
  data: Page[];
};

export const PageTable = ({ data }: PageTableProps) => {
  const router = useRouter();

  return data.length > 0 ? (
    <VirtualTable
      data={data}
      columns={[
        {
          header: 'Title',
          accessorKey: 'title',
        },
        {
          header: 'Author',
          accessorKey: 'author.name',
        },
      ]}
      height={'500px'}
      onRowClick={({ item }) => router.push(`/dashboard/pages/${item.id}`)}
    />
  ) : (
    <Text>No pages</Text>
  );
};
