import { Box, Stack, Heading } from '@/components/chakra';
import { PostList } from '@/components/client';
import { redirect } from 'next/navigation';
import { getSession } from '@/configs/auth';
import { prisma } from '@/configs/prisma';
import type { Post } from '@/types';

import { ButtonCreatePost } from './BlogEditForm/ButtonCreatePost';
import BlogEditForm from './BlogEditForm';

type PropTypes = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function BlogEditor({ params }: PropTypes) {
  const { slug } = params;

  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const data: Post | null = await prisma.post.findUnique({
    where: {
      id: slug,
    },
  });

  if (!data) return <>Post not found!</>;

  return (
    <Box>
      <Heading size="lg" fontWeight={400} pb={2}>
        {data?.id ? 'Update ' : 'Create '} article{' '}
        {data?.id && <ButtonCreatePost />}
      </Heading>
      <Stack spacing={1} direction="row">
        <BlogEditForm data={data} />
      </Stack>
      <Box as="br" />
      <PostList />
    </Box>
  );
}
