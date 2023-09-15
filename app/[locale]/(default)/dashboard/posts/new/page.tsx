import { Flex, Heading, Spinner, Stack } from '@/components/chakra';
import { GoBackButton } from '@/components/client';
import { Suspense } from 'react';

import { PostForm } from '../components';

export default function AddNewPost() {
  return (
    <Flex direction="column">
      <Stack direction="row" align="center">
        <GoBackButton />

        <Heading as="h3" size="lg" alignItems="center" color="gray">
          Add New Post
        </Heading>
      </Stack>

      <Suspense fallback={<Spinner />}>
        <PostForm />
      </Suspense>
    </Flex>
  );
}
