'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Spacer,
  Spinner,
  useToast,
} from '@/components/chakra';
import { useSWR } from '@/hooks';
import _ from 'lodash';
import { VirtualTable } from '../VirtualTable';
import { useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { Post } from '@prisma/client';
import { Pagination } from '../Pagination';
import { DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import { BiEdit } from 'react-icons/bi';

export const PostList = () => {
  const toast = useToast();
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(1);
  const [take, setTake] = useState(25);
  const { data, isLoading, mutate } = useSWR<{
    count: number;
    posts: Post[];
  }>(`/api/pages?pageIndex=${pageIndex}&take=${take}`);

  const deletePost = useCallback(
    async (id: string) => {
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
    },
    [mutate, toast]
  );
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
                  router.push('/blog/post-management?postId=' + row.original.id)
                }
                variant="outline"
                size="sm"
              >
                <Icon as={BiEdit} color="orange.400" />
              </Button>
              <Button
                onClick={() => deletePost(row.original.id)}
                size="sm"
                variant="outline"
              >
                <Icon as={DeleteIcon} color="red.400" />
              </Button>
              <Button
                onClick={() => router.push('/blog/' + row.original.id)}
                size="sm"
                variant="outline"
              >
                <Icon as={ViewIcon} />
              </Button>
            </HStack>
          );
        },
      },
    ],
    [deletePost, router]
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

  return (
    <Box>
      <Flex>
        <Spacer />
        <Pagination
          count={data?.count ?? 0}
          take={take}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          setTake={setTake}
        />
      </Flex>
      <VirtualTable data={dataTable} columns={columns} height={'500px'} />
    </Box>
  );
};
