import { Box, Spinner } from '@chakra-ui/react';
import { useSWR } from '@/hooks';
import _ from 'lodash';
import { VirtualTable } from '../VirtualTable';
import { useMemo, useState } from 'react';
import Router from 'next/router';
import { ColumnDef } from '@tanstack/react-table';
import { Post } from '@prisma/client';

const defaultColumns: ColumnDef<Post>[] = [
  {
    header: 'id',
    size: 10,
    cell(props) {
      return <>{props.row.original.id}</>;
    },
  },
  {
    header: 'title',
    cell(props) {
      return <>{props.row.original.title}</>;
    },
  },
  {
    header: 'content',
    cell(props) {
      return (
        <Box
          w="300px"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {props.row.original.content}
        </Box>
      );
    },
  },
  {
    header: 'createdAt',
    cell(props) {
      return <>{props.row.original.createdAt}</>;
    },
  },
];
const fetcher = async (url: string) => await fetch(url).then((r) => r.json());
export const PostList = () => {
  const { data, error, isLoading } = useSWR('/api/pages/posts', fetcher);
  const [columns] = useState(defaultColumns);

  const dataTable: Post[] = useMemo(() => {
    if (data?.length) {
      return _.cloneDeep(data);
    }
    return [];
  }, [data]);
  if (isLoading)
    return (
      <Box textAlign="center">
        <Spinner />
      </Box>
    );
  if (error) return <>{JSON.stringify(error)}</>;
  return (
    <Box>
      <VirtualTable
        data={dataTable}
        columns={columns}
        height={'500px'}
        onRowClick={(row) =>
          Router.push({
            pathname: '/post/' + row.item.id,
          })
        }
      />
    </Box>
  );
};
