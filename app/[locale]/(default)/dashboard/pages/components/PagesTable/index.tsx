'use client';

import { VirtualTable } from '@/components/client';
import { Text } from '@/components/chakra';
import { useRouter } from '@/hooks';
import type { PageWithPayload } from '@/types';

export type PageTableProps = {
  data?: PageWithPayload[];
};

export const PageTable = ({ data }: PageTableProps) => {
  const router = useRouter();

  return data && data.length > 0 ? (
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
