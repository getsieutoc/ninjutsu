import { Box } from '@chakra-ui/react';
import { useSWR } from '@/hooks';
import _ from 'lodash';
import { VirtualTable } from '../VirtualTable';
import { useMemo, useState } from 'react';
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
export const PostList = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR('api/pages/posts', fetcher);
  const [columns] = useState(defaultColumns);
  //   console.log('===>', data, error);
  const dataTable: Post[] = useMemo(() => {
    if (data?.length) {
      return _.cloneDeep(data);
    }
    return [];
  }, [data]);
  //   console.log(dataTable);

  return (
    <Box>
      <VirtualTable
        data={dataTable}
        columns={columns}
        height={'500px'}
        onRowClick={(props) => console.log(props)}
      />
    </Box>
  );
};
