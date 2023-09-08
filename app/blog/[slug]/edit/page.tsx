import { prisma } from '@/utils/prisma';

import { GeneralLayout, Box, Stack, Heading } from '@/components';
import Login from '../../../login/page';
import type { Post } from '@/types';
import { PostList } from '@/components/Post';
import { getSession } from '@/utils/auth';
import { ButtonCreatePost } from './BlogEditForm/ButtonCreatePost';
import BlogEditForm from './BlogEditForm';

type PropTypes = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function BlogEditor({ params }: PropTypes) {
  const { slug } = params;
  const session = await getSession();
  const data: Post | null = await prisma.post.findUnique({
    where: {
      id: slug,
    },
  });
  if (!data) return <>Post not found!</>;
  if (!session) return <Login />;
  return (
    <GeneralLayout>
      <Heading size="lg" fontWeight={400} pb={2}>
        {data?.id ? 'Update ' : 'Create '} article{' '}
        {data?.id && <ButtonCreatePost />}
      </Heading>
      <Stack spacing={1} direction="row">
        <BlogEditForm data={data} />
      </Stack>
      <Box as="br" />
      <PostList />
    </GeneralLayout>
  );
}
