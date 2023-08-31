import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { useSWR } from '@/hooks';
import _ from 'lodash';
import { VirtualTable } from '../VirtualTable';
import { useMemo, useState } from 'react';
import Router from 'next/router';
import { ColumnDef } from '@tanstack/react-table';
import { Post } from '@prisma/client';
import { Pagination } from '../Pagination';

const fetcher = async (url: string) => await fetch(url).then((r) => r.json());
export const PostList = () => {
  const toast = useToast();
  const [pageIndex, setPageIndex] = useState(0);
  const [limit] = useState(25);
  const { data, error, isLoading, mutate } = useSWR<{
    count: number;
    posts: Post[];
  }>(`/api/pages/posts?page=${pageIndex}&limit=${limit}`, fetcher);
  const deletePost = async (id: string) => {
    if (window.confirm(`Are you sure you want to delete this post?`)) {
      const { status, statusText } = await fetch(`/api/pages/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deletedAt: new Date(),
        }),
      });

      if (status === 200) {
        toast({
          status: 'success',
          title: 'Delete Successfully',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
      } else {
        toast({
          status: 'error',
          description: statusText,
          duration: 3000,
          isClosable: true,
        });
      }
      mutate();
    }
  };
  const columns: ColumnDef<Post>[] = useMemo(
    () => [
      {
        header: '#',
        size: 10,
        cell({ row }) {
          return row.index + 1;
        },
      },
      {
        header: 'id',
        size: 10,
        cell(props) {
          return (
            <Box
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
              maxW={100}
            >
              {props.row.original.id}
            </Box>
          );
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
      {
        header: 'Action',
        cell({ row }) {
          return (
            <HStack spacing={1}>
              <Button
                onClick={() =>
                  Router.push({
                    pathname: '/blog/blog-editor',
                    query: {
                      postId: row.original.id,
                    },
                  })
                }
                size="sm"
                colorScheme="orange"
              >
                Edit
              </Button>
              <Button
                onClick={() => deletePost(row.original.id)}
                size="sm"
                colorScheme="red"
              >
                Delete
              </Button>
              <Button
                onClick={() =>
                  Router.push({
                    pathname: '/blog/' + row.original.id,
                  })
                }
                size="sm"
                colorScheme="blue"
              >
                View
              </Button>
            </HStack>
          );
        },
      },
    ],
    []
  );
  const dataTable: Post[] = useMemo(() => {
    if (data?.posts?.length) {
      return _.cloneDeep(data.posts);
    }
    return [];
  }, [data?.posts]);

  if (isLoading)
    return (
      <Box textAlign="center">
        <Spinner />
      </Box>
    );
  if (error) return <>{JSON.stringify(error)}</>;

  return (
    <Box>
      <Flex>
        <Spacer />
        <Pagination
          count={data?.count ?? 0}
          limit={limit}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      </Flex>
      <VirtualTable
        data={dataTable}
        columns={columns}
        height={'500px'}
        // onRowClick={(row) => console.log(row.item[row?.context?.column?.id])}
      />
    </Box>
  );
};
