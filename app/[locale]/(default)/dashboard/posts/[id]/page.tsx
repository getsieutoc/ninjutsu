import { Flex, Heading, Spinner, Stack } from '@/components/chakra';
import { GoBackButton } from '@/components/client';
import { prisma } from '@/utils/prisma';
import { Suspense } from 'react';

import { PostForm } from '../components';

type EditPostProps = {
  params: { id: string };
};

export default async function EditPost({ params }: EditPostProps) {
  const { id } = params;

  const data = await prisma.post.findUnique({ where: { id } });

  return (
    <Flex direction="column">
      <Stack direction="row" align="center">
        <GoBackButton path="/dashboard/posts" />

        <Heading as="h3" size="lg" alignItems="center" color="gray">
          Edit Post
        </Heading>
      </Stack>

      <Suspense fallback={<Spinner />}>
        {data && <PostForm data={data} />}
      </Suspense>
    </Flex>
  );
}
