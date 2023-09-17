'use client';

import { VirtualTable } from '@/components/client';
import { Text } from '@/components/chakra';
import { useRouter } from '@/hooks';
import type { Post } from '@/types';

export type PostTableProps = {
  data: Post[];
};

export const PostTable = ({ data }: PostTableProps) => {
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
      onRowClick={({ item }) => router.push(`/dashboard/posts/${item.id}`)}
    />
  ) : (
    <Text>No posts</Text>
  );
};
