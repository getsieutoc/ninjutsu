import { Flex, Heading, Spinner, Stack } from '@/components/chakra';
import { GoBackButton } from '@/components/client';
import { Suspense } from 'react';

import { PageForm } from '../components';

export default function AddNewPage() {
  return (
    <Flex direction="column">
      <Stack direction="row" align="center">
        <GoBackButton />

        <Heading as="h3" size="lg" alignItems="center" color="gray">
          Add New Page
        </Heading>
      </Stack>

      <Suspense fallback={<Spinner />}>
        <PageForm />
      </Suspense>
    </Flex>
  );
}
