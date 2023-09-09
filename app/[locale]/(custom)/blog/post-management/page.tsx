'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Icon,
  Stack,
  Card,
  Input,
  Button,
  Heading,
  Spacer,
  Checkbox,
  CardBody,
  CardHeader,
  CardFooter,
} from '@/components/chakra';
import slugify from 'slugify';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSWR, useAuth, useToast } from '@/hooks';
import { ChevronDownIcon, ChevronUpIcon } from '@/icons';
import { PostList, TextEditor } from '@/components/client';
import type { Post } from '@/types';

type RequireInputType = {
  [key: string]: string;
};
export default function BlogEditor() {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');
  const router = useRouter();
  const toast = useToast();
  const { session, isAuthenticated } = useAuth();

  const { data } = useSWR<Post>('/api/pages/' + postId?.toString() ?? null);
  const [title, setTitle] = useState('');
  const [publishedAt, setPublishedAt] = useState<Date | null>(new Date());
  const [content, setContent] = useState('');
  const [showActionPost, setShowActionPost] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data?.id) {
      setTitle(data.title);
      setContent(data.content);
      setPublishedAt(data?.publishedAt ?? null);
    }
  }, [data?.id, data?.content, data?.publishedAt, data?.title]);

  const handleSave = async () => {
    const userID = session?.user.id;
    const isOk = requiredInput({ title, content });
    if (!isOk) return;
    setIsLoading(true);
    const { status, statusText } = await fetch('/api/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title.trim(),
        content,
        slug: slugify(title),
        publishedAt,
        locale: 'VI',
        authorId: userID,
      }),
    });

    if (status === 200) {
      toast({
        status: 'success',
        title: 'Successfully',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      router.refresh();
      resetState();
    } else {
      toast({
        status: 'error',
        description: statusText,
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };
  const handleUpdate = async () => {
    const userID = session?.user.id;
    const isOk = requiredInput({ title, content });
    if (!isOk) return;
    setIsLoading(true);
    const { status, statusText } = await fetch(`/api/pages/${data?.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title.trim(),
        content,
        slug: slugify(title),
        publishedAt,
        locale: 'VI',
        authorId: userID,
      }),
    });

    if (status === 200) {
      toast({
        status: 'success',
        title: 'Update Successfully',
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
    setIsLoading(false);
  };
  const resetState = () => {
    setTitle('');
    setContent('');
    setPublishedAt(new Date());
  };
  const requiredInput = (req: RequireInputType) => {
    let pass = true;
    Object.keys(req)?.map((key) => {
      const value = req[key].trim();
      if (!value) {
        pass = false;
        toast({
          status: 'warning',
          title: 'Input request',
          description: (
            <>
              <Box as="b" mr={1} textTransform="capitalize">
                {key}
              </Box>
              can not be empty
            </>
          ),
          duration: 4000,
          isClosable: true,
        });
      }
    });
    return pass;
  };

  if (!isAuthenticated) {
    router.push('/login');
  }

  return (
    <>
      <Heading size="lg" fontWeight={400} pb={2}>
        {data?.id ? 'Update ' : 'Create '} article{' '}
        {data?.id && (
          <Button
            onClick={() => {
              resetState();
              router.push('/blog/blog-editor');
            }}
            size="xs"
            variant="outline"
            colorScheme="blue"
          >
            Create new
          </Button>
        )}
      </Heading>
      <Stack spacing={1} direction="row">
        <Box w="80%">
          <Input
            width="100%"
            rounded={5}
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tiêu đề..."
            size="sm"
            marginY={1}
          />

          <TextEditor onChange={(text) => setContent(text)} value={content} />
        </Box>
        <Box w="20%">
          <Card>
            <CardHeader borderBottom="1px solid #E2E8F0" p={2}>
              <Flex>
                <Box fontWeight={600}>Đăng</Box>
                <Spacer />
                <Box>
                  <Button
                    onClick={() => setShowActionPost(!showActionPost)}
                    size="xs"
                  >
                    <Icon
                      as={showActionPost ? ChevronDownIcon : ChevronUpIcon}
                    />
                  </Button>
                </Box>
              </Flex>
            </CardHeader>
            {showActionPost && (
              <CardBody p={2}>
                <Checkbox
                  onChange={(e) => {
                    const isPublished = e.target.checked;
                    setPublishedAt(isPublished ? new Date() : null);
                  }}
                  isChecked={!!publishedAt}
                >
                  {!!publishedAt ? 'Công khai' : 'Riêng tư'}
                </Checkbox>
              </CardBody>
            )}
            {showActionPost && (
              <CardFooter p={2}>
                <Button
                  onClick={data?.id ? handleUpdate : handleSave}
                  colorScheme={data?.id ? 'orange' : 'green'}
                  size="sm"
                  width="100%"
                  isLoading={isLoading}
                >
                  {data?.id ? `Update` : `Save`}
                </Button>
              </CardFooter>
            )}
          </Card>
        </Box>
      </Stack>
      <Box as="br" />
      <PostList />
    </>
  );
}
